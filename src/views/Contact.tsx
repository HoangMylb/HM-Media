import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Mail, 
  Phone, 
  ArrowRight, 
  Globe, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../data';

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    facebookUrl: '',
    errorType: 'Facebook bị hack thay đổi Email và SĐT',
    association: '',
    desc: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const errorOptions = [
    'Facebook bị hack thay đổi Email và SĐT',
    'Facebook bị khóa két sắt màu tím',
    'Facebook vi phạm tiêu chuẩn cộng đồng',
    'Facebook bị mã đăng nhập',
    'Facebook bị khóa bắt xác minh danh tính',
    'Facebook bị vô hiệu hóa 180 ngày',
    'Facebook bị khóa do Protect',
    'Facebook bị vô hiệu hóa vĩnh viễn',
    'Xác minh danh tính để nhắn tin'
  ];

  // Map parameters from navigation if user lands from other pages
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (action === 'rescue') {
      setFormData(prev => ({
        ...prev,
        errorType: 'Facebook bị hack thay đổi Email và SĐT',
        desc: 'Tôi cần hỗ trợ khẩn cấp phục hồi tài khoản bị khóa/hack gấp!'
      }));
    } else if (action === '2fa') {
      setFormData(prev => ({
        ...prev,
        errorType: 'Facebook bị mã đăng nhập',
        desc: 'Tôi bị mất mã Google Authenticator / không nhận được mã SMS xác minh đăng nhập.'
      }));
    } else if (action === 'lock956') {
      setFormData(prev => ({
        ...prev,
        errorType: 'Facebook bị khóa két sắt màu tím',
        desc: 'Tài khoản của tôi bị dính két sắt tím báo lỗi 956.'
      }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Generate simulated secure diagnostic ticket ID
    const randomId = 'SEC-' + Math.floor(Math.random() * 90000 + 10000);
    setTicketId(randomId);
    setIsSubmitted(true);
  };

  return (
    <div id="contact-page-root" className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        
        {/* Banner Headers Section */}
        <div className="text-left space-y-4 mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#eeeef0] text-[#0059b5] font-sans text-[11px] font-semibold tracking-wider uppercase">
            Hỗ trợ trực tuyến 24/7
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#1a1c1d]">
            Kết nối với <br />
            <span className="text-[#0059b5]">Chuyên gia</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#414753] leading-relaxed max-w-2xl mt-4">
            Cung cấp thông tin chi tiết về tình trạng tài khoản của bạn. Đội ngũ chuyên gia sẽ phân tích và đưa ra giải pháp bảo mật tối ưu nhất trong vòng 24 giờ.
          </p>
        </div>

        {/* Content Columns: Form + Right Sidebar Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Card (Form / Success Screen) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-[#eeeef0] shadow-[0_10px_40px_rgba(95,94,96,0.015)] text-left">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="contact-form-block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-display text-2xl font-black text-[#1a1c1d] pb-6 border-b border-[#eeeef0] mb-6">
                      Thông tin hỗ trợ
                    </h2>

                    <form id="expert-contact-form" onSubmit={handleSubmit} className="space-y-6">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Fullname input field */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-[#5f5e60] uppercase tracking-wider">
                            Họ và tên
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Nhập họ và tên của bạn"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-xl border border-[#eeeef0] bg-[#f9f9fb] focus:bg-white focus:outline-none focus:border-[#0059b5] transition-all font-sans text-sm text-[#1a1c1d] placeholder:text-[#c1c6d6]"
                          />
                        </div>

                        {/* Phone Number Input */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-[#5f5e60] uppercase tracking-wider">
                            Số điện thoại liên hệ
                          </label>
                          <input
                            type="text"
                            name="phone"
                            required
                            placeholder="09xx xxx xxx"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-xl border border-[#eeeef0] bg-[#f9f9fb] focus:bg-white focus:outline-none focus:border-[#0059b5] transition-all font-sans text-sm text-[#1a1c1d] placeholder:text-[#c1c6d6]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Error Type dropdown selection */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-[#5f5e60] uppercase tracking-wider">
                            Tình trạng Facebook hiện tại
                          </label>
                          <div className="relative">
                            <select
                              name="errorType"
                              value={formData.errorType}
                              onChange={handleChange}
                              className="w-full px-5 py-3.5 rounded-xl border border-[#eeeef0] bg-[#f9f9fb] focus:bg-white focus:outline-none focus:border-[#0059b5] transition-all font-sans text-sm text-[#1a1c1d] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%235f5e60%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1.25rem_center] bg-no-repeat pr-12"
                            >
                              {errorOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Facebook URL input */}
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-[#5f5e60] uppercase tracking-wider">
                            Link Facebook (Nếu còn hoạt động)
                          </label>
                          <input
                            type="text"
                            name="facebookUrl"
                            placeholder="https://facebook.com/..."
                            value={formData.facebookUrl}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-xl border border-[#eeeef0] bg-[#f9f9fb] focus:bg-white focus:outline-none focus:border-[#0059b5] transition-all font-sans text-sm text-[#1a1c1d] placeholder:text-[#c1c6d6]"
                          />
                        </div>
                      </div>

                      {/* Associated Email / Phone Input field */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-[#5f5e60] uppercase tracking-wider">
                          Email hoặc SĐT liên kết với tài khoản bị ảnh hưởng
                        </label>
                        <input
                          type="text"
                          name="association"
                          placeholder="Email hoặc số điện thoại cũ..."
                          value={formData.association}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-xl border border-[#eeeef0] bg-[#f9f9fb] focus:bg-white focus:outline-none focus:border-[#0059b5] transition-all font-sans text-sm text-[#1a1c1d] placeholder:text-[#c1c6d6]"
                        />
                      </div>

                      {/* Detail text description textarea body */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-[#5f5e60] uppercase tracking-wider">
                          Vấn đề bạn đang gặp phải
                        </label>
                        <textarea
                          name="desc"
                          rows={4}
                          placeholder="Mô tả chi tiết tình huống, các thông báo lỗi bạn nhận được, và thời gian xảy ra sự cố..."
                          value={formData.desc}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-xl border border-[#eeeef0] bg-[#f9f9fb] focus:bg-white focus:outline-none focus:border-[#0059b5] transition-all font-sans text-sm text-[#1a1c1d] placeholder:text-[#c1c6d6] resize-none"
                        />
                      </div>

                      {/* Submit Actions Button row */}
                      <div className="pt-4 text-left">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center bg-[#0059b5] hover:bg-[#00458f] text-white px-8 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 gap-2 shadow-md shadow-[#0059b5]/10 cursor-pointer active:scale-98"
                        >
                          <span>Gửi Yêu Cầu Tư Vấn</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-form-block"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-center py-6 space-y-6"
                  >
                    {/* Success Verification Check Badge */}
                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm shadow-emerald-500/10">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <span className="inline-block px-3 py-1 rounded bg-emerald-50 border border-emerald-120 text-emerald-700 font-sans text-[10px] font-bold uppercase tracking-widest">
                        Gửi thông tin thành công
                      </span>
                      <h3 className="font-display font-extrabold text-[#1a1c1d] text-2xl mt-3 leading-snug">
                        Phiếu đã được tiếp nhận!
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed pt-1">
                        Chào {formData.name}, hệ thống bảo mật đã tạo thành công phiếu khảo sát sự cố của bạn. Mã định danh hỗ trợ của bạn là:
                      </p>
                    </div>

                    {/* Styled Monospace Ticket ID Wrapper Box */}
                    <div className="py-4 px-6 bg-[#1a1c1d] text-[#abc7ff] font-mono font-extrabold text-sm sm:text-base rounded-2xl max-w-xs mx-auto border border-[#eeeef0]/10 tracking-widest uppercase shadow-md">
                      {ticketId}
                    </div>

                    {/* Step guidance Box details */}
                    <div className="p-5 rounded-2xl bg-[#0059b5]/5 border border-[#0059b5]/10 max-w-md mx-auto space-y-3 text-left">
                      <div className="flex items-center space-x-2 text-[#0059b5] font-bold text-xs sm:text-sm uppercase tracking-wide">
                        <AlertCircle className="h-4.5 w-4.5" />
                        <span>Bước tiếp theo cực kỳ quan trọng:</span>
                      </div>
                      <p className="font-sans text-xs text-[#414753] leading-relaxed">
                        Hãy sao chép mã phiếu và bấm gửi trực tiếp cho Hoàng Mỹ qua Zalo dưới đây. Chúng tôi sẽ có kỹ thuật viên liên hệ lại và rà soát lỗi trực tiếp trên máy của bạn chỉ sau 5 phút!
                      </p>
                    </div>

                    {/* Submission CTA Actions buttons */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3.5 rounded-full border border-[#eeeef0] hover:bg-[#eeeef0] text-[#5f5e60] font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Gửi yêu cầu mới
                      </button>
                      <a
                        href={`${CONTACT_INFO.zalo}?text=${encodeURIComponent(`Chào anh Hoàng Mỹ, tôi vừa đăng ký phiếu tư vấn trên web. Mã phiếu của tôi là: ${ticketId}. Tình trạng lỗi: ${formData.errorType}. Nhờ anh phân tích hỗ trợ giúp!`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 bg-[#0059b5] hover:bg-[#00458f] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-[#0059b5]/10 cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Gửi qua Zalo</span>
                      </a>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right Column Stack (Specialist profile + Direct Channels info) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Specialist Profile Badge Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-[#eeeef0] shadow-[0_10px_40px_rgba(95,94,96,0.015)] text-center flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#f9f9fb] shadow-md bg-[#f3f3f5] relative shrink-0">
                <img 
                  src={IMAGES.avatarMain} 
                  alt="Hoàng Mỹ - Specialist" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d]">
                  Hoàng Mỹ
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0059b5]/10 text-[#0059b5] font-sans text-[10px] font-extrabold uppercase tracking-widest">
                  <ShieldCheck className="h-3.5 w-3.5 fill-[#0059b5]/15" />
                  <span>Chuyên gia Facebook</span>
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed max-w-sm">
                Với hơn 5 năm kinh nghiệm xử lý các sự cố trên nền tảng Meta. Cam kết bảo mật tuyệt đối thông tin khách hàng.
              </p>
            </div>

            {/* Direct Channel lists details */}
            <div className="bg-white rounded-[2rem] p-8 border border-[#eeeef0] shadow-[0_10px_40px_rgba(95,94,96,0.015)] text-left space-y-6">
              <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-[#5f5e60] block mb-2 border-b border-[#eeeef0] pb-3">
                Thông tin trực tiếp
              </span>

              <div className="space-y-6">
                {/* Zalo Hotline Row */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#f3f3f5] group-hover:bg-[#0059b5]/10 text-[#1a1c1d] group-hover:text-[#0059b5] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans text-[10px] text-[#5f5e60] font-bold uppercase tracking-widest">
                      Zalo Hotline
                    </p>
                    <a 
                      href={CONTACT_INFO.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-base sm:text-lg font-extrabold text-[#1a1c1d] hover:text-[#0059b5] transition-colors inline-block cursor-pointer"
                    >
                      {CONTACT_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* Facebook Profile channel Row */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#f3f3f5] group-hover:bg-[#0059b5]/10 text-[#1a1c1d] group-hover:text-[#0059b5] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans text-[10px] text-[#5f5e60] font-bold uppercase tracking-widest">
                      Facebook cá nhân
                    </p>
                    <a 
                      href={CONTACT_INFO.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs sm:text-sm font-semibold text-[#0059b5] hover:opacity-80 transition-opacity inline-block cursor-pointer break-all"
                    >
                      www.facebook.com/MyMapDay/
                    </a>
                  </div>
                </div>

                {/* Email Support Row */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#f3f3f5] group-hover:bg-[#0059b5]/10 text-[#1a1c1d] group-hover:text-[#0059b5] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-sans text-[10px] text-[#5f5e60] font-bold uppercase tracking-widest">
                      Email hỗ trợ
                    </p>
                    <a 
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="font-sans text-xs sm:text-sm font-semibold text-[#1a1c1d] hover:text-[#0059b5] transition-colors inline-block break-all"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
