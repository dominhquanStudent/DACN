"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../../Doctor/sidebarDoctor";

import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import Footer from "@/app/Component/Footer/Footer";

const localizer = momentLocalizer(moment);

function Appointment() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [view, setView] = useState<any>('month'); // State to manage the current view
  const [date, setDate] = useState<Date>(new Date()); // State to manage the current date
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

  const events = appointments.map((appointment) => {
    const start = new Date(appointment.date);
    const end = new Date(start.getTime() + 30 * 60000); // Add 15 minutes to the start time
    return {
      title: appointment.userName,
      start: start,
      end: end,
      id: appointment._id, // Add the appointment ID to the event
    };
  });

  const handleSelectEvent = (event: any) => {
    Router.push(`./Appointment/${event.id}`);
  };

  const handleNavigate = (action: 'TODAY' | 'NEXT' | 'PREV') => {
    const newDate = new Date(date);
    switch (action) {
      case 'TODAY':
        setDate(new Date());
        break;
      case 'NEXT':
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() + 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() + 7);
        } else if (view === 'day') {
          newDate.setDate(newDate.getDate() + 1);
        }
        setDate(newDate);
        break;
      case 'PREV':
        if (view === 'month') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() - 7);
        } else if (view === 'day') {
          newDate.setDate(newDate.getDate() - 1);
        }
        setDate(newDate);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="w-full h-full relative">

 
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 200px)" }} // Adjust height to account for buttons
            toolbar={true} // Disable the default toolbar
            views={['month', 'week', 'day']}
            date={date} // Set the current date
            view={view} // Set the current view
            onView={(newView) => setView(newView)} // Update view state when view changes
            onNavigate={(newDate) => setDate(newDate)} // Update date state when navigation occurs
            onSelectEvent={handleSelectEvent} // Handle event selection
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Appointment;