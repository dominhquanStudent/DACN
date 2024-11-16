'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Doctor/sidebarDoctor';
import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function DashBoard() {
    const router = useRouter();
    const [dashboard, setdashboard] = useState<any>({
        "appointmentsToday": 0,
    });
    const [chartData, setChartData] = useState<any[]>([]);
    const sections = [
        { icon: '/img/icon/product.svg', title: 'Lịch khám hôm nay', value: dashboard.appointmentsToday, route: '/Doctor/Appointment' },
    ];

    const handleSectionClick = (route: string | undefined) => {
        if (route) {
            router.push(route);
        }
    };

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get('/dashboard/doctor');
                setdashboard(response.data);
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            }
        }
        fetchDashboard();
    }, []);

    const MonthDayFormat = (tick: any) => {
        const date = new Date(tick);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}-${month}`;
    }
    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {/* //Header */}
            <Header></Header>
            <div className='flex w-full'>
                <Sidebar></Sidebar>
                <div className='w-3/4 border-l-2 border-gray-200'>
                    <div className='flex flex-col ml-8'>
                        <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
                            Dash Board
                        </div>
                        <div className='font-nunito text-lg font-bold'>
                            Việc cần xử lý
                        </div>
                        <div className='flex space-x-10'>
                            {sections.map((section, index) => (
                                <div key={index} className='flex items-center justify-center space-x-4 cursor-pointer' onClick={() => handleSectionClick(section.route)}>
                                    <img loading="lazy" src={section.icon} className='h-1/2' alt={section.title} />
                                    <div className='flex flex-col'>
                                        <div>{section.title}</div>
                                        <div>{section.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='font-nunito text-lg font-bold mb-4'>
                            Thống kê công việc
                        </div>
                        <div className='w-full h-96'>
                            <ResponsiveContainer>
                                <LineChart
                                    data={dashboard.appointmentsLastweek2Nextweek}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 20, // Increased bottom margin
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="_id"
                                        label={{ value: 'Date', position: 'insideBottomRight', offset: -5 }}
                                        tick={{ textAnchor: 'end' }} // Rotated labels
                                        tickFormatter={MonthDayFormat} // Formatted date
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="count" name='Buổi' stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;