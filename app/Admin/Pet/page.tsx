'use client';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import { useRouter } from 'next/navigation'
function Pet() {
    // Example products data
    const pet = [
        { id: 1, image: '/img/Pet/bull.png', name: 'Bull', date: "2023-04-01", age:"2 tuổi", tiemphong:"Chưa", status:"Được nhận nuôi" },
        { id: 2, image: '/img/Pet/Gau.png', name: 'Gấu', date: "2023-09-01", age:"6 tháng", tiemphong:"Rồi", status:"Chưa nhận nuôi"},
        // Add more products as needed
    ];
    const Router = useRouter();
    const handleChangeClick = (productId: any) => {
        console.log(`Details for order ${productId}`);
        Router.push('/Admin/Pet/PetDetail');
        // Here you can navigate to a detail page or open a modal
      };
      const handleAddClick = () => {
        console.log(`Add for order`);
        Router.push('/Admin/Pet/AddPet');
        // Here you can navigate to a detail page or open a modal
      };

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            <Header></Header>
            <div className='flex w-full'>
                <Sidebar></Sidebar>
                <div className='w-3/4 border-l-2 border-gray-200 px-4'>
                    <div className={'flex font-nunito text-xl font-bold w-full justify-center mb-4'}>
                        Quản lý thú cưng
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
                                    Tên thú cưng
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ngày nhận
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Tuổi
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Tiêm phòng
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Chi tiết
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pet.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <img src={product.image} alt={product.name} className="h-16 rounded-full" />
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.name}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.date}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.age}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.tiemphong}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {product.status}
                                    </td>
                                    <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={() => handleChangeClick(product.id)} className="text-blue-500 hover:text-blue-700">Chi tiết</button>
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
export default Pet;