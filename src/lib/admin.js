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
      // Build query string from params object (e.g., { page: 1, role: 'student' })
      const queryString = new URLSearchParams(params).toString();
      const url = `/api/admin/users/${queryString ? `?${queryString}` : ""}`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users", error);
      throw error;
    }
  },
};
