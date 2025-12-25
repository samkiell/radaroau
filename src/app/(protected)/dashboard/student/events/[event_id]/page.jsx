"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, Calendar, Clock, Ticket, Info, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const EventDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  // Handle potential URL encoding of the ID
  const eventId = decodeURIComponent(params.event_id);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  
  // Booking state
  const [quantity, setQuantity] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) return;
      
      try {
        const response = await api.get(`/events/${eventId}/details/`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBookTicket = async () => {
    if (event.allows_seat_selection && !selectedSeat) {
      toast.error("Please select a seat");
      return;
    }

    if (quantity < 1) {
      toast.error("Please select at least one ticket");
      return;
    }

    setBookingLoading(true);
    const toastId = toast.loading("Processing booking...");

    try {
      const payload = {
        event_id: eventId,
        quantity: parseInt(quantity),
        seat_number: selectedSeat
      };

      const response = await api.post("/tickets/book/", payload);
      
      // Handle Paid Event (Redirect to Paystack)
      if (response.data.payment_url) {
        toast.success("Redirecting to payment...", { id: toastId });
        window.location.href = response.data.payment_url;
        return;
      }

      // Handle Free Event (Success)
      toast.success("Ticket booked successfully!", { id: toastId });
      router.push("/dashboard/student/my-tickets");
      
    } catch (error) {
      console.error("Booking error:", error);
      const errorMessage = error.response?.data?.seat_number 
        ? error.response.data.seat_number[0] 
        : (error.response?.data?.error || "Failed to book ticket");
      
      toast.error(errorMessage, { id: toastId });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <Info className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Event not found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const eventDate = new Date(event.date);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-muted">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Calendar className="h-20 w-20 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
            event.pricing_type === 'free' 
              ? 'bg-green-500 text-white' 
              : 'bg-primary text-primary-foreground'
          }`}>
            {event.pricing_type === 'free' ? 'Free' : `₦${event.price}`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.name}</h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About this Event</h3>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
              {event.description}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quantity Selector */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity"
                  type="number" 
                  min="1" 
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>

              {/* Seat Selection */}
              {event.allows_seat_selection && (
                <div className="space-y-3">
                  <Label>Select a Seat</Label>
                  {event.available_seats && event.available_seats.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto p-1">
                      {event.available_seats.map((seat) => (
                        <button
                          key={seat}
                          onClick={() => setSelectedSeat(seat === selectedSeat ? null : seat)}
                          className={`p-2 text-sm rounded-md border transition-colors ${
                            selectedSeat === seat
                              ? "bg-primary text-primary-foreground border-primary"
                              : "hover:bg-secondary border-input"
                          }`}
                        >
                          {seat}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-red-500">No seats available</p>
                  )}
                  {selectedSeat && (
                    <p className="text-sm text-muted-foreground">
                      Selected Seat: <span className="font-bold text-foreground">{selectedSeat}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Price Summary */}
              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Price per ticket</span>
                  <span>{event.pricing_type === 'free' ? 'Free' : `₦${event.price}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {event.pricing_type === 'free' 
                      ? 'Free' 
                      : `₦${(event.price * quantity).toLocaleString()}`}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleBookTicket}
                disabled={bookingLoading || (event.allows_seat_selection && !selectedSeat)}
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Ticket className="mr-2 h-4 w-4" />
                    {event.pricing_type === 'free' ? 'Get Ticket' : 'Proceed to Payment'}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
