import api from "./axios";

export const adminService = {
  // Auth
  login: async (email, password) => {
    const response = await api.post("/api/admin/auth/login/", {
      email,
      password,
    });
    return response.data;
  },
  logout: async (refresh_token) => {
    const response = await api.post("/api/admin/auth/logout/", {
      refresh: refresh_token,
    });
    return response.data;
  },

  // Dashboard
  getAnalytics: async () => {
    const response = await api.get("/api/admin/dashboard/analytics/");
    console.log("Analytics response raw:", response.data);
    return response.data.analytics;
  },
  getRecentEvents: async (limit = 10) => {
    const response = await api.get(
      `/api/admin/dashboard/recent-events/?limit=${limit}`
    );
    return response.data.events;
  },

  // Events
  getAllEvents: async () => {
    const response = await api.get("/api/admin/events/");
    return response.data.events;
  },
  updateEventStatus: async (eventId, status) => {
    const response = await api.patch(`/api/admin/events/${eventId}/status/`, {
      status,
    });
    return response.data;
  },

  // Organizers
  getAllOrganizers: async () => {
    const response = await api.get("/api/admin/organisers/");
    return response.data.organisers;
  },

  // Users
  getAllUsers: async (params = {}) => {
    try {
      let url = "/api/admin/users/";

      // Route to specific endpoints if key params are present
      // This is often more reliable if the unified endpoint is flaky
      if (params.role === "student") {
        url = "/api/admin/students/";
      } else if (params.role === "organizer") {
        url = "/api/admin/organisers/";
      } else {
        // Build query string for general users endpoint
        const queryString = new URLSearchParams(params).toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      const response = await api.get(url);

      // Normalize response data:
      // Some endpoints might return { students: [...] }, { organisers: [...] } or { users: [...] }
      const data = response.data;
      if (data.students) return { users: data.students };
      if (data.organisers) return { users: data.organisers };

      return data;
    } catch (error) {
      // If 404, it might mean no users found for this filter
      if (error.response?.status === 404) {
        return { users: [] };
      }
      console.error("Failed to fetch users", error);
      throw error;
    }
  },
};
