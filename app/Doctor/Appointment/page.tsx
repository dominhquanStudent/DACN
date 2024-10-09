"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "@/app/Admin/sidebar";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import Footer from "@/app/Component/Footer/Footer";

const localizer = momentLocalizer(moment);

function Appointment() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const Router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointment/list");
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const events = appointments.map((appointment) => ({
    title: appointment.userName,
    start: new Date(appointment.date),
    end: new Date(appointment.date),
    id: appointment._id, // Add the appointment ID to the event
  }));

  const handleSelectEvent = (event: any) => {
    Router.push(`./Appointment/${event.id}`);
  };

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex w-full h-full">
        <div className="w-full h-full relative">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100vh" }}
            toolbar={true}
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            onSelectEvent={handleSelectEvent} // Handle event selection
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Appointment;