"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/create-event/");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
        <p className="text-muted-foreground">
          Find and book tickets for the latest events.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No events found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.event_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="aspect-video w-full bg-muted relative overflow-hidden">
                  {event.event_image ? (
                    <img
                      src={event.event_image}
                      alt={event.event_name}
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-secondary text-secondary-foreground">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      event.pricing_type === 'free' 
                        ? 'bg-green-500/90 text-white' 
                        : 'bg-primary/90 text-primary-foreground'
                    }`}>
                      {event.pricing_type === 'free' ? 'Free' : `₦${event.event_price}`}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="line-clamp-1">{event.event_name}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span className="capitalize">{event.event_type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.event_location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
