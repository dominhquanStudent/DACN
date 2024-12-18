"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../../Doctor/sidebarDoctor";
import Header from "@/app/Admin/Header";
import { useRouter } from "next/navigation";
import axios from "@/api/axios";
import Footer from "@/app/Component/Footer/Footer";
import { getCookie } from "cookies-next";
import getInfo from "@/hooks/getInfo";
import useSWR from "swr";

const localizer = momentLocalizer(moment);

const fetcher = (url: string) => axios.get(url).then(res => res.data);

function Appointment() {
  const [view, setView] = useState<any>('month'); // State to manage the current view
  const [date, setDate] = useState<Date>(new Date()); // State to manage the current date
  const [accountData, setAccountData] = useState<any>(null);
  const Router = useRouter();

  useEffect(() => {
    const fetchAccountData = async () => {
      const jwt = getCookie("jwt");
      if (jwt) {
        const accountData = await getInfo();
        setAccountData(accountData);
      }
    };

    fetchAccountData();
  }, []);

  const { data: appointmentsData, error: appointmentsError } = useSWR('/appointment/list', fetcher);

  if (appointmentsError) {
    console.error("Error fetching appointments:", appointmentsError);
  }

  const filteredAppointments = appointmentsData?.appointments.filter(
    (appointment: any) => appointment.doctorName === accountData?.userName
  ) || [];

  const events = filteredAppointments.map((appointment: any) => {
    const start = new Date(appointment.date);
    const end = new Date(start.getTime() + 30 * 60000); // Add 30 minutes to the start time
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
        <div className="w-3/4 h-full relative mt-4 mb-4">
          <div className="flex font-nunito text-xl font-bold w-full justify-center">
            Lịch hẹn khám bệnh
          </div>
 
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