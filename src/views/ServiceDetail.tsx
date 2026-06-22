import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft, 
  MessageSquare, 
  CheckCircle2, 
  Check,
  AlertTriangle,
  Globe,
  Image as LucideImage,
  MapPin,
  Smile,
  MoreHorizontal,
  Lock,
  Mail,
  User,
  X 
} from 'lucide-react';
import { SERVICES, CONTACT_INFO, IMAGES, getServiceImage } from '../data';

const SITE_URL = 'https://hm-media.vercel.app';

function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();

  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#f9f9fb] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[2rem] border border-[#eeeef0] text-center shadow-sm max-w-sm w-full space-y-4 font-sans">
          <AlertTriangle className="h-10 w-10 text-[#ba1a1a] mx-auto" />
          <h2 className="text-xl font-bold text-[#1a1c1d]">Không tìm thấy trang dịch vụ</h2>
          <p className="text-xs text-[#5f5e60] leading-relaxed">
            Dịch vụ này có vẻ không tồn tại hoặc đã được thay đổi. Vui lòng quay lại danh mục chính.
          </p>
          <Link
            to="/services"
            className="block w-full py-3 rounded-full bg-[#0059b5] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#00458f] transition-all text-center"
          >
            Quay Về Danh Mục
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic values helper functions
  const getShortName = (sSlug: string) => {
    switch (sSlug) {
      case 'phuc-hoi-hack': return 'Bị Hack';
      case 'mo-khoa-ket-tim-956': return 'Két Sắt 956';
      case 'vi-pham-tieu-chuan': return 'Vi Phạm';
      case 'xac-minh-danh-tinh-2fa': return '2FA';
      case 'khoa-bat-xac-minh': return 'Xác Minh';
      case 'vo-hieu-hoa-180-ngay': return 'Lỗi 180 ngày';
      case 'khoa-do-protect': return 'Protect';
      case 'vo-hieu-hoa-vinh-vien': return 'Bị khóa vĩnh viễn';
      case 'xac-minh-nhan-tin': return 'Nhắn Tin';
      default: return 'Dịch vụ';
    }
  };

  const getCategoryLabel = (cat: string) => {
    return cat === 'security' ? 'Bảo mật' : 'Khôi phục';
  };

  const getBeforeAfterData = (sSlug: string) => {
    switch (sSlug) {
      case 'phuc-hoi-hack':
        return {
          beforeTitle: 'Mắc kẹt mất thông tin',
          beforeDesc: 'Hacker chiếm đoạt, đổi sạch Email và số điện thoại đăng ký, cài thêm khóa bảo mật hai lớp giả mạo nhằm cưỡng đoạt tài sản.',
          afterTitle: 'Phục hồi sạch',
          afterDesc: 'Xóa thiết bị lạ hoàn toàn, cập nhật thông tin đăng ký chính chủ, khôi phục toàn quyền kiểm soát tài khoản chính chủ an toàn.'
        };
      case 'mo-khoa-ket-tim-956':
        return {
          beforeTitle: 'Bị khóa két sắt tím',
          beforeDesc: 'Màn hình Facebook báo tài khoản bị khóa dạng 956, không hiện nút bắt đầu xác minh và bị treo nút tìm hiểu thêm lâu ngày.',
          afterTitle: 'Truy cập thành công',
          afterDesc: 'Xử lý lỗi két sắt tím hoàn toàn, mở rộng biểu mẫu để khách tự nhận mã OTP đăng nhập về hòm thư hoặc số di động gốc.'
        };
      case 'vi-pham-tieu-chuan':
        return {
          beforeTitle: 'Hạn chế do lỗi quét ảo',
          beforeDesc: 'Hệ thống AI Meta quét nhầm từ khóa hoặc hình ảnh, dẫn đến tài khoản bị chặn các tính năng tương tác, thậm chí tạm ngưng.',
          afterTitle: 'Tài khoản hoạt động tốt',
          afterDesc: 'Liên hệ cổng đại lý hỗ trợ Doanh nghiệp rà soát thủ công đơn kháng nghị, xóa các lỗi quét ảo và đưa nick lại hoạt động tốt.'
        };
      case 'xac-minh-danh-tinh-2fa':
        return {
          beforeTitle: 'Mắc kẹt ở bước xác thực',
          beforeDesc: 'Không nhận được mã xác nhận SMS gửi về, mất quyền truy cập trình Authenticator hoặc thiết bị phê duyệt bị hỏng.',
          afterTitle: 'Truy cập thành công',
          afterDesc: 'Vượt qua rào cản 2FA một cách hợp lệ, khôi phục toàn quyền kiểm soát tài khoản chính chủ an toàn tuyệt đối.'
        };
      case 'khoa-bat-xac-minh':
        return {
          beforeTitle: 'Úp căn cước bị từ chối',
          beforeDesc: 'Lỗi tải giấy tờ tùy thân liên tục bị robot tự động bác bỏ, thông tin đăng ký tên hiển thị bị lệch so với chứng minh nhân dân.',
          afterTitle: 'Xác minh thành công',
          afterDesc: 'Hồ sơ pháp lý được chế tạo chỉnh chu theo chuỗi phôi chuẩn mượt mà được phê duyệt tự động mở khóa trạng thái bền vững.'
        };
      case 'vo-hieu-hoa-180-ngay':
        return {
          beforeTitle: 'Đếm ngược 180 ngày',
          beforeDesc: 'Màn hình hiển thị án phạt vô hiệu hóa 180 ngày lỗi quét 282, nếu không gửi quyết định rà soát kịp thời tài khoản sẽ bị đóng vĩnh viễn.',
          afterTitle: 'Kháng độc lập thành công',
          afterDesc: 'Gửi khiếu nại thành công lên phòng thanh tra Meta, khôi phục uy tín trang cá nhân hoạt động mượt mà trở lại bình thường.'
        };
      case 'khoa-do-protect':
        return {
          beforeTitle: 'Vòng lặp lỗi bảo vệ',
          beforeDesc: 'Bắt buộc đăng ký Facebook Protect bảo mật tăng cường nhưng hệ thống gặp lỗi phản hồi lặp khiến tài khoản bị khóa phiên.',
          afterTitle: 'Kích hoạt chuẩn chỉ',
          afterDesc: 'Gỡ bypass lỗi đăng nhập, hoàn tất thiết lập bảo vệ 2 lớp cao cấp theo đúng chuẩn khuyến nghị quốc tế của Meta.'
        };
      case 'vo-hieu-hoa-vinh-vien':
        return {
          beforeTitle: 'Treo vô hiệu hóa vĩnh viễn',
          beforeDesc: 'Đơn kháng nghị tự úp bị khóa vĩnh viễn, không thể yêu cầu kháng nghị lại qua các cổng biểu mẫu công khai bình thường.',
          afterTitle: 'Mở khóa đặc biệt VIP',
          afterDesc: 'Đẩy yêu cầu trực tiếp qua cổng Meta Business Partner VIP ưu tiên xem xét để kỹ thuật viên rà soát lỗi và mở lại thủ công.'
        };
      case 'xac-minh-nhan-tin':
        return {
          beforeTitle: 'Chặn tin nhắn cực kỳ phiền toái',
          beforeDesc: 'Messenger báo lỗi gửi tin nhắn cho người lạ không thành công, chatbox bán hàng bị đưa vào danh bạ spam liên tục.',
          afterTitle: 'Thông suốt nhắn tin',
          afterDesc: 'Mở khóa giới hạn ranh giới Messenger, tối ưu hóa điểm tin cậy tài khoản tiếp cận khách hàng nhanh chóng, mượt mà.'
        };
      default:
        return {
          beforeTitle: 'Tình trạng lỗi hoạt động',
          beforeDesc: 'Tài khoản dính hạn chế tính năng, bị chặn đăng nhập tạm thời do vi phạm thuật toán bảo mật tự động quét.',
          afterTitle: 'Xử lý thành công',
          afterDesc: 'Tài khoản hoạt động ổn định bình thường, tối ưu hóa chế độ an toàn và an toàn tuyệt đối.'
        };
    }
  };

  const getCustomAudience = (sSlug: string) => {
    switch (sSlug) {
      case 'phuc-hoi-hack':
        return [
          'Chủ tài khoản bị hacker thay đổi sạch Email & Số điện thoại.',
          'Các cá nhân, chủ shop bán hàng bị hacker cài đặt 2FA rào cản.',
          'Người dùng lo sợ bị hacker giả mạo tin nhắn đi lừa bạn bè.',
          'Cần thu hồi các phiên đăng nhập lạ lạm dụng trang cá nhân.'
        ];
      case 'mo-khoa-ket-tim-956':
        return [
          'Tài khoản bị bắt xác minh két sắt tím 956 không hiển thị nút.',
          'Nick bị treo nút "Tìm hiểu thêm" lâu ngày không chuyển dạng.',
          'Cần chuyển đổi dạng xác nhận sang SĐT hoặc Hòm thư tiện ích.',
          'Hệ thống lặp lỗi báo cáo không nhận dạng đăng nhập thiết bị cũ.'
        ];
      case 'vi-pham-tieu-chuan':
        return [
          'Nhận thông báo đình chỉ do vi phạm tiêu chuẩn cộng đồng.',
          'Bị thuật toán quét nhầm do đăng tải từ khóa nhạy cảm.',
          'Cần khôi phục nhanh để tiếp tục kinh doanh online.',
          'Tránh bị tích lũy điểm vi phạm làm đóng băng vĩnh viễn trang.'
        ];
      case 'xac-minh-danh-tinh-2fa':
        return [
          'Mất thiết bị điện thoại nhận mã SMS OTP bí mật.',
          'Vô tình gỡ cài đặt ứng dụng Authenticator tạo mã xác minh.',
          'Lỗi mất 10 mã khôi phục dự phòng lúc ban đầu cài đặt.',
          'Nhà mạng gặp trục trặc kỹ thuật chặn không cho gửi SMS về máy.'
        ];
      case 'khoa-bat-xac-minh':
        return [
          'Bị từ chối úp ảnh căn cước công dân tự động liên tục.',
          'Thông tin cá nhân đăng ký tài khoản bị lệch so với CMND.',
          'Hệ thống bắt xác định gương mặt bạn bè cực khó khăn.',
          'Nhà quảng cáo cần xác minh nhân thân để mở trình quảng cáo Ads.'
        ];
      case 'vo-hieu-hoa-180-ngay':
        return [
          'Nhận thông báo dính lỗi 282 vô hiệu hóa đếm ngược 180 ngày.',
          'Lo sợ đăng tải hình ảnh khuôn mặt bị AI treo vĩnh viễn không duyệt.',
          'Cần giải quyết khẩn cấp trong thời gian cho phép khiếu nại.',
          'Khách hàng còn giữ thông tin truy cập hòm thư Email liên quan.'
        ];
      case 'khoa-do-protect':
        return [
          'Tài khoản có lượng follower lớn hoặc cầm Page đông thành viên.',
          'Mất quyền truy cập do quá hạn đăng ký Facebook Protect.',
          'Lỗi lặp vòng không thể nhấn biểu mẫu "Bắt đầu bảo vệ".',
          'Cần bảo mật tối tân phòng chống rò rỉ dữ liệu của admin.'
        ];
      case 'vo-hieu-hoa-vinh-vien':
        return [
          'Trạng thái tài khoản đã quá hạn khiếu nại thông thường 30 ngày.',
          'Tự kháng nghị bị báo đỏ từ chối "Quyết định không thể thay đổi".',
          'Muốn thử cơ hội cuối cùng để lấy lại dữ liệu kinh doanh quý báu.',
          'Tài khoản có thương hiệu hoặc tài sản quảng cáo giá trị cực cao.'
        ];
      case 'xac-minh-nhan-tin':
        return [
          'Bị chặn năng lực nhắn tin trò chuyện với người lạ trên Messenger.',
          'Tin nhắn khách hàng bị chuyển tự động vào mục lọc Spam bí mật.',
          'Nick có điểm uy tín giảm sút do gửi quá nhiều nội dung rập khuôn.',
          'Cần giải phóng hạn nhắn tin mượt mà phục vụ shop chốt đơn hàng.'
        ];
      default:
        return [
          'Gặp sự cố đăng nhập tài khoản khó tự giải quyết.',
          'Muốn xử lý an toàn bằng các kỹ thuật chính quy, bảo mật.',
          'Không muốn lấy thông tin qua các website lừa đảo tràn lan.',
          'Cần chuyên gia thẩm định bệnh tình chuẩn xác, miễn phí.'
        ];
    }
  };

  const getCustomReviews = (sSlug: string) => {
    // We can map customized user stories for a rich dynamic content experience!
    switch (sSlug) {
      case 'phuc-hoi-hack':
        return [
          { name: 'Khánh Duy', role: 'Kinh doanh thời trang', text: 'Tài khoản bán hàng bị đổi sạch email sđt, lại còn dính quả 2FA kích hoạt ảo. Anh Mỹ lấy lại cực nhanh, còn cài đặt bảo mật 3 lớp uy tín vô đối.' },
          { name: 'Thanh Hằng', role: 'KOL Tự Do', text: 'Bị tụi xấu lừa mất mã xác nhận hack bay nick 200k follow. May mắn tìm đúng địa chỉ anh Mỹ can thiệp kịp thời lấy lại nguyên vẹn thông tin.' },
          { name: 'Quốc Đạt', role: 'Streamer game', text: 'Dịch vụ uy tín làm nhanh gọn, không lấy cọc trước như trên mạng. Giao dịch trực tiếp thanh toán sau khi đăng nhập thành công.' }
        ];
      case 'mo-khoa-ket-tim-956':
        return [
          { name: 'Minh Hoàng', role: 'Kinh doanh Online', text: 'Acc chính chủ dính két sắt tím cứ bắt xác nhận thiết bị cũ hồi nào giờ bỏ xó. Anh Mỹ ngâm IP đổi sang mở mã email cái về luôn. Thật thần kỳ.' },
          { name: 'Thu Thủy', role: 'Cá nhân', text: 'Nick treo tìm hiểu thêm ròng rã suốt 3 tháng thử đủ mẹo trên youtube không được, anh Mỹ làm trong 30 phút là vào được nick. Đỉnh thật sự.' },
          { name: 'Tấn Tài', role: 'Freelancer', text: 'Hỗ trợ nhiệt tình, giải thích cặn kẽ chứ không hứa suông lập lờ như mấy ông dịch vụ tràn lan khác.' }
        ];
      default:
        return [
          { name: 'Minh Tuấn', role: 'Kinh doanh online', text: 'Mất điện thoại nên mất luôn app lấy mã. Tưởng mất luôn nick bán hàng rồi. May nhờ bạn xử lý trong ngày là vào lại được. Quá chuyên nghiệp.' },
          { name: 'Hoàng Anh', role: 'Cá nhân', text: 'Acc phụ bị dính 2FA SMS mà sim đó bỏ lâu rồi. Đã thử đủ cách trên mạng không được. Nhờ dịch vụ làm 2 hôm là xong. Rất uy tín.' },
          { name: 'Linh Chi', role: 'Freelancer', text: 'Được support rất nhiệt tình, giải thích rõ ràng quy trình chứ không hứa hẹn suông. Tài khoản đã về an toàn. 10 điểm chất lượng.' }
        ];
    }
  };

  const beforeAfter = getBeforeAfterData(service.slug);
  const audienceList = getCustomAudience(service.slug);
  const reviews = getCustomReviews(service.slug);

  return (
    <div id="service-detail-page-container" className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] pt-24 pb-16">
      <Helmet>
        <title>{service.title} | Hoàng Mỹ Media</title>
        <meta name="description" content={service.description} />
        <meta property="og:title" content={service.title} />
        <meta property="og:description" content={service.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/services/${service.slug}`} />
        <meta property="og:image" content={getServiceImage(service.imageUrl)} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${SITE_URL}/services/${service.slug}`} />
      </Helmet>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        
        {/* Breadcrumb Navigation Block */}
        <section className="flex items-center space-x-1.5 text-xs text-[#0059b5] font-sans font-bold uppercase tracking-wider py-4">
          <Link to="/" className="hover:opacity-80 transition-opacity">Trang chủ</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#eeeef0]" />
          <Link to="/services" className="hover:opacity-80 transition-opacity">Dịch vụ</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#eeeef0]" />
          <span className="text-[#5f5e60] truncate">{getShortName(service.slug)}</span>
        </section>

        {/* Back Link Row */}
        <div className="text-left py-2 mb-4">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-xs font-sans font-bold text-[#5f5e60] hover:text-[#0059b5] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>DANH SÁCH DỊCH VỤ</span>
          </Link>
        </div>

        {/* Heading Section */}
        <section className="py-6 text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#eeeef0] text-[#0059b5] font-sans text-[11px] font-bold tracking-widest uppercase">
            {getCategoryLabel(service.category)}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1a1c1d] tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="font-sans text-sm sm:text-[15px] text-[#414753] leading-relaxed max-w-2xl mx-auto pt-2">
            {service.description}
          </p>
        </section>

        {/* Before & After Comparison Mockups */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Before Card */}
            <div className="bg-white rounded-[2rem] border border-[#eeeef0] p-3 flex flex-col justify-between group transition-all duration-300 shadow-[0_10px_40px_rgba(95,94,96,0.015)] hover:shadow-[0_15px_45px_rgba(95,94,96,0.04)] h-full">
              {service.slug === 'phuc-hoi-hack' ? (
                /* High-fidelity simulated device mockup for hacked status: choice selection screen */
                <div className="relative w-full min-h-[500px] h-[540px] rounded-[1.5rem] overflow-hidden bg-[#0a0a0c] p-4 flex flex-col justify-between border-4 border-[#242526] shadow-inner select-none font-sans text-white">
                  
                  {/* Status Bar simulation */ }
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white/90 px-2 pt-1 pb-2">
                    <div className="flex items-center gap-1">
                      <span>12:16</span>
                      <svg className="h-3 w-3 fill-sky-400" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                    </div>
                    {/* Dynamic notch pill */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[100px] h-[20px] bg-black rounded-full border border-white/5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-auto mr-4"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {/* iOS icons */}
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c3.9 1.56 8.37.6 11.27-2.3 2.9-2.9 3.86-7.37 2.3-11.27l-1.79 1.79C16.96 11.12 17 11.56 17 12c0 2.76-2.24 5-5 5-.44 0-.88-.04-1.29-.12l-1.5 1.5C10.1 18.78 11.03 19 12 19c3.87 0 7-3.13 7-7 0-.97-.22-1.9-.6-2.76l-1.74 1.74c.2.62.34 1.28.34 2.02v.03c0 2.21-1.79 4-4 4-.74 0-1.4-.2-1.97-.53L9.5 18.03c.73.53 1.62.97 2.5.97 3.31 0 6-2.69 6-6 0-1.25-.38-2.4-.97-3.37L15.3 11.4c.18.57.26 1.18.26 1.8 0 1.66-1.34 3-3 3-.62 0-1.23-.21-1.72-.59L8.43 18.02A6.978 6.978 0 0012 19c3.87 0 7-3.13 7-7 0-.97-.22-1.9-.6-2.76z"/></svg>
                      <span className="text-[9px]">5G</span>
                      <div className="w-[18px] h-[9px] border border-white/75 rounded-[3px] p-[1px] flex items-center">
                        <div className="bg-white h-full w-[54%] rounded-[1.5px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Top action back */}
                  <div className="flex items-center justify-between px-1 py-1">
                    <button className="p-1 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="text-[10px] text-slate-500 font-mono font-bold tracking-widest bg-slate-900 border border-slate-800 px-3 py-1 rounded-full uppercase">
                      CASE HACK GỐC
                    </div>
                  </div>

                  {/* Main login box */}
                  <div className="flex flex-col items-center mt-4">
                    {/* Girl User Avatar */}
                    <div className="relative">
                      <img 
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 shadow-md" 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
                        alt="Lưu Phương Nguyễn"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ba1a1a] rounded-full border-2 border-[#0a0a0c] flex items-center justify-center">
                        <svg className="h-3 w-3 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                      </div>
                    </div>

                    <h3 className="font-sans text-base font-extrabold text-white tracking-wide mt-3.5">
                      Lưu Phương Nguyễn
                    </h3>
                    <p className="font-sans text-[12.5px] text-slate-400 font-medium mt-0.5">
                      Chọn cách đăng nhập.
                    </p>
                  </div>

                  {/* Option Choice Box */}
                  <div className="bg-[#1c1d1f] border border-slate-800 rounded-2xl p-4.5 mt-5.5 space-y-4">
                    {/* Box 1 (Altered/Hacked) */}
                    <div className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-start gap-3 text-left">
                        <Mail className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="font-sans text-[12.5px] font-bold text-slate-100 leading-tight">
                            Nhận mã hoặc liên kết qua email
                          </p>
                          <p className="font-mono text-xs text-amber-400 font-semibold tracking-wide flex items-center gap-1.5 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 w-fit">
                            <span>g*****2@l*******.com</span>
                          </p>
                        </div>
                      </div>
                      <div className="h-4.5 w-4.5 rounded-full border-2 border-sky-500 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-sky-500"></div>
                      </div>
                    </div>

                    <div className="h-px bg-slate-800/80"></div>

                    {/* Box 2 */}
                    <div className="flex items-center justify-between cursor-pointer group hover:opacity-90">
                      <div className="flex items-center gap-3 text-left">
                        <Lock className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                        <p className="font-sans text-[12.5px] font-semibold text-slate-300">
                          Nhập mật khẩu để đăng nhập
                        </p>
                      </div>
                      <div className="h-4.5 w-4.5 rounded-full border-2 border-slate-600 shrink-0"></div>
                    </div>
                  </div>

                  {/* Problem link */}
                  <span className="font-sans text-xs font-semibold text-sky-400 text-center hover:underline cursor-pointer block mt-4.5">
                    Không dùng được các cách trên?
                  </span>

                  {/* Big primary CTA Button */}
                  <button className="w-full bg-[#1877f2] hover:bg-sky-600 active:scale-98 text-white text-xs font-bold py-3.5 px-4 rounded-xl mt-auto transition-transform block cursor-pointer">
                    Tiếp tục
                  </button>

                  {/* Phone Bottom Pill bar */}
                  <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-4"></div>

                  <div className="absolute top-4 left-4 bg-[#ba1a1a]/95 text-white px-3.5 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider shadow z-10">
                    Tình trạng lỗi (Bị hacker đổi hòm thư)
                  </div>
                </div>
              ) : service.slug === 'mo-khoa-ket-tim-956' ? (
                /* Custom high-fidelity before screen for Mo khoa ket tim 956: Locked status */
                <div className="relative w-full min-h-[500px] h-[540px] rounded-[1.5rem] overflow-hidden bg-[#18191a] p-4 flex flex-col justify-between border-4 border-[#242526] shadow-2xl select-none font-sans text-white">
                  {/* Status Bar simulation */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white/90 px-2 pt-1 pb-2">
                    <div className="flex items-center gap-1">
                      <span>12:16</span>
                      <svg className="h-3 w-3 fill-sky-400" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                    </div>
                    {/* Notch simulation */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[100px] h-[20px] bg-black rounded-full border border-white/5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-auto mr-4"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px]">5G</span>
                      <div className="w-[18px] h-[9px] border border-white/75 rounded-[3px] p-[1px] flex items-center">
                        <div className="bg-red-500 h-full w-[24%] rounded-[1.5px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Top Bar Action */}
                  <div className="flex items-center justify-between px-1 py-1">
                    <button className="p-1 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="text-[10px] text-red-400 font-mono font-bold tracking-widest bg-red-950/30 border border-red-900/30 px-3 py-1 rounded-full uppercase">
                      CASE BỊ TREO TÍM 956
                    </div>
                  </div>

                  {/* Center content */}
                  <div className="flex flex-col items-center justify-center my-auto px-4">
                    {/* Locked Padlock SVG mockup */}
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center relative shadow-lg">
                      <svg className="w-11 h-11 text-[#7c4dff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="5" y="11" width="14" height="10" rx="2" fill="#7c4dff" fillOpacity="0.15" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                      </svg>
                      {/* Girl face profile overlap */}
                      <img 
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full object-cover border-2 border-white shadow-md grayscale" 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                        alt="Lưu Phương Nguyễn"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-[#ba1a1a] rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                        ✕
                      </div>
                    </div>

                    <h3 className="font-sans text-[15.5px] font-extrabold text-[#e4e6eb] tracking-tight mt-4.5">
                      Tài khoản của bạn đã bị khóa
                    </h3>
                    <p className="font-sans text-[11.5px] text-[#b0b3b8] text-center leading-relaxed mt-2.5">
                      Chúng tôi phát hiện thấy hoạt động bất thường trên tài khoản của bạn. Điều này có nghĩa là ai đó có thể đã sử dụng tài khoản của bạn mà bạn không hay biết.
                    </p>

                    {/* Treo status notification box */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3.5 mt-4 text-left w-full">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <p className="font-sans text-[11.5px] font-bold text-red-400">
                            Lỗi Két Sắt Tím (Lỗi 956) bị treo
                          </p>
                          <p className="font-sans text-[10.5px] text-slate-400 leading-snug">
                            Màn hình đứng im, không hiển thị bất cứ tùy chọn gửi mã SMS hay Email nào và hiển thị vòng lặp Tìm hiểu thêm.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grayed CTA Button */}
                  <button className="w-full bg-[#3a3b3c] text-slate-400 text-xs font-bold py-3.5 px-4 rounded-xl mt-auto transition-all block cursor-not-allowed">
                    Tìm hiểu thêm (Bị treo vô hạn)
                  </button>

                  <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-4"></div>

                  <div className="absolute top-4 left-4 bg-[#ba1a1a]/95 text-white px-3.5 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider shadow z-10">
                    Khóa Két Sắt Tím (Lỗi 956)
                  </div>
                </div>
              ) : (
                /* Standard Fallback: Render regular Image Frame */
                <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-[#f3f3f5] flex items-center justify-center p-2">
                  <img 
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-500" 
                    src={getServiceImage(service.imageUrl)} 
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#ba1a1a] text-white px-3.5 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
                    Tình trạng lỗi
                  </div>
                </div>
              )}
              <div className="p-6 text-left space-y-2 mt-auto">
                <h3 className="font-display text-base sm:text-lg font-extrabold text-[#1a1c1d]">
                  {beforeAfter.beforeTitle}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                  {beforeAfter.beforeDesc}
                </p>
              </div>
            </div>

            {/* After Card */}
            <div className="bg-white rounded-[2rem] border border-[#eeeef0] p-3 flex flex-col justify-between group transition-all duration-300 shadow-[0_10px_40px_rgba(95,94,96,0.015)] hover:shadow-[0_15px_45px_rgba(95,94,96,0.04)] h-full">
              {service.slug === 'phuc-hoi-hack' ? (
                /* High-fidelity custom success announcement post modal box */
                <div className="relative w-full min-h-[500px] h-[540px] rounded-[1.5rem] overflow-hidden bg-[#18191a] p-4 flex flex-col justify-between border-4 border-[#242526] shadow-2xl select-none font-sans text-white">
                  
                  {/* Status Bar simulation */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white/90 px-2 pt-1 pb-2">
                    <div className="flex items-center gap-1">
                      <span>12:16</span>
                      <svg className="h-3 w-3 fill-sky-400" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                    </div>
                    {/* Dynamic notch pill */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[100px] h-[20px] bg-black rounded-full border border-white/5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-auto mr-4"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                      <div className="w-[18px] h-[9px] border border-white/75 rounded-[3px] p-[1px] flex items-center">
                        <div className="bg-emerald-500 h-full w-[100%] rounded-[1.5px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Main modal body container */}
                  <div className="bg-[#242526] border border-slate-800 rounded-2xl flex flex-col p-4 w-full h-[400px] shadow-2xl relative overflow-hidden my-auto justify-between">
                    
                    {/* Modal Title Row */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                      <div className="w-6"></div>
                      <h4 className="font-sans text-[13.5px] font-extrabold text-slate-100 text-center tracking-wider uppercase">
                        Tạo bài viết
                      </h4>
                      <button className="p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Account User Profile header */}
                    <div className="flex items-center gap-2.5 pt-3">
                      <img 
                        className="w-8.5 h-8.5 rounded-full object-cover border border-slate-700 shadow" 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
                      alt="Lưu Phương Nguyễn"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="text-left space-y-0.5">
                        <p className="font-sans text-xs font-bold text-slate-100">Lưu Phương Nguyễn</p>
                        <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-full w-fit">
                          <Globe className="h-2.5 w-2.5 text-slate-400" />
                          <span className="text-[9px] font-bold text-slate-300">Bạn bè</span>
                          <span className="text-[7px] text-slate-300">▼</span>
                        </div>
                      </div>
                    </div>

                    {/* Highly stylized image/post container from screenshot */}
                    <div className="relative w-full h-[155px] rounded-xl overflow-hidden bg-[#bbf7d0] bg-gradient-to-br from-[#c9f227] to-[#4ade80] flex items-center justify-center p-4 mt-3 shadow border border-lime-400/20">
                      <h3 className="font-display text-[15.5px] sm:text-[17.5px] font-extrabold text-[#0a2305] text-center tracking-tight leading-snug drop-shadow-sm select-none">
                        Hoàng Mỹ Khôi Phục thành công tài khoản bị hack
                      </h3>
                      
                      {/* Brand identity badge overlay */}
                      <span className="absolute bottom-2.5 right-2.5 bg-black/50 text-white/90 text-[7.5px] font-mono tracking-widest uppercase font-extrabold py-0.5 px-2 rounded-full backdrop-blur-sm border border-white/5">
                        SUPPORT BY HOÀNG MỸ
                      </span>
                    </div>

                    {/* Bottom background presets row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-purple-500 border border-white/25"></div>
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-[#f857a6] to-[#ff5858] border border-white/25"></div>
                        <div className="w-5 h-5 rounded bg-gradient-to-br from-[#11998e] to-[#38ef7d] border-2 border-white"></div>
                        <div className="w-5 h-5 rounded bg-[#3a3b3c] flex items-center justify-center border border-white/5">
                          <span className="text-[10px] text-slate-400 leading-none">█</span>
                        </div>
                      </div>
                      <Smile className="h-4.5 w-4.5 text-slate-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                    </div>

                    {/* "Thêm vào bài viết của bạn" Panel */}
                    <div className="flex items-center justify-between border border-slate-700/55 rounded-xl px-3.5 py-1.5 bg-[#242526] hover:bg-slate-800/20 transition-all mt-3">
                      <span className="text-[11.5px] font-bold text-slate-300 text-left">
                        Thêm vào bài viết của bạn
                      </span>
                      <div className="flex items-center gap-2.5">
                        <LucideImage className="h-4.5 w-4.5 text-emerald-500 hover:scale-110 transition-transform cursor-pointer" />
                        <User className="h-4.5 w-4.5 text-sky-500 hover:scale-110 transition-transform cursor-pointer" />
                        <Smile className="h-4.5 w-4.5 text-yellow-500 hover:scale-110 transition-transform cursor-pointer" />
                        <MapPin className="h-4.5 w-4.5 text-red-500 hover:scale-110 transition-transform cursor-pointer" />
                        <MessageSquare className="h-4.5 w-4.5 text-green-500 hover:scale-110 transition-transform cursor-pointer" />
                        <MoreHorizontal className="h-4.5 w-4.5 text-slate-400 hover:scale-110 transition-transform cursor-pointer" />
                      </div>
                    </div>

                    {/* Continue Button */}
                    <button className="w-full bg-[#1877f2] hover:bg-sky-600 active:scale-98 text-white text-xs font-bold py-2.5 rounded-xl mt-3 transition-colors block cursor-pointer">
                      Tiếp tục
                    </button>
                  </div>

                  {/* Phone Bottom Pull bar */}
                  <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2"></div>

                  <div className="absolute top-4 left-4 bg-[#0059b5]/95 text-white px-3.5 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider shadow z-10">
                    Kết quả xử lý (Khôi phục toàn vẹn)
                  </div>
                </div>
              ) : service.slug === 'mo-khoa-ket-tim-956' ? (
                /* Custom high-fidelity after screen for Facebook 956: Unlocked purple padlock */
                <div className="relative w-full min-h-[500px] h-[540px] rounded-[1.5rem] overflow-hidden bg-[#18191a] p-4 flex flex-col justify-between border-4 border-[#242526] shadow-2xl select-none font-sans text-white">
                  {/* Status Bar simulation */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white/90 px-2 pt-1 pb-2">
                    <div className="flex items-center gap-1">
                      <span>12:20</span>
                      <svg className="h-3 w-3 fill-sky-400" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                    </div>
                    {/* Notch simulation */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[100px] h-[20px] bg-black rounded-full border border-white/5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ml-auto mr-4"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                      <div className="w-[18px] h-[9px] border border-white/75 rounded-[3px] p-[1px] flex items-center">
                        <div className="bg-emerald-500 h-full w-[100%] rounded-[1.5px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Top Bar Action */}
                  <div className="flex items-center justify-between px-1 py-1">
                    <button className="p-1 rounded-full text-slate-350">
                      <ArrowLeft className="h-5 w-5 opacity-0 pointer-events-none" />
                    </button>
                    <div className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest bg-emerald-950/30 border border-emerald-900/30 px-3 py-1 rounded-full uppercase">
                      THÀNH CÔNG VƯỢT 956
                    </div>
                  </div>

                  {/* Center content container replicating photo exactly */}
                  <div className="flex flex-col my-auto px-1.5 text-center">
                    {/* Padlock Unlocked illustration */}
                    <div className="w-[84px] h-[84px] rounded-full bg-white flex items-center justify-center relative shadow-lg mx-auto mb-2 select-none">
                      <div className="relative">
                        {/* Lock details */}
                        <svg className="w-12 h-12 text-[#7c4dff] fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C9.2 2 7 4.2 7 7V9.3C5.3 9.7 4 11.2 4 13C4 15.2 5.8 17 8 17H16C18.2 17 20 15.2 20 13C20 11.2 18.7 9.7 17 9.3V7H15V9H9V7C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 7H17C17 4.2 14.8 2 12 2Z" />
                        </svg>
                        {/* Key & Star overlays */}
                        <div className="absolute -top-3.5 -left-2.5 text-yellow-400 text-xs font-bold font-mono">✦</div>
                        <div className="absolute top-2.5 -right-3.5 text-purple-400 text-xs shrink-0">✨</div>
                        <div className="absolute -left-6 top-3 text-[14px]">🔑</div>
                      </div>
                      
                      {/* Girl face profile overlap */}
                      <img 
                        className="absolute -bottom-1 -right-1 w-7.5 h-7.5 rounded-full object-cover border-2 border-white shadow-md animate-pulse" 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                        alt="Lưu Phương Nguyễn"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    <h3 className="font-sans text-[15.5px] font-extrabold text-[#e4e6eb] tracking-tight leading-snug">
                      Bạn đã mở khóa tài khoản
                    </h3>
                    <p className="font-sans text-[11px] text-[#b0b3b8] leading-tight mt-1 px-4">
                      Bạn đã bảo mật thông tin đăng nhập của mình và có thể tiếp tục sử dụng Facebook.
                    </p>

                    {/* Gray activities container block replicating screenshot precisely */}
                    <div className="bg-[#242526] border border-slate-700/40 rounded-xl p-3.5 mt-3 text-left">
                      <h4 className="font-sans text-[11.5px] font-extrabold text-white">
                        Xem lại hoạt động gần đây
                      </h4>
                      <p className="font-sans text-[10px] text-[#b0b3b8] leading-tight mt-0.5 mb-2.5">
                        Bí quyết: Chúng tôi có thể hỗ trợ bạn xem lại hoạt động gần đây để đảm bảo tài khoản vẫn đúng như bạn mong muốn.
                      </p>
                      
                      {/* Option details list with search query logo */}
                      <div className="border-t border-slate-700/60 pt-2.5 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3a3b3c] flex items-center justify-center text-sky-400 shrink-0 font-bold border border-slate-700/30">
                          🔍
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[11.5px] text-[#e4e6eb] font-semibold">
                            <span className="text-[#1877f2]">•</span>
                            <span>Bài viết và bình luận gần đây</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11.5px] text-[#e4e6eb] font-semibold">
                            <span className="text-[#1877f2]">•</span>
                            <span>Bạn bè mới thêm</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11.5px] text-[#e4e6eb] font-semibold">
                            <span className="text-[#1877f2]">•</span>
                            <span>Lần đăng nhập gần đây</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Two Buttons matching layout precisely */}
                  <div className="space-y-1.5 mt-auto">
                    <button className="w-full bg-[#1877f2] hover:bg-sky-600 active:scale-[0.98] text-white text-[11.5px] font-bold py-2.5 rounded-xl transition-all block cursor-pointer">
                      Xem lại hoạt động gần đây
                    </button>
                    <button className="w-full bg-[#3a3b3c] hover:bg-slate-700 active:scale-[0.98] text-[#e4e6eb] text-[11.5px] font-bold py-2.5 rounded-xl transition-all block cursor-pointer">
                      Quay lại Facebook
                    </button>
                  </div>

                  <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-4"></div>

                  <div className="absolute top-4 left-4 bg-[#0059b5]/95 text-white px-3.5 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider shadow z-10">
                    Mở khóa két sắt tím 956 thành công
                  </div>
                </div>
              ) : (service.slug === 'xac-minh-danh-tinh-2fa' || service.slug === 'xac-minh-nhan-tin') ? (
                /* High-fidelity custom success announcement simulating an official recovery email with custom styling matching user's screen precisely */
                <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-slate-50 p-2 sm:p-2.5 flex flex-col justify-between border-4 border-[#eeeef0] shadow-xl select-none font-sans text-slate-800">
                  {/* Email Client Top Bar */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 px-1.5 text-[8px] sm:text-[9.5px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      </div>
                      <span className="hidden sm:inline text-slate-400">|</span>
                      <span className="font-semibold text-slate-600">Facebook <span className="text-slate-400 font-normal">&lt;update@facebookmail.com&gt;</span></span>
                    </div>
                    <div>
                      <span>08:59 SA (Hôm nay)</span>
                    </div>
                  </div>

                  {/* Email Content Container */}
                  <div className="my-auto bg-white border border-slate-200 rounded-xl p-2 sm:p-2.5 shadow-sm overflow-y-auto max-h-[85%] scrollbar-none flex flex-col justify-between">
                    {/* Header with FB Logo and user name */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      {/* Facebook Blue Round Svg Logo */}
                      <div className="flex items-center gap-1">
                        <svg className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#1877f2] fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#1877f2] tracking-tight">Security Update</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] sm:text-[9px] font-bold text-slate-700">Hà Xuân</span>
                        <img 
                          className="w-3.5 h-3.5 rounded-full border border-slate-200" 
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                          alt="Customer"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Main content body */}
                    <div className="mt-1 text-left space-y-1">
                      <h4 className="text-[9.5px] sm:text-[11px] font-extrabold text-[#1c1e21] leading-tight">
                        Nhắc bạn: mở khóa tài khoản trước Tháng 7 1 at 8:59 SA
                      </h4>
                      <p className="text-[7.5px] sm:text-[8px] text-[#5f6368] font-bold">
                        Xin chào Hà,
                      </p>
                      <p className="text-[7px] sm:text-[8px] text-[#42464d] leading-normal">
                        Vì bạn đã xác nhận được danh tính của mình rồi, hãy mở khóa tài khoản <strong className="text-slate-800 font-extrabold">trước Tháng 7 1, 2026 at 8:59 SA</strong>. Nếu hết ngày này mà bạn chưa mở khóa thì bạn phải bắt đầu lại quy trình khôi phục.
                      </p>

                      {/* Primary Blue Action Button */}
                      <button className="w-full bg-[#1877f2] hover:bg-[#1565c0] active:scale-[0.99] text-white text-[8px] sm:text-[9px] font-bold py-1 sm:py-1.5 rounded-md transition-colors block cursor-pointer text-center">
                        Mở khóa tài khoản
                      </button>

                      {/* Code fallback box exactly like screenshot */}
                      <div className="bg-slate-50 border border-slate-200/60 rounded-lg py-1 px-1.5 text-center mt-1 flex items-center justify-between gap-1">
                        <span className="text-[6.5px] sm:text-[7.5px] text-[#5f6368] text-left leading-tight max-w-[50%]">
                          Hoặc truy cập Facebook rồi nhập mã làm mật khẩu:
                        </span>
                        <div className="bg-white border border-[#90bbf7] text-[#1877f2] font-mono text-[8px] sm:text-[9.5px] font-extrabold tracking-wider py-0.5 px-2.5 rounded-md shadow-sm">
                          hfdOO4Xvon
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Success Indicator Tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white px-2.5 py-1 rounded-full font-sans text-[7.5px] font-bold uppercase tracking-wider shadow z-10 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    Đã Khôi Phục Mã Thành Công
                  </div>
                </div>
              ) : (service.slug === 'vi-pham-tieu-chuan' || service.slug === 'vo-hieu-hoa-180-ngay' || service.slug === 'khoa-bat-xac-minh' || service.slug === 'khoa-do-protect' || service.slug === 'vo-hieu-hoa-vinh-vien') ? (
                /* High-fidelity custom success announcement for community violation / 180-day disablement: scaled down to match before card aspect-video precisely */
                <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-[#0e0f10] p-3 flex flex-col justify-between border-4 border-[#242526] shadow-2xl select-none font-sans text-white">
                  
                  {/* Status Bar simulation */}
                  <div className="flex items-center justify-between text-[10px] font-semibold text-white/90 px-2 pt-0.5 pb-1">
                    <div className="flex items-center gap-1">
                      <span>14:02</span>
                      <svg className="h-2.5 w-2.5 fill-sky-400" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                    </div>
                    {/* Notch simulation */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[70px] h-[14px] bg-black rounded-full border border-white/5 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-slate-900 ml-auto mr-2"></div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
                      <div className="w-[14px] h-[7px] border border-white/75 rounded-[3px] p-[0.5px] flex items-center">
                        <div className="bg-emerald-500 h-full w-[100%] rounded-[1px]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Dark Mode Modal block matching FB screenshot exactly: compact container that fits within aspect-video */}
                  <div className="my-auto bg-[#242526] border border-slate-700/50 rounded-xl p-3 shadow-xl flex flex-col items-center relative text-center w-full max-w-[280px] sm:max-w-[340px] mx-auto">
                    
                    {/* Modal Close Icon */}
                    <button className="absolute top-2 right-2 p-0.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>

                    {/* Highly glowing circular badge with shield/check inside */}
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500 relative shadow-inner animate-pulse">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-[4px]"></div>
                      <ShieldCheck className="h-6 w-6 text-emerald-500 relative z-10 stroke-[2.5]" />
                    </div>

                    <h3 className="font-sans text-[12.5px] sm:text-[13.5px] font-extrabold text-slate-100 mt-2 leading-tight">
                      Bạn có thể dùng lại Facebook
                    </h3>
                    <p className="font-sans text-[9px] sm:text-[10px] text-slate-300 mt-1 leading-tight px-1">
                      Chúng tôi đã gỡ bỏ biện pháp đình chỉ cho tài khoản của bạn.
                    </p>

                    {/* What does this mean details box: concise and optimized */}
                    <div className="bg-[#1c1d1f] border border-slate-700/40 rounded-lg p-2 mt-2 text-left w-full space-y-1">
                      <p className="font-sans text-[8.5px] sm:text-[9px] text-slate-300 leading-snug">
                        Sau khi xem xét lại, tài khoản của bạn vẫn tuân thủ <strong className="text-emerald-400 font-extrabold">Tiêu chuẩn cộng đồng</strong>.
                      </p>
                      <p className="font-sans text-[8px] sm:text-[8.5px] text-slate-500 leading-snug">
                        Chúng tôi xin lỗi vì bạn không thể dùng Facebook trong thời gian đình chỉ.
                      </p>
                    </div>

                    {/* Primary Blue Facebook Button */}
                    <button className="w-full bg-[#1877f2] hover:bg-sky-600 active:scale-[0.98] text-white text-[10px] font-bold py-1.5 px-3 rounded-lg mt-2.5 transition-colors cursor-pointer shadow-md">
                      Quay lại Facebook
                    </button>

                  </div>

                  <div className="w-20 h-0.5 bg-white/30 rounded-full mx-auto mt-1"></div>

                  <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white px-2.5 py-1 rounded-full font-sans text-[8px] font-bold uppercase tracking-wider shadow z-10">
                    Kháng nghị thành công
                  </div>
                </div>
              ) : (
                /* Standard Fallback: Render regular Image Frame */
                <div className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-[#f3f3f5] flex items-center justify-center p-2">
                  <img 
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-500" 
                    src={IMAGES.phoneSuccess} 
                    alt="Mở khóa thành công thiết bị"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Floating validation badge icon exactly like shown in mockups */}
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 border border-[#eeeef0] shadow-lg flex items-center justify-center z-10">
                    <div className="w-10 h-10 rounded-full bg-[#34a853] flex items-center justify-center text-white">
                      <Check className="h-6 w-6 stroke-[3]" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 bg-[#0059b5] text-white px-3.5 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider">
                    Kết quả xử lý
                  </div>
                </div>
              )}
              <div className="p-6 text-left space-y-2 mt-auto">
                <h3 className="font-display text-base sm:text-lg font-extrabold text-[#1a1c1d]">
                  {beforeAfter.afterTitle}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                  {beforeAfter.afterDesc}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Detailed Description Grid (Bento Style) */}
        <section className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Importance description column (2 columns wide) */}
            <div className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-[#eeeef0] shadow-[0_10px_35px_rgba(95,94,96,0.015)] text-left flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="w-11 h-11 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 stroke-[2]" />
                </div>
                
                <h2 className="font-display text-2xl font-extrabold text-[#1a1c1d] tracking-tight">
                  Tầm quan trọng của việc khôi phục đúng cách
                </h2>
                
                <div className="font-sans text-sm sm:text-base text-[#414753] leading-relaxed space-y-4">
                  <p>
                    {service.detailedDesc}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5f5e60]">
                    Việc cố gắng tự sửa chữa, làm theo các mẹo không chuẩn hoặc úp ảnh giấy tờ tùy thân lệch góc sẽ tích tụ điểm vi phạm AI, khiến tài khoản bị kẹt treo nặng vĩnh viễn (Disabled) không thể cứu vãn.
                  </p>
                </div>
              </div>

              {/* Service features tags row */}
              <div className="pt-6 border-t border-[#eeeef0] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#0059b5] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-[#5f5e60] leading-tight font-semibold uppercase tracking-wider">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience checklist (1 column wide) */}
            <div className="bg-[#eeeef0]/40 rounded-[2.5rem] p-8 sm:p-12 border border-[#eeeef0] text-left flex flex-col justify-center space-y-6">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#1a1c1d] tracking-tight">
                Dành cho ai?
              </h3>
              
              <ul className="space-y-4">
                {audienceList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0059b5]/15 text-[#0059b5] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3.5]" />
                    </div>
                    <span className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed font-semibold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* Technical Recovery Process Accordion Section */}
        <section className="py-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] border border-[#eeeef0] p-8 sm:p-12 shadow-[0_10px_35px_rgba(95,94,96,0.015)] text-left space-y-6">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d] tracking-tight border-l-4 border-[#0059b5] pl-3">
              Quy Trình Khôi Phục Kỹ Thuật
            </h3>
            <p className="font-sans text-xs text-[#5f5e60] leading-relaxed">
              Toàn bộ quá trình chạy thủ thuật mở khóa được chúng tôi tinh gọn, cam kết không gây ảnh hưởng đến dữ liệu bảo mật hoặc gây hack hại lại bên ngoài:
            </p>
            
            <div className="grid grid-cols-1 gap-5 pt-2">
              {service.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-[#f9f9fb] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#0059b5] text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-extrabold text-xs text-[#0059b5] uppercase tracking-wider">Bước {idx + 1}</p>
                    <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof (Customer Testimonials) Section */}
        <section className="py-12 space-y-8">
          <div className="text-center space-y-1.5">
            <h2 className="font-display text-2.5xl sm:text-3xl font-extrabold text-[#1a1c1d] tracking-tight">
              Phản hồi khách hàng
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#5f5e60]">
              Sự tin tưởng từ những người đã trải nghiệm dịch vụ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((reviewer, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#eeeef0] shadow-[0_10px_40px_rgba(95,94,96,0.015)] hover:shadow-[0_15px_45px_rgba(95,94,96,0.055)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 text-left"
              >
                <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed italic">
                  "{reviewer.text}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-[#eeeef0]/60">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-extrabold text-xs ${
                    idx === 0 ? 'bg-[#0059b5]/10 text-[#0059b5]' : idx === 1 ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {reviewer.name[0]}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-display text-xs sm:text-sm font-bold text-[#1a1c1d]">
                      {reviewer.name}
                    </h4>
                    <p className="font-sans text-[10px] text-[#5f5e60] font-bold uppercase tracking-wider">
                      {reviewer.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dark Blue CTA Banner Block */}
        <section className="py-12">
          <div className="bg-[#0059b5] text-white rounded-[2.5rem] p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 text-left relative overflow-hidden shadow-lg shadow-[#0059b5]/15">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 space-y-4 max-w-xl">
              <h2 className="font-display text-2.5xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Đang gặp vấn đề với {getShortName(service.slug)}?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg">
                Đừng tự giải quyết nếu không chắc chắn để bảo toàn dữ liệu quý giá. Hãy tham vấn chuyên môn miễn phí ngay để hướng dẫn chẩn đoán bệnh tình.
              </p>
            </div>

            <div className="relative z-10 shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
              {/* Zalo Button */}
              <a 
                href={`${CONTACT_INFO.zalo}?text=${encodeURIComponent(`Chào anh Hoàng Mỹ, tôi đang xem trang chi tiết và cần tư vấn xử lý: ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-white hover:bg-[#f3f3f5] text-[#0059b5] font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                <span>Zalo: {CONTACT_INFO.phoneFormatted}</span>
              </a>
              <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#d7e2ff]">
                Hỗ trợ 24/7 • Phản hồi trong 5 phút
              </span>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

export default memo(ServiceDetail);
