'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function DashBoard() {
    const router = useRouter();
    const [dashboard, setdashboard] = useState<any>({
        "pendingOrders": 0,
        "pendingAppointments": 0,
        "pendingPets": 0,
        "pendingRescueRequests": 0
    });
    const [currentgraph, setcurrentgraph] = useState('revenue');
    const [orderData, setOrderData] = useState<any>({
        ordersAll: [],
        ordersMonth: [],
        unpaidOrders: [],
        nothandledOrders: [],
        handledOrders: [],
    });
    const [revenueData, setRevenueData] = useState<any>({
        revenue: []
    })
    const [petData, setPetData] = useState<any>({
        petsChuaCoChu: [],
        petsDangDuocYeuCau: [],
        petsDaCoChu: [],
        petsRequestsByDay: []
    })
    const [rescueData, setRescueData] = useState<any>({
        rescueRequestsByDay: []
    })
    const [appointmentData, setAppoinmentData] = useState<any>({
        appointmentsByDay: [],
        appointmentsPreview: []
    })
    const [selectedOption, setSelectedOption] = useState('ordersAll');
    const [selectedButton, setSelectedButton] = useState('revenue');

    const sections = [
        { icon: '/img/icon/order.svg', title: 'Số đơn hàng', value: dashboard.pendingOrders, route: '/Admin/Order' },
        { icon: '/img/icon/product.svg', title: 'Cuộc hẹn hiện tại', value: dashboard.pendingAppointments, route: '/Admin/Appointment' },
        { icon: '/img/icon/rescue.svg', title: 'Yêu cầu cứu hộ', value: dashboard.pendingRescueRequests, route: '/Admin/Rescue' },
        { icon: '/img/icon/product.svg', title: 'Số đơn nhận nuôi', value: dashboard.pendingPets, route: '/Admin/Adoption' },
    ];

    const handleSectionClick = (route: string | undefined) => {
        if (route) {
            router.push(route);
        }
    };
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get('/dashboard/count');
                setdashboard(response.data.dashboard);
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            }
        }
        const fetchGraphOrderData = async () => {
            try {
                const response = await axios.get('/dashboard/graph/order');
                setOrderData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };
        const fetchGraphAppointmentData = async () => {
            try {
                const response = await axios.get('/dashboard/graph/appointment');
                setAppoinmentData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        };
        const fetchGraphAdoptionData = async () => {
            try {
                const response = await axios.get('/dashboard/graph/adopt');
                setPetData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        }
        const fetchGraphRescueData = async () => {
            try {
                const response = await axios.get('/dashboard/graph/rescue');
                setRescueData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        }
        const fetchRevenueData = async () => {
            try {
                const response = await axios.get('/dashboard/graph/revenue');
                setRevenueData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        }
        fetchDashboard();
        fetchGraphAdoptionData();
        fetchGraphAppointmentData();
        fetchGraphOrderData();
        fetchGraphRescueData();
        fetchRevenueData();
    }, []);

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    const handleGraphChange = (graph: string) => {
        setcurrentgraph(graph);
        setSelectedButton(graph);
    };

    const getData = () => {
        if (currentgraph === 'orders') {
            switch (selectedOption) {
                case 'ordersAll':
                    return orderData.ordersAll;
                case 'ordersMonth':
                    return orderData.ordersMonth;
                case 'unpaidOrders':
                    return orderData.unpaidOrders;
                case 'nothandledOrders':
                    return orderData.nothandledOrders;
                case 'handledOrders':
                    return orderData.handledOrders;
                default:
                    return orderData.ordersAll;
            }
        } else if (currentgraph === 'revenue') {
            switch (selectedOption) {
                default:
                    return revenueData.revenue;
            }
        }
        else if (currentgraph === 'pets') {
            if (selectedOption === 'Thống kê') {
                return [
                    { name: 'Chưa có chủ', value: petData.petsChuaCoChu },
                    { name: 'Đang được yêu cầu', value: petData.petsDangDuocYeuCau },
                    { name: 'Đã có chủ', value: petData.petsDaCoChu },
                ];
            } else {
                switch (selectedOption) {
                    case 'petsRequestsByDay':
                        return petData.petsRequestsByDay;
                }
            }
        } else if (currentgraph === 'rescue') {
            switch (selectedOption) {
                case 'rescueRequestsByDay':
                    return rescueData.rescueRequestsByDay;
                default:
                    return rescueData.rescueRequestsByDay;
            }
        } else if (currentgraph === 'appointments') {
            switch (selectedOption) {
                case 'appointmentsByDay':
                    return appointmentData.appointmentsByDay;
                case 'appointmentsPreview':
                    return appointmentData.appointmentsPreview;
                default:
                    return appointmentData.appointmentsByDay;
            }
        }
    };

    const chartData = getData();
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
                            Thống kê đơn hàng
                        </div>
                        <div className='mb-4 flex space-x-2'>
                        <button onClick={() => handleGraphChange('revenue')} className={`p-2 rounded-2xl ${selectedButton === 'revenue' ? 'bg-[#EDB24E] text-white' : 'bg-blue-500 text-white'}`}>Doanh thu</button>
                            <button onClick={() => handleGraphChange('orders')} className={`p-2 rounded-2xl ${selectedButton === 'orders' ? 'bg-[#EDB24E] text-white' : 'bg-blue-500 text-white'}`}>Đơn hàng</button>
                            <button onClick={() => { handleGraphChange('pets'); setSelectedOption("Thống kê"); }} className={`p-2 rounded-2xl ${selectedButton === 'pets' ? 'bg-[#EDB24E] text-white' : 'bg-blue-500 text-white'}`}>Thú cưng</button>
                            <button onClick={() => handleGraphChange('rescue')} className={`p-2 rounded-2xl ${selectedButton === 'rescue' ? 'bg-[#EDB24E] text-white' : 'bg-blue-500 text-white'}`}>Cứu hộ</button>
                            <button onClick={() => handleGraphChange('appointments')} className={`p-2 rounded-2xl ${selectedButton === 'appointments' ? 'bg-[#EDB24E] text-white' : 'bg-blue-500 text-white'}`}>Lịch hẹn</button>
                        </div>
                        {currentgraph === 'orders' &&
                            <>
                                <div className='mb-4'>
                                    <label htmlFor="orderType" className='font-nunito text-lg font-bold'>Chọn loại thống kê đơn hàng </label>
                                    <select id="orderType" value={selectedOption} onChange={handleChange} className='ml-2'>
                                        <option value="ordersAll">Tất cả đơn hàng</option>
                                        <option value="ordersMonth">Tổng đơn hàng theo tháng</option>
                                        <option value="unpaidOrders">Đơn hàng chưa thanh toán</option>
                                        <option value="nothandledOrders">Đơn hàng chưa xử lý</option>
                                        <option value="handledOrders">Đơn hàng đã xử lý</option>
                                    </select>
                                </div>
                                <div className='w-full h-96'>
                                    <ResponsiveContainer>
                                        <LineChart
                                            data={chartData}
                                            margin={{
                                                top: 5, right: 30, left: 20, bottom: 20, // Increased bottom margin
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="_id"
                                                label={{ value: 'Date', position: 'insideBottomRight', offset: -5 }}
                                                tick={{ textAnchor: 'end' }} // Rotated labels
                                                angle={45} // Rotated labels
                                                tickFormatter={MonthDayFormat} // Formatted date
                                            />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="order" name='Đơn hàng' stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        }
                        {currentgraph === 'revenue' &&
                            <>
                                <div className='mb-4'>
                                    <label htmlFor="orderType" className='font-nunito text-lg font-bold'>Chọn loại doanh thu </label>
                                    <select id="revenueType" value={selectedOption} onChange={handleChange} className='ml-2'>
                                        <option value="revenue">Doanh thu tháng</option>
                                    </select>
                                </div>
                                <div className='w-full h-96'>
                                    <ResponsiveContainer>
                                        <LineChart
                                            data={chartData}
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
                                            <Line type="monotone" dataKey="totalRevenue" name='Tổng doanh thu' stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        }
                        {currentgraph === 'pets' &&
                            <>
                                <div className='mb-4'>
                                    <label htmlFor="petType" className='font-nunito text-lg font-bold'>Chọn loại thống kê Pet </label>
                                    <select id="petType" value={selectedOption} onChange={handleChange} className='ml-2'>
                                        <option value="Thống kê">Thống kê</option>
                                        <option value="petsRequestsByDay">Yêu cầu Pet</option>


                                    </select>
                                </div>
                                <div className='w-full h-96'>
                                    <ResponsiveContainer>
                                        {selectedOption === 'Thống kê' ? (
                                            <PieChart>
                                            <Pie
                                                data={chartData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={150}
                                                fill="#8884d8"
                                                label
                                            >
                                                {chartData.map((entry: any, index: any) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                        ) : (
                                            <LineChart
                                                data={chartData}
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
                                                <Line type="monotone" dataKey="count" name='Pet' stroke="#8884d8" activeDot={{ r: 8 }} />
                                            </LineChart>
                                        )}
                                    </ResponsiveContainer>
                                </div>
                            </>
                        }
                        {currentgraph === 'rescue' &&
                            <>
                                <div className='mb-4'>
                                    <label htmlFor="rescueType" className='font-nunito text-lg font-bold'>Chọn loại thống kê cứu hộ </label>
                                    <select id="rescueType" value={selectedOption} onChange={handleChange} className='ml-2'>
                                        <option value="rescueRequestsByDay">Yêu cầu cứu hộ trong tháng</option>
                                    </select>
                                </div>
                                <div className='w-full h-96'>
                                    <ResponsiveContainer>
                                        <LineChart
                                            data={chartData}
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
                                            <Line type="monotone" dataKey="count" name ="Yêu cầu" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        }
                        {currentgraph === 'appointments' &&
                            <>
                                <div className='mb-4'>
                                    <label htmlFor="appointmentType" className='font-nunito text-lg font-bold'>Chọn loại thống kê lịch hẹn </label>
                                    <select id="appointmentType" value={selectedOption} onChange={handleChange} className='ml-2'>
                                        <option value="appointmentsByDay">Số lịch hẹn được đặt theo ngày</option>
                                        <option value="appointmentsPreview">Những ngày có lịch hẹn</option>
                                    </select>
                                </div>
                                <div className='w-full h-96'>
                                    <ResponsiveContainer>
                                        <LineChart
                                            data={chartData}
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
                                            <Line type="monotone" dataKey="count" name='Buổi hẹn' stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;
