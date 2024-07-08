'use client';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation'
function Product() {
    // Example products data
    const products = [
        { id: 1, image: '/img/Product_Main/foto.png', name: 'Sữa tắm dưỡng da cho chó Sanol', quantity: 10, price: '$10', status: 'Còn hàng' },
        { id: 2, image: '/img/Product_Main/foto1.png', name: 'Sữa tắm dưỡng da cho chó Moto', quantity: 15, price: '$15', status: 'Hết hàng' },
        // Add more products as needed
    ];
    const Router = useRouter();
    const handleChangeClick = (productId: any) => {
        console.log(`Details for order ${productId}`);
        Router.push('/Admin/Product/Detail');
        // Here you can navigate to a detail page or open a modal
      };
      const handleAddClick = () => {
        console.log(`Add for order`);
        Router.push('/Admin/Product/AddProduct');
        // Here you can navigate to a detail page or open a modal
      };

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <Header></Header>
            <div className='flex w-full'>
                <Sidebar></Sidebar>
                <div className='w-3/4 border-l-2 border-gray-200 px-4'>
                    <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
                        Quản lý sản phẩm
                    </div>
                    {/* Table */}
                    <div className='flex w-full space-x-2 mt-4'>
                    <button onClick={handleAddClick} className="bg-transparent border border-[#CCCCCC] text-black font-bold py-1 px-4 rounded-xl mb-2">
                      Thêm
                    </button>
                  </div>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Image
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Thêm
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <img src={product.image} alt={product.name} className="h-16 rounded-full" />
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.name}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.quantity}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.price}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.status}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={() => handleChangeClick(product.id)} className="text-blue-500 hover:text-blue-700">Sửa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Product;