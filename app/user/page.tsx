'use client';
import { Container, Button } from '@mui/material';
import { Menu, Person } from '@mui/icons-material';
export default function UserHome() {
  return (
    <div className='h-25 '>
      <Container className='flex justify-between items-center bg-white shadow-lg'>
        <div className='text-[40px] font-bold text-[#FFC700] '>
          <Button href='/user/profile'>
          <Menu className='mr-20' fontSize='medium' htmlColor='#FFC700' /></Button>
          UniEat</div>
        <div>
          <Button href="/user/login" color='primary' className='bg-[#FFC700] rounded-xl text-[14px] text-[#000] w-28 font-sans '>
            <Person fontSize='medium' htmlColor='#000' /> LOG IN
          </Button>
          <Button href="/user/signup" className='ml-2.5 bg-[#000] rounded-xl border-black text-[14px] text-[#fff] w-28 font-sans'>
            SIGN UP
          </Button>
        </div>
      </Container>
      <Container className='h-56 bg-[#FFC700] flex flex-col items-center py-4'>
        <img src='/images/fork1.png' className='w-24 h-24'></img>
        <Container className='flex flex-col items-center'>
          <div className='text-[40px]'>UniEat</div>
          <div className='text-[24px]'>LIVE TO EAT</div>
        </Container>
      </Container>
      <Container className='px-24'>
        <div className='mt-2 text-[24px] font-bold font-sans'>Ưu đãi của UniEat</div>
        <div className='flex justify-between flex-row'>
          <Button href="/user/shoppage" className='flex flex-col items-start text-[#000]'>
            <img src='/images/trasua_1.png' className='w-72 h-42'></img>
            <div className='flex flex-row items-center justify-between'>
              <div className='text-[20px] font-sans'>Trà sữa Tocotoco</div>
              <img src='/images/heart.png' className='w-5 h-5 ml-12 flex-end' ></img>
            </div>
            <div className='text-[16px] font-sans text-zinc-500'>Trà sữa</div>
            <div className='flex flex-row'>
              <div className='flex flex-row items-center'>
                <img src='/images/star.png' className='w-5 h-5' ></img>
                <div className='mx-2 text-[16px] font-sans'>4.7</div>
              </div>
              <div className='flex flex-row items-center'>
                <img src='/images/clock.png' className='w-5 h-5' ></img>
                <div className='mx-2 text-[14px] font-sans'>15 phút - 0.8km</div>
              </div>
            </div>
            <div className='mt-2 flex flex-row items-center'>
              <img src='/images/couple.png' className='w-5 h-4' ></img>
              <div className='mx-2 text-[14px] font-sans'>Tocotoco discount 20%</div>
            </div>
            </Button>
            <Button href="/user/shoppage" className='flex flex-col items-start text-[#000]'>
            <img src='/images/trasua_1.png' className='w-72 h-42'></img>
            <div className='flex flex-row items-center justify-between'>
              <div className='text-[20px] font-sans'>Trà sữa Tocotoco</div>
              <img src='/images/heart.png' className='w-5 h-5 ml-12 flex-end' ></img>
            </div>
            <div className='text-[16px] font-sans text-zinc-500'>Trà sữa</div>
            <div className='flex flex-row'>
              <div className='flex flex-row items-center'>
                <img src='/images/star.png' className='w-5 h-5' ></img>
                <div className='mx-2 text-[16px] font-sans'>4.7</div>
              </div>
              <div className='flex flex-row items-center'>
                <img src='/images/clock.png' className='w-5 h-5' ></img>
                <div className='mx-2 text-[14px] font-sans'>15 phút - 0.8km</div>
              </div>
            </div>
            <div className='mt-2 flex flex-row items-center'>
              <img src='/images/couple.png' className='w-5 h-4' ></img>
              <div className='mx-2 text-[14px] font-sans'>Tocotoco discount 20%</div>
            </div>
            </Button>
            <Button href="/user/shoppage" className='flex flex-col items-start text-[#000]'>
            <img src='/images/trasua_1.png' className='w-72 h-42'></img>
            <div className='flex flex-row items-center justify-between'>
              <div className='text-[20px] font-sans'>Trà sữa Tocotoco</div>
              <img src='/images/heart.png' className='w-5 h-5 ml-12 flex-end' ></img>
            </div>
            <div className='text-[16px] font-sans text-zinc-500'>Trà sữa</div>
            <div className='flex flex-row'>
              <div className='flex flex-row items-center'>
                <img src='/images/star.png' className='w-5 h-5' ></img>
                <div className='mx-2 text-[16px] font-sans'>4.7</div>
              </div>
              <div className='flex flex-row items-center'>
                <img src='/images/clock.png' className='w-5 h-5' ></img>
                <div className='mx-2 text-[14px] font-sans'>15 phút - 0.8km</div>
              </div>
            </div>
            <div className='mt-2 flex flex-row items-center'>
              <img src='/images/couple.png' className='w-5 h-4' ></img>
              <div className='mx-2 text-[14px] font-sans'>Tocotoco discount 20%</div>
            </div>
            </Button>

        </div>
        <button className=" mt-4 border border-black rounded-3xl w-full h-8"> Xem thêm ưu đãi</button>
      </Container>
      <Container className='px-24'>
        <div className='mt-2 text-[24px] font-bold font-sans'>Khám phá theo danh mục</div>
        <div className='flex justify-between flex-row'>
          <div>
            <img src='/images/trasua_1.png' className='w-72 h-42'></img>
            <div className='text-[20px] font-sans'>Trà sữa</div>
          </div>
          <div>
            <img src='/images/trasua_1.png' className='w-72 h-42'></img>
            <div className='text-[20px] font-sans'>Cơm</div>
          </div>
          <div>
            <img src='/images/trasua_1.png' className='w-72 h-42'></img>
            <div className='text-[20px] font-sans'>Bánh mì</div>
          </div>

        </div>
        <button className=" mt-4 border border-black rounded-3xl w-full h-8"> Xem thêm ưu đãi</button>
      </Container>
      <Container className='px-24 text-justify text-20px font-sans'>
        <div className='mt-2 text-[24px] font-bold font-sans'>Vì sao bạn nên Order trên UniEat</div>
        <div className='ml-10 flex flex-row items-center'>
          <img src='/images/check.png' className='w-4 h-4'></img>
          <div className='ml-4' >Nhanh nhất- UniEat cung cấp dịch vụ giao đồ ăn nhanh nhất thị trường</div>
        </div>

        <div className='ml-10 flex flex-row items-center'>
          <img src='/images/check.png' className='w-4 h-4'></img>
          <div className='ml-4 ' >
            Dễ dàng nhất - Giờ đây, bạn chỉ cần thực hiện vài cú nhấp chuột hoặc chạm nhẹ là đã có thể đặt đồ ăn. Hãy đặt đồ ăn trực tuyến hoặc tải xuống siêu ứng dụng Grab của chúng tôi để có trải nghiệm nhanh hơn và thú vị hơn.
          </div>
        </div>
        <div className='ml-10 flex flex-row items-center '>
          <img src='/images/check.png' className='w-4 h-4'></img>
          <div className='ml-4 ' >
            Đáp ứng mọi nhu cầu - Từ món ăn đặc sản địa phương đến các nhà hàng được ưa thích, nhiều lựa chọn đa dạng chắc chắn sẽ luôn làm hài lòng khẩu vị của bạn.
          </div>
        </div>
        <div className='ml-10 flex flex-row items-center'>
          <img src='/images/check.png' className='w-4 h-4'></img>
          <div className='ml-4 ' >
            Thanh toán dễ dàng - Giao và nhận đồ ăn thật dễ dàng. Thanh toán bằng GrabPay thậm chí còn dễ dàng hơn nữa.
          </div>
        </div>
        <div className='ml-10 flex flex-row items-center'>
          <img src='/images/check.png' className='w-4 h-4'></img>
          <div className='ml-4 ' >
            Nhiều quà tặng hơn - Tích điểm GrabRewards cho mỗi đơn hàng của bạn và sử dụng điểm thưởng để đổi lấy nhiều ưu đãi hơn.
          </div>
        </div>
        <div>

        </div>
      </Container>
      <Container className='px-24'>
        <div className='mt-2 text-[20px] font-bold font-sans'>Những câu hỏi thường gặp</div>
        <div className='mt-2 text-[14px] font-sans mx-8'>
          <div className='font-bold text-[16px]'>Làm cách nào để đặt đồ ăn ở Làng đại học TPHCM?</div>
          <div className=''>Sau đây là cách đơn giản nhất để đặt đồ ăn qua UniEat khi bạn ở Làng đại học TPHCM:</div>
          <div className=''>- Tìm kiếm nhà hàng hoặc món ăn yêu thích - Nhập địa chỉ của bạn vào trang chủ. Xem các Nhà hàng và điểm ăn uống gần chỗ bạn trong danh sách của GrabFood. Chọn nhà hàng yêu thích, duyệt hết thực đơn và chọn món ăn bạn muốn đặt.</div>
          <div className=''>- Kiểm tra & Thanh toán - Sau khi chắc chắn rằng bạn đã đặt đầy đủ các món theo nhu cầu, hãy nhấp vào tab “ORDER NOW” (ĐẶT MÓN NGAY) và nhập địa chỉ giao đồ ăn cuối cùng. Chọn phương thức thanh toán phù hợp nhất với bạn và thanh toán.</div>
          <div className=''>- Giao hàng - UniEat đã thiết kế một hành trình phục vụ khách hàng liền mạch để bạn có thể thưởng thức món ăn một cách trọn vẹn. Chúng tôi sẽ gửi cho bạn email và tin nhắn SMS tức thời xác nhận đơn đặt hàng của bạn và thời gian giao hàng dự kiến. Sau đó chúng tôi sẽ giao ngay đồ ăn cho bạn.</div>
          <div className='font-bold text-[16px]'>Tôi có thể đặt đồ ăn trên GrabFood cho người khác không?</div>
          <div className=''>Tất nhiên rồi, hãy chăm sóc những người thân yêu của mình bằng cách gửi những món ăn mà họ yêu thích đến tận nhà. Bạn chỉ cần cập nhật địa chỉ giao hàng và tên người nhận trước khi đặt đơn hàng của bạn.</div>
          <button className=" mt-4 mx-8 border border-black rounded-3xl w-full h-10 text-[18px]"> Đọc thêm</button>
        </div>
      </Container>
      <Container className='mt-6 px-20 h-56 bg-[#FFC700] flex flex-col py-2 font-sans'>
    <div className='text-[36px] font-bold'>
      UniEat
    </div>
    <div className="border-t border-black"></div>
    <div className='mt-4 flex flex-row text-[18px] justify-between items-center'>
      <div className=''>
        <div>
          Về UniEat
        </div>
        <div className='mt-4'>
          Blog
        </div>
      </div>
      <div>
        <div>
          Mở quán trên UniEat
        </div>
        <div className='mt-4'>
          Trở thành tài xế UniEat
        </div>
      </div>
      <div>
        <div>
          Trung tâm hỗ trợ
        </div>
        <div className='mt-4'>
          Câu hỏi thường gặp
        </div>
      </div>
      <div className='flex justify-between w-28'>
        <img src='/images/facebook.png' className='w-6 h-6'></img>
        <img src='/images/insta.png' className='w-6 h-6'></img>
        <img src='/images/tiktok.png' className='w-6 h-6'></img>
      </div>
    </div>
    <div className="mt-4 border-t border-black"></div>
    <div className='flex justify-between'>
      <div className='mt-4 flex flex-row items-center'>
        <img src='/images/appstore.png' className='w-32 h-8'></img>
        <img src='/images/ggplay.png' className='ml-12 w-32 h-8'></img>
      </div>
      <div className='flex flex-row self-end '>
        <img src='/images/copyright.png' className='w-6 h-6'></img>
        <div>2024 UniEat</div>
      </div>
    </div>
  </Container>
    </div>
  );
}