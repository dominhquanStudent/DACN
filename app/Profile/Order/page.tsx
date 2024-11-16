'use client';
import Header from "@/app/Component/Header/Header";
import Footer from '@/app/Component/Footer/Footer';
import ProfileNav from "@/app/Component/ProfileNav/ProfileNav";
import React, { useState, useEffect } from 'react';
import axios from '@/api/axios';
import { sendNotifications } from "@/ultis/notificationUtils";
import LoadingModal from "@/app/Component/Loading";
interface Product {
    product_id: number;
    product_name: string;
    product_image: string;
    price: number;
    discount_price: number;
    quantity: number;
}

interface Order {
    _id: string;
    user_id: string;
    phone_number: string;
    order_date: Date;
    delivery_date: Date;
    order_status: string;
    order_address: string;
    payment_method: string;
    payment_id: string;
    payment_url: string;
    employee_id: string;
    voucher_id: string[];
    total_price: number;
    product_list: Product[];
}

function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [loadWhat, setLoadWhat] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [sort, setSort] = useState('Tất cả')
    const handleSort = (e: any) => {
        setSort(e)
    }
    const [data, setData] = useState<Order[]>([]);
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`/order/list/User`);
                setData(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrderData();
    },);
    const handleReBuy = async (id: string) => {
            
        setLoadWhat("REBUY");
        try {
            setIsLoading(true);
            const response = await axios.post(`/order/rebuy/${id}`);
            setIsComplete(true);
            setIsLoading(false);
        } catch (error) {
            console.error("Error rebuy orders:", error);
        }
    };
    const handleCancel = async (order: Order) => {
        const id = order._id;
        setLoadWhat("CANCEL_ORDER");
        try {
            setIsLoading(true);
            const response = await axios.put(`/order/${id}/cancel`);
            setIsComplete(true);
            setIsLoading(false);
        } catch (error) {
            console.error("Error rebuy orders:", error);
        }
    };
    const handleRefund = async (order: Order) => {
        try {

        } catch (error) {
            console.error("Error refund orders:", error);
        }
    };
    const handlePayment = async (order: Order) => {
        try {
            const payment_data = {
                order_id: order._id,
                total_price: order.total_price,
                payment_id: order.payment_id,
            }
            console.log(order.payment_id);
            const payment = await axios.post("payment/ZALO", payment_data);
            if (payment.data.return_code === 1) {
                if (payment.data.order_url) {
                    window.open(payment.data.order_url, '_blank');
                }
            } else if (payment.data.return_code != 1) {
                const checkStatus = await axios.post(`payment/check_order_status/${order.payment_id}`);
                if (checkStatus.data.return_code != 1) {
                    window.open(order.payment_url, '_blank');
                } else {
                    sendNotifications({
                        user_id: order.user_id,
                        category: 'Đơn hàng',
                        Title: 'Thanh toán đơn hàng thành công',
                        content: `Đơn hàng ${order._id} đã được thanh toán thành công`,
                        status: 'Chưa đọc'
                    });
                }
            }
        } catch (error) {
            console.error("Error payment orders:", error);
        }
    };
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;
    // Calculate the orders to display on the current page
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = data.filter(order => sort === 'Tất cả' || order.order_status === sort).slice(indexOfFirstOrder, indexOfLastOrder);

    // Calculate total pages
    const totalPages = Math.ceil(data.filter(order => sort === 'Tất cả' || order.order_status === sort).length / ordersPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Generate pagination buttons
    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pageNumbers;
    };
    if(data.length===0) return (
        <LoadingModal isLoading={true} isComplete={false} setIsComplete={setIsComplete} loadWhat="LOADING_ORDER" />
    )
   if(data.length!==0) return (
        <div className="flex flex-col w-full ">
            <LoadingModal
                isLoading={isLoading}
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                loadWhat={loadWhat}
            />
            <Header />
            <div className="flex bg-[#DFF3FF] w-full " style={{ minHeight: '80vh' }}>
                <ProfileNav />
                {/* Right */}
                <div className="flex flex-col w-full bg-white py-4 px-12 my-8 mr-12 rounded-lg shadow-lg">
                    <div className="mb-4 font-nunito font-bold text-2xl">Lịch sử đơn hàng</div>
                    <div className="flex w-full items-center justify-around border border-slate-200 rounded-md shadow-xl font-k2d text-lg">
                        <button className={`px-4 py-2 rounded w-full ${sort == "Tất cả" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("Tất cả")}>Tất cả</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "Chờ thanh toán" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("Chờ thanh toán")}>Chờ thanh toán</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "Chờ xử lý" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("Chờ xử lý")}>Chờ xử lý</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "Đã xử lý" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("Đã xử lý")}>Đã xử lý</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "Đã hoàn thành" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("Đã hoàn thành")}>Đã hoàn thành</button>
                        <button className={`px-4 py-2 rounded w-full ${sort == "Đã hủy" ? "text-[#EDB24E] font-bold" : ""}`}
                            onClick={() => handleSort("Đã hủy")}>Đã hủy</button>
                    </div>
                    {
                        currentOrders
                            .filter(order => sort === 'Tất cả' || order.order_status === sort)
                            .map((order, index) => (
                                <div key={index} className="flex flex-col mt-4 py-2 border border-[#969090] rounded-md shadow-xl font-nunito w-full">
                                    <div className="flex justify-between items-center py-2 mx-16">
                                        <div className="text-xs font-bold text-left text-[#000000]">Mã đơn hàng: {order._id}</div>
                                        <div className="text-lg font-bold text-right text-[#ff0000]">{order.order_status}</div>
                                    </div>
                                    {order.product_list.map((product, productIndex) => (
                                        <div key={productIndex} className="flex flex-col w-full items-center">
                                            <div className='border border-[#C5C5CF] w-11/12 '></div>
                                            <div className="flex w-11/12 justify-between py-2">
                                                <div className="flex w-10/12">
                                                    <img src={product.product_image} className="h-20 w-auto" alt={product.product_name} />
                                                    <div className="flex flex-col ml-4">
                                                        <div className="text-lg">{product.product_name}</div>
                                                        <div className="text-sm ">x {product.quantity}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center w-1/6 ">
                                                    <div className="text-lg font-bold">{(product.discount_price * product.quantity).toLocaleString('vi-VN')}đ</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='border border-[#C5C5CF] w-full '></div>
                                    <div className="flex justify-between py-2 w-full">
                                        <div className="flex items-center justify-center w-8/12">
                                            {/* {order.order_status === 'Đã hoàn thành' &&
                                                <div className="w-1/2 flex justify-center">
                                                    <button className="bg-[#FC0E0E] text-white font-nunito p-2 rounded-md w-1/2"
                                                        onClick={() => handleRefund(order)}>Trả hàng</button>
                                                </div>
                                            } */}
                                            {order.order_status === 'Chờ thanh toán' &&
                                                <div className="w-1/2 flex justify-center">
                                                    <button className="bg-[#EDB24E] text-white font-nunito p-2 rounded-md w-1/2"
                                                        onClick={() => handlePayment(order)}>Thanh toán</button>

                                                </div>
                                            }
                                            {order.order_status !== 'Chờ thanh toán' &&
                                            <div className="w-1/2 flex justify-center">
                                                <button className="bg-[#EDB24E] text-white font-nunito p-2 rounded-md w-1/2"
                                                    onClick={() => handleReBuy(order._id)}>Mua lại</button>
                                            </div>
                                            }
                                            {order.order_status === 'Chờ xử lý' &&
                                                <div className="w-1/2 flex justify-center">
                                                    <button className="bg-[#FC0E0E] text-white font-nunito p-2 rounded-md w-1/2"
                                                        onClick={() => handleCancel(order)}>Hủy đơn hàng</button>
                                                </div>
                                            }
                                            {order.order_status === 'Chờ thanh toán' &&
                                                <div className="w-1/2 flex justify-center">
                                                    <button className="bg-[#FC0E0E] text-white font-nunito p-2 rounded-md w-1/2"
                                                        onClick={() => handleCancel(order)}>Hủy đơn hàng</button>
                                                </div>
                                            }
                                        </div>
                                        <div className="flex-grow flex-col text-lg ml-4">
                                            <div className="flex w-full">
                                                <div className="w-6/12">Tổng cộng: </div>
                                                <div className="font-bold">{order.product_list.reduce((total, product) => total + product.discount_price * product.quantity, 0).toLocaleString('vi-VN')} đ</div>
                                            </div>
                                            <div className="flex w-full">
                                                <div className="w-6/12">Giảm giá: </div>
                                                <div className="font-bold">- {(order.product_list.reduce((total, product) => total + product.discount_price * product.quantity, 0) - order.total_price).toLocaleString('vi-VN')} đ</div>
                                            </div>
                                            <div className="flex w-full">
                                                <div className="w-6/12">Thành tiền: </div>
                                                <div className="text-[#ff0000] font-bold">{order.total_price.toLocaleString('vi-VN')} đ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                    <div className="pagination flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
                            disabled={currentPage === 1}
                        >
                            &laquo;
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {renderPageNumbers().map((pageNumber, index) => (
                            <button
                                key={index}
                                onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
                                className={`px-3 py-1 mx-1 ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                disabled={typeof pageNumber !== 'number'}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300"
                            disabled={currentPage === totalPages}
                        >
                            &raquo;
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Page;