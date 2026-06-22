import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  MessageSquare, 
  Info, 
  Gavel, 
  Lock, 
  CreditCard, 
  Star,
} from 'lucide-react';
import { CONTACT_INFO, IMAGES, getSlug } from '../data';

interface ServiceDetailCard {
  id: string;
  title: string;
  image: string;
  dauHieu: string;
  nguyenNhan: string;
  thoiGian: string;
  yeuCau: string;
}

const Services = React.memo(function Services() {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const servicesList: ServiceDetailCard[] = [
    {
      id: 'hacked',
      title: 'Tài khoản bị Hack',
      image: IMAGES.serviceHacked,
      dauHieu: 'Bị đổi Email, Số điện thoại hoặc mật khẩu, không thể đăng nhập.',
      nguyenNhan: 'Lộ thông tin, click link lạ, dính mã độc.',
      thoiGian: '12 - 48 giờ.',
      yeuCau: 'Thiết bị hay đăng nhập, giấy tờ tùy thân khớp thông tin.'
    },
    {
      id: '956',
      title: 'Khóa Két Tím (956)',
      image: IMAGES.servicePadlock956,
      dauHieu: 'Màn hình hiện két sắt tím, thông báo tài khoản bị khóa để bảo vệ.',
      nguyenNhan: 'Đăng nhập IP lạ, thiết bị mới, nghi ngờ hoạt động bất thường.',
      thoiGian: '1 - 24 giờ.',
      yeuCau: 'Email hoặc SĐT đăng ký, thiết bị cũ (nếu có).'
    },
    {
      id: 'vi-pham',
      title: 'Vi Phạm Tiêu Chuẩn (Đã Kháng)',
      image: IMAGES.serviceViolation,
      dauHieu: 'Tài khoản bị vô hiệu hóa, thông báo đã gửi yêu cầu xem xét.',
      nguyenNhan: 'Vi phạm chính sách (spam, bản quyền, nội dung nhạy cảm).',
      thoiGian: '3 - 7 ngày.',
      yeuCau: 'Cần kiểm tra tình trạng cụ thể qua link tài khoản.'
    },
    {
      id: '2fa',
      title: 'Mã Đăng Nhập (2FA)',
      image: IMAGES.service2FA,
      dauHieu: 'Yêu cầu mã 6 số từ ứng dụng/SMS nhưng không nhận được.',
      nguyenNhan: 'Mất điện thoại, đổi số, lỗi tổng đài tin nhắn.',
      thoiGian: '2 - 24 giờ.',
      yeuCau: 'Giấy tờ tùy thân khớp tên/ngày sinh trên Facebook.'
    },
    {
      id: 'xmdt',
      title: 'Xác Minh Danh Tính',
      image: IMAGES.serviceIdentity,
      dauHieu: 'Facebook yêu cầu tải lên giấy tờ để xác nhận người dùng.',
      nguyenNhan: 'Hoạt động bất thường, tên giả, bị báo cáo.',
      thoiGian: '24 - 72 giờ.',
      yeuCau: 'Cung cấp CMND/CCCD hoặc bằng lái xe rõ nét.'
    },
    {
      id: '180-days',
      title: 'Vô Hiệu Hóa 180 Ngày',
      image: IMAGES.serviceSuspend180,
      dauHieu: 'Thông báo đình chỉ, còn 180 ngày để kháng nghị.',
      nguyenNhan: 'Vi phạm bản quyền, chia sẻ link cấm, liên kết IG vi phạm.',
      thoiGian: '1 - 5 ngày.',
      yeuCau: 'Chưa từng nhờ qua dịch vụ khác "ngâm" quá lâu.'
    },
    {
      id: 'protect',
      title: 'Khóa Protect',
      image: IMAGES.serviceProtect,
      dauHieu: 'Bị khóa do chưa bật tính năng bảo vệ nâng cao (Facebook Protect).',
      nguyenNhan: 'Quá hạn yêu cầu bật Protect của Facebook.',
      thoiGian: '1 - 12 giờ.',
      yeuCau: 'Thông tin đăng nhập cơ bản để thiết lập bảo mật.'
    },
    {
      id: 'disabled-perm',
      title: 'Vô Hiệu Hóa Vĩnh Viễn',
      image: IMAGES.servicePermDisabled,
      dauHieu: 'Thông báo không thể yêu cầu xem xét lại, cho phép tải thông tin.',
      nguyenNhan: 'Vi phạm đặc biệt nghiêm trọng hoặc kháng nghị thất bại.',
      thoiGian: 'Kiểm tra cụ thể (Tỷ lệ thấp).',
      yeuCau: 'Cần thẩm định kỹ trước khi nhận.'
    },
    {
      id: 'messages',
      title: 'Xác Minh Nhắn Tin',
      image: IMAGES.serviceMessageBlock,
      dauHieu: 'Bị chặn gửi tin nhắn, yêu cầu xác minh danh tính để tiếp tục.',
      nguyenNhan: 'Spam tin nhắn, gửi link bị đánh dấu, hoạt động bất thường.',
      thoiGian: '12 - 48 giờ.',
      yeuCau: 'Chụp ảnh màn hình lỗi, cung cấp SĐT nhận mã.'
    }
  ];

  return (
    <div id="services-page-root" className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] pt-28 pb-16">
      <Helmet>
        <title>Dịch vụ Khôi phục & Xử lý Tài khoản | Hoàng Mỹ</title>
        <meta name="description" content="Dịch vụ khôi phục tài khoản Facebook chuyên nghiệp - Xử lý hack, két tím 956, vi phạm tiêu chuẩn, 2FA, xác minh danh tính và nhiều vấn đề khác." />
      </Helmet>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">

        {/* Header Title Block */}
        <div className="mb-12 text-left relative">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1a1c1d] tracking-tight">
                Dịch vụ Khôi phục & Xử lý
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#414753] max-w-2xl leading-relaxed">
                Xử lý các sự cố tài khoản phổ biến với quy trình an toàn, minh bạch, ưu tiên bảo vệ dữ liệu cá nhân.
              </p>
            </div>
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#eeeef0] text-[#5f5e60] shrink-0">
              <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
            </div>
          </div>
        </div>

        {/* 9 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {servicesList.map((svc) => (
            <div 
              key={svc.id}
              className="bg-[#ffffff] rounded-[2rem] p-6 shadow-[0_10px_40px_-10px_rgba(95,94,96,0.04)] border border-[#eeeef0] flex flex-col h-full hover:shadow-[0_15px_45px_-10px_rgba(95,94,96,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <Link 
                to={`/services/${getSlug(svc.id)}`}
                className="flex flex-col flex-grow text-left group mb-6"
              >
                <div className="w-full h-48 bg-[#f3f3f5] rounded-[24px] mb-6 overflow-hidden flex items-center justify-center p-4 transition-colors group-hover:bg-[#eeeef0]">
                  <img 
                    src={svc.image} 
                    alt={svc.title} 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-500" 
                  />
                </div>

                <div className="mb-4">
                  <h3 className="font-display text-lg font-bold text-[#1a1c1d] tracking-tight group-hover:text-[#0059b5] transition-colors">
                    {svc.title}
                  </h3>
                </div>

                <div className="space-y-3 flex-grow">
                  <div>
                    <span className="font-sans font-extrabold text-[13px] text-[#1a1c1d] block">Dấu hiệu:</span>
                    <span className="font-sans text-[13px] text-[#414753] leading-relaxed">{svc.dauHieu}</span>
                  </div>
                  <div>
                    <span className="font-sans font-extrabold text-[13px] text-[#1a1c1d] block">Nguyên nhân:</span>
                    <span className="font-sans text-[13px] text-[#414753] leading-relaxed">{svc.nguyenNhan}</span>
                  </div>
                  <div>
                    <span className="font-sans font-extrabold text-[13px] text-[#1a1c1d] block">Thời gian trợ giúp:</span>
                    <span className="font-sans text-[13px] text-[#414753] leading-relaxed">{svc.thoiGian}</span>
                  </div>
                  <div>
                    <span className="font-sans font-extrabold text-[13px] text-[#1a1c1d] block">Yêu cầu:</span>
                    <span className="font-sans text-[13px] text-[#414753] leading-relaxed">{svc.yeuCau}</span>
                  </div>
                </div>
              </Link>

              <div className="flex gap-3 mt-auto">
                <Link
                  to={`/services/${getSlug(svc.id)}`}
                  className="flex-1 py-3 px-4 rounded-full border border-[#eeeef0] text-[#5f5e60] hover:text-[#0059b5] text-center font-display text-[11px] font-bold uppercase tracking-wider hover:bg-[#f9f9fb] transition-all duration-300 active:scale-98 cursor-pointer"
                >
                  Chi tiết
                </Link>
                <a 
                  href={`${CONTACT_INFO.zalo}?text=${encodeURIComponent(`Chào anh Hoàng Mỹ, tôi đang cần tư vấn xử lý trường hợp: ${svc.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-[#0059b5] text-white text-center font-display text-[11px] font-bold uppercase tracking-wider hover:bg-[#00458f] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                >
                  <span>CHAT ZALO</span>
                  <MessageSquare className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Process & Important Notes Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
            
            {/* Quy trình làm việc */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold text-[#1a1c1d] tracking-tight">
                Quy trình làm việc
              </h2>

              <div className="space-y-6 relative">
                {/* Timeline vertical connector */}
                <div className="absolute left-6 top-1.5 bottom-1.5 w-[2px] bg-[#eeeef0] rounded-full"></div>

                {/* Step 1 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-12 h-12 rounded-full bg-[#0059b5] text-white border-4 border-white shadow-sm flex items-center justify-center font-mono font-extrabold text-sm z-10 shrink-0">
                    1
                  </div>
                  <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#eeeef0] shadow-[0_10px_30px_rgba(95,94,96,0.02)] flex-grow">
                    <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-[#1a1c1d] mb-1">
                      Gửi tình trạng
                    </h4>
                    <p className="font-sans text-[13px] text-[#414753] leading-relaxed">
                      Bạn cung cấp link tài khoản/ảnh chụp màn hình lỗi.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-12 h-12 rounded-full bg-[#ffffff] text-[#5f5e60] border-4 border-[#eeeef0] flex items-center justify-center font-mono font-extrabold text-sm z-10 shrink-0">
                    2
                  </div>
                  <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#eeeef0] shadow-[0_10px_30px_rgba(95,94,96,0.02)] flex-grow">
                    <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-[#1a1c1d] mb-1">
                      Kiểm tra & Phân loại
                    </h4>
                    <p className="font-sans text-[13px] text-[#414753] leading-relaxed">
                      Tôi check lỗi và đánh giá khả năng khôi phục.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 relative">
                  <div className="w-12 h-12 rounded-full bg-[#ffffff] text-[#5f5e60] border-4 border-[#eeeef0] flex items-center justify-center font-mono font-extrabold text-sm z-10 shrink-0">
                    3
                  </div>
                  <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#eeeef0] shadow-[0_10px_30px_rgba(95,94,96,0.02)] flex-grow">
                    <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-[#1a1c1d] mb-1">
                      Báo giá & Chốt
                    </h4>
                    <p className="font-sans text-[13px] text-[#414753] leading-relaxed">
                      Báo giá minh bạch, rõ ràng phương án xử lý.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Lưu ý trước khi sử dụng dịch vụ */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold text-[#1a1c1d] tracking-tight">
                Lưu ý trước khi sử dụng dịch vụ
              </h2>

              <div className="bg-[#f3f3f5] rounded-[2rem] p-8 border border-[#c1c6d6]/30 space-y-6">
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center shrink-0">
                    <Info className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-bold text-sm text-[#1a1c1d]">Không cam kết 100%</p>
                    <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                      Các lỗi về chính sách của Facebook có thể thay đổi. Tôi chỉ nhận những ca có tỷ lệ thành công cao sau khi đã kiểm tra kỹ.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center shrink-0">
                    <Gavel className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-bold text-sm text-[#1a1c1d]">Không nhận việc vi phạm pháp luật</p>
                    <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                      Từ chối các yêu cầu hack tài khoản người khác, đọc trộm tin nhắn, hoặc các hành vi lừa đảo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center shrink-0">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-bold text-sm text-[#1a1c1d]">Bảo mật thông tin</p>
                    <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                      Mọi thông tin cá nhân, giấy tờ bạn cung cấp để mở khóa sẽ được xóa hoàn toàn sau khi xong việc.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-sans font-bold text-sm text-[#1a1c1d]">Thanh toán minh bạch</p>
                    <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                      Sẽ có thỏa thuận rõ ràng về chi phí và hình thức thanh toán (cọc hoặc thanh toán sau) tùy từng trường hợp.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="bg-white rounded-[2.5rem] py-16 px-6 sm:px-10 border border-[#eeeef0] shadow-[0_10px_40px_-10px_rgba(95,94,96,0.02)] mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1c1d] tracking-tight">
              Khách hàng nói gì sau khi sử dụng dịch vụ?
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#414753]">
              Những đánh giá thực tế từ người đã trải nghiệm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            
            {/* Review 1 */}
            <div className="bg-[#f3f3f5]/50 p-6 rounded-2xl border border-[#eeeef0] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center space-x-0.5 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current" />
                  ))}
                </div>
                <p className="font-sans text-[13px] sm:text-sm text-[#414753] italic leading-relaxed">
                  "Tài khoản bán hàng bị khóa 180 ngày tưởng mất trắng, may nhờ em Mỹ hỗ trợ mở lại thành công. Rất nhiệt tình và chuyên nghiệp."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#eeeef0]">
                <div className="w-10 h-10 bg-[#0059b5]/10 text-[#0059b5] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  M
                </div>
                <div>
                  <p className="font-sans font-bold text-xs sm:text-sm text-[#1a1c1d]">Anh Minh</p>
                  <p className="text-[11px] text-[#5f5e60] mt-0.5">Chủ shop Online</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#f3f3f5]/50 p-6 rounded-2xl border border-[#eeeef0] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center space-x-0.5 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current" />
                  ))}
                </div>
                <p className="font-sans text-[13px] sm:text-sm text-[#414753] italic leading-relaxed">
                  "Đã nhờ setup bảo mật cho Page công ty, tư vấn rất kỹ những rủi ro và cách phòng tránh. Yên tâm hẳn."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#eeeef0]">
                <div className="w-10 h-10 bg-[#0059b5]/10 text-[#0059b5] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  H
                </div>
                <div>
                  <p className="font-sans font-bold text-xs sm:text-sm text-[#1a1c1d]">Chị Hạnh</p>
                  <p className="text-[11px] text-[#5f5e60] mt-0.5">Quản lý Fanpage</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#f3f3f5]/50 p-6 rounded-2xl border border-[#eeeef0] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center space-x-0.5 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current" />
                  ))}
                </div>
                <p className="font-sans text-[13px] sm:text-sm text-[#414753] italic leading-relaxed">
                  "Giá cả rõ ràng ngay từ đầu, không phát sinh linh tinh. Lấy lại được nick chính chủ mừng rớt nước mắt."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#eeeef0]">
                <div className="w-10 h-10 bg-[#0059b5]/10 text-[#0059b5] rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  T
                </div>
                <div>
                  <p className="font-sans font-bold text-xs sm:text-sm text-[#1a1c1d]">Bạn Tuấn</p>
                  <p className="text-[11px] text-[#5f5e60] mt-0.5">Sinh viên</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer Support CTA Block */}
        <section className="text-center max-w-2xl mx-auto space-y-6 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0059b5]/10 text-[#0059b5] rounded-full mx-auto">
            <ShieldCheck className="h-8 w-8 stroke-[1.5]" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a1c1d] tracking-tight">
            Cần hỗ trợ ngay?
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#414753] leading-relaxed max-w-xl mx-auto">
            Hãy gửi tình trạng tài khoản của bạn qua Zalo hoặc Facebook để tôi kiểm tra và tư vấn phương án giải quyết tốt nhất.
          </p>
          
          <div className="pt-2 flex flex-row flex-nowrap justify-center gap-3 max-w-fit mx-auto">
            <a 
              href={CONTACT_INFO.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#0059b5] text-white font-display text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#00458f] transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer text-center whitespace-nowrap"
            >
              <span>Nhắn tin Zalo ngay</span>
              <MessageSquare className="h-4.5 w-4.5" />
            </a>
            <a 
              href={CONTACT_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#eeeef0] text-[#1a1c1d] font-display text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#e2e2e4] transition-all cursor-pointer text-center whitespace-nowrap"
            >
              <span>Liên hệ Facebook</span>
              <MessageSquare className="h-4.5 w-4.5" />
            </a>
          </div>
        </section>

      </div>
    </div>
  );
});

export default Services;
