import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  ShieldAlert, 
  Key, 
  Users, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  RefreshCw,
  Search,
  Check,
  Lock,
  ChevronDown,
  ShieldCheck,
  Zap,
  CheckSquare
} from 'lucide-react';
import { SERVICES, REVIEWS, CONTACT_INFO, IMAGES, FAQS } from '../data';

export default function Home() {
  const navigate = useNavigate();
  
  // Interactive Diagnostic Tool States
  const [selectedErrorCode, setSelectedErrorCode] = useState('956');
  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  // FAQ State
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const errorsChecklist = [
    { code: '956', label: 'Khóa Két Sắt Tím (Lỗi 956)', image: IMAGES.servicePadlock956, desc: 'Hiển thị két sắt màu tím, không cho gửi mã xác minh.' },
    { code: '282', label: 'Vô hiệu hóa 180 ngày (Khóa 282)', image: IMAGES.serviceSuspend180, desc: 'Yêu cầu đăng tải giấy tờ tùy thân hoặc tự sướng, đếm ngược 180 ngày.' },
    { code: 'hacked', label: 'Bị đổi sạch Email & SĐT (Hack)', image: IMAGES.serviceHacked, desc: 'Tài khoản biến mất khỏi tìm kiếm, hacker đổi sạch mọi thông tin.' },
    { code: '2fa', label: 'Kẹt Mã Đăng Nhập (2FA / Google Auth)', image: IMAGES.service2FA, desc: 'Mất ứng dụng tạo mã, không nhận được tin nhắn SMS xác thực.' },
    { code: 'block', label: 'Chặn Nhắn Tin / Tính Năng', image: IMAGES.serviceMessageBlock, desc: 'Bị cấm gửi tin nhắn trên Messenger, khóa tính năng trang cá nhân.' }
  ];

  const painPoints_spec = [
    {
      title: 'Lỗi 180 ngày',
      desc: 'Bị treo tài khoản và yêu cầu chờ đợi khắc phục trong 180 ngày.',
      img: IMAGES.serviceSuspend180
    },
    {
      title: 'Bị hack / Đổi Email',
      desc: 'Tài khoản bị kẻ xấu chiếm đoạt, thay đổi thông tin email và số điện thoại.',
      img: IMAGES.serviceHacked
    },
    {
      title: 'Khóa két sát (956)',
      desc: 'Tài khoản bị khóa bảo vệ an toàn (dạng két sắt tím) không rõ lý do.',
      img: IMAGES.servicePadlock956
    },
    {
      title: 'Lỗi Facebook Protect',
      desc: 'Bị khóa do chưa bật hoặc lỗi hệ thống khi xác minh Facebook Protect.',
      img: IMAGES.serviceProtect
    },
    {
      title: 'Lỗi nhắn tin',
      desc: 'Mất nút nhắn tin, không thể phản hồi hoặc bị hạn chế tính năng Messenger.',
      img: IMAGES.serviceMessageBlock
    },
    {
      title: 'Vô hiệu hóa vĩnh viễn',
      desc: 'Tài khoản bị vô hiệu hóa, không có nút kháng nghị hoặc vi phạm tiêu chuẩn cộng đồng.',
      img: IMAGES.servicePermDisabled
    }
  ];

  const handleDiagnose = () => {
    setDiagnosing(true);
    setDiagnosticResult(null);
    setTimeout(() => {
      const selected = errorsChecklist.find(e => e.code === selectedErrorCode);
      let advice = '';
      let difficulty = '';
      let rate = '';
      let targetPath = '/services';

      if (selectedErrorCode === '956') {
        advice = 'Tình trạng này có thể xử lý bằng cách ngâm IP sạch, chuyển đổi cổng nhận mã sang email/số điện thoại chính chủ của bạn.';
        difficulty = 'Thấp - Trung bình';
        rate = '99%';
        targetPath = '/services/mo-khoa-ket-tim-956';
      } else if (selectedErrorCode === '282') {
        advice = 'Cần phôi giấy tờ tùy thân khớp thông tin gốc của Facebook. Tránh gửi ảnh mờ, chụp bóng loáng đèn hoặc gửi quá 3 lần kẻo bị khóa vĩnh viễn.';
        difficulty = 'Cao';
        rate = '85% - 90%';
        targetPath = '/services/vo-hieu-hoa-180-ngay';
      } else if (selectedErrorCode === 'hacked') {
        advice = 'Cần email đăng ký ban đầu hoặc số điện thoại cũ kết hợp với tệp thiết bị tin cậy của bạn. Tuyệt đối không giao dịch với hacker chuộc nick.';
        difficulty = 'Trung bình';
        rate = '95%';
        targetPath = '/services/phuc-hoi-hack';
      } else if (selectedErrorCode === '2fa') {
        advice = 'Sẽ gỡ bypass 2Fa trực tiếp thông qua cổng hỗ trợ bảo mật tự động của Meta, cấp mã dự phòng mới an toàn.';
        difficulty = 'Thấp';
        rate = '100% chính chủ';
        targetPath = '/services/xac-minh-danh-tinh-2fa';
      } else {
        advice = 'Liên quan đến Spam thuật toán Messenger. Nên xóa sạch rác cookie trình duyệt, kháng nghị trực tiếp lên trung tâm trợ giúp của Meta.';
        difficulty = 'Thấp';
        rate = '90%';
        targetPath = '/services/xac-minh-nhan-tin';
      }

      setDiagnosticResult({
        name: selected?.label,
        difficulty,
        rate,
        advice,
        image: selected?.image,
        targetPath
      });
      setDiagnosing(false);
    }, 1000);
  };

  const toggleFaq = (id: string) => {
    if (activeFaqId === id) {
      setActiveFaqId(null);
    } else {
      setActiveFaqId(id);
    }
  };

  const currentDiagnoseError = errorsChecklist.find(e => e.code === selectedErrorCode);

  return (
    <div id="home-root" className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d]">
      
      {/* 1. Hero Section */}
      <section id="home-hero" className="max-w-[1200px] mx-auto px-5 md:px-6 pt-24 md:pt-36 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Hero Left Content */}
          <div className="flex-1 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#eeeef0] rounded-full border border-[#c1c6d6]/30 text-[#414753]">
              <ShieldCheck className="h-4 w-4 text-[#0059b5]" />
              <span className="font-display text-xs font-semibold tracking-wider uppercase">
                Tư vấn trước — báo rõ khả năng — không hứa quá đà
              </span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-[-0.02em] text-[#1a1c1d] text-balance">
              Dịch vụ hỗ trợ Facebook cá nhân, <span className="text-[#0059b5]">rõ ràng và uy tín</span>
            </h1>
            
            <p className="font-sans text-base sm:text-lg lg:text-xl text-[#414753] leading-relaxed max-w-2xl text-pretty">
              Tôi hỗ trợ kiểm tra, tư vấn và xử lý các vấn đề thường gặp như tài khoản bị treo 180 ngày, hạn chế tính năng quảng cáo, bảo mật rò rỉ, mất nút nhắn tin và tăng độ tin cậy tương tác cho tài khoản cá nhân & doanh nghiệp.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <a 
                id="hero-zalo-cta"
                href={CONTACT_INFO.zalo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#0059b5] text-white rounded-full hover:bg-[#00458f] transition-all duration-300 font-display text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 text-center"
              >
                <span>Liên hệ Zalo ngay</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                id="hero-services-cta"
                href="#services" 
                className="flex items-center justify-center px-8 py-4 bg-[#ffffff] text-[#1a1c1d] border border-[#c1c6d6] rounded-full hover:bg-[#f3f3f5] transition-all duration-300 font-display text-xs font-bold uppercase tracking-wider text-center"
              >
                Xem dịch vụ
              </a>
            </div>
          </div>
          
          {/* Hero Right Media */}
          <div className="flex-1 w-full relative max-w-[500px] lg:max-w-[480px] mx-auto">
            <div className="relative rounded-[32px] overflow-hidden border border-[#c1c6d6]/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-[#ffffff] p-2">
              <img 
                src={IMAGES.avatarHands} 
                alt="Hoàng Mỹ facebook specialist" 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-[24px] aspect-[4/5] lg:aspect-square"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-[24px] m-2"></div>
            </div>
            
            {/* Floating Glassmorphic Badge Left */}
            <div className="absolute -left-4 lg:-left-10 top-1/4 bg-white/80 backdrop-blur-md border border-white/60 shadow-lg rounded-2xl p-4 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 flex items-center justify-center text-[#0059b5]">
                <Shield className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-display text-[10px] text-[#414753] font-bold uppercase tracking-wide">Hỗ trợ tài khoản</p>
                <p className="font-sans text-sm font-extrabold text-[#0059b5]">180 Ngày</p>
              </div>
            </div>
            
            {/* Floating Glassmorphic Badge Right */}
            <div className="absolute -right-4 lg:-right-8 bottom-1/4 bg-white/80 backdrop-blur-md border border-white/60 shadow-lg rounded-2xl p-4 flex items-center gap-3 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 flex items-center justify-center text-[#0059b5]">
                <Key className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-display text-[10px] text-[#414753] font-bold uppercase tracking-wide">Bảo mật</p>
                <p className="font-sans text-sm font-extrabold text-[#0059b5]">Tài khoản tối ưu</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Pain Points Section */}
      <section id="pain-points" className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-24 border-t border-[#c1c6d6]/20">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-[32px] font-bold text-[#1a1c1d] tracking-tight">
            Bạn đang gặp vấn đề gì với Facebook?
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#414753] mt-3">
            Đừng lo lắng, tôi ở đây để rà soát lỗi, phân tích bảo mật và hỗ trợ bạn cứu tài khoản nhanh nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {painPoints_spec.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#ffffff] rounded-[24px] border border-[#c1c6d6]/30 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-default flex flex-col"
            >
              <div className="w-full aspect-[4/3] bg-[#eeeef0] overflow-hidden flex items-center justify-center p-4 relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-[#1a1c1d] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-[#414753] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Diagnostic Tool */}
      <section id="diagnostic-tool" className="bg-[#f3f3f5] border-t border-b border-[#c1c6d6]/20 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="bg-[#ffffff] rounded-[32px] p-6 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] border border-[#c1c6d6]/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Tool Left Panel */}
              <div className="lg:col-span-5 text-left space-y-5">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-red-55 border border-red-200 text-red-700 text-xs font-mono font-bold">
                  <ShieldAlert className="h-4 w-4" />
                  <span>CÔNG CỤ KHÁM LỖI TỰ ĐỘNG</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1a1c1d] leading-tight">
                  Tự Chẩn Đoán <br />Trạng Thái Tài Khoản
                </h3>
                <p className="text-[#414753] text-sm font-sans leading-relaxed">
                  Lỗi Facebook của quý khách là gì? Vui lòng click chọn loại lỗi để hệ thống rà soát độ khó, tỷ lệ hoàn phục hồi và nhận lời khuyên xử lý sớm nhất.
                </p>

                <div className="space-y-3 pt-2">
                  {errorsChecklist.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setSelectedErrorCode(item.code);
                        setDiagnosticResult(null);
                      }}
                      className={`w-full p-4 rounded-xl text-left border flex items-center space-x-3 transition-all cursor-pointer ${
                        selectedErrorCode === item.code
                          ? 'bg-[#0059b5] border-[#0059b5] text-white shadow-md shadow-[#0059b5]/10'
                          : 'bg-[#f9f9fb] border-[#c1c6d6]/50 hover:bg-[#eeeef0] text-[#1a1c1d]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${
                        selectedErrorCode === item.code ? 'bg-white/20 text-white' : 'bg-[#eeeef0] text-[#414753]'
                      }`}>
                        <Shield className="h-4 w-4" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-display font-semibold text-xs sm:text-sm">{item.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Right Dynamic Content */}
              <div className="lg:col-span-7 flex flex-col justify-center w-full">
                <div className="bg-[#f9f9fb] border border-[#c1c6d6]/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[420px] text-center">
                  
                  {!diagnosticResult && !diagnosing ? (
                    <div className="my-auto space-y-6 w-full">
                      {currentDiagnoseError && (
                        <div className="max-w-[280px] sm:max-w-[340px] mx-auto rounded-2xl overflow-hidden shadow-sm bg-white border border-[#c1c6d6]/20 p-2">
                          <img 
                            src={currentDiagnoseError.image} 
                            alt={currentDiagnoseError.label} 
                            referrerPolicy="no-referrer"
                            className="w-full h-auto object-cover rounded-xl aspect-video"
                          />
                          <p className="text-[11px] font-sans text-gray-400 mt-2 italic">
                            Xem trước: "{currentDiagnoseError.desc}"
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        <h4 className="font-display font-bold text-[#1a1c1d] text-base sm:text-lg">
                          Bạn đã chọn: {currentDiagnoseError?.label}
                        </h4>
                        <p className="text-[#414753] font-sans text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                          Nhấn nút phía dưới để kích hoạt hệ thống rà soát, phân tích kịch bản bảo mật và hiển thị lời khuyên từ Hoàng Mỹ.
                        </p>
                      </div>

                      <button
                        onClick={handleDiagnose}
                        className="px-6 py-3.5 rounded-full bg-[#0059b5] text-white font-display font-medium text-xs uppercase tracking-wider shadow-md hover:bg-[#00458f] transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
                        <span>Kích hoạt chẩn đoán sơ bộ</span>
                      </button>
                    </div>
                  ) : diagnosing ? (
                    <div className="my-auto space-y-4">
                      <div className="h-10 w-10 border-4 border-[#0059b5] border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <div>
                        <h4 className="font-display font-bold text-[#1a1c1d] text-sm sm:text-base animate-pulse">
                          Đang phân tích thuật toán khóa từ Meta Sandbox...
                        </h4>
                        <p className="text-[#414753] text-[11px] font-mono mt-1">Đang lập báo cáo kịch bản...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full text-left space-y-5 my-auto">
                      <div className="flex items-start space-x-4 pb-4 border-b border-[#c1c6d6]/30">
                        {diagnosticResult.image && (
                          <img 
                            src={diagnosticResult.image} 
                            alt="Diagnostic info logo" 
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 object-cover rounded-xl shrink-0 border border-[#c1c6d6]/20"
                          />
                        )}
                        <div>
                          <p className="text-[10px] uppercase font-mono font-bold text-[#0059b5] tracking-widest">KẾT QUẢ KHÁM BẢO MẬT</p>
                          <h4 className="font-display font-bold text-[#1a1c1d] text-lg sm:text-xl leading-snug">
                            {diagnosticResult.name}
                          </h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-[#eeeef0]/50 border border-[#c1c6d6]/30 text-left">
                          <p className="text-[10px] font-mono font-bold text-[#414753] uppercase tracking-wider">Độ khó kỹ thuật</p>
                          <p className="font-sans font-bold text-[#0059b5] text-sm mt-1">{diagnosticResult.difficulty}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
                          <p className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">Tỷ lệ khôi phục chính chủ</p>
                          <p className="font-sans font-bold text-emerald-700 text-sm mt-1">{diagnosticResult.rate}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                        <div className="flex items-center space-x-1.5 text-amber-800">
                          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                          <span className="font-display font-bold text-xs">Phân tích chuyên môn:</span>
                        </div>
                        <p className="font-sans text-xs text-[#414753] leading-relaxed">
                          {diagnosticResult.advice}
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => navigate(diagnosticResult.targetPath)}
                          className="flex-grow px-5 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-center font-display font-semibold text-xs tracking-wider uppercase transition cursor-pointer"
                        >
                          Xem chi tiết dịch vụ
                        </button>
                        <a
                          href={`${CONTACT_INFO.zalo}?text=${encodeURIComponent(`Chào anh Hoàng Mỹ, tôi cần tư vấn hỗ trợ gấp về trường hợp: ${diagnosticResult.name}. Tôi vừa check trên website của anh.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow px-5 py-3.5 rounded-full bg-[#0059b5] hover:bg-[#00458f] text-white text-center font-display font-semibold text-xs tracking-wider uppercase shadow-md transition cursor-pointer inline-flex items-center justify-center space-x-1.5"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Yêu cầu xử lý khẩn cấp</span>
                        </a>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Mega Service Grid (Bento) */}
      <section id="services" className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="mb-10 text-left">
          <h2 className="font-display text-3xl sm:text-[32px] font-bold text-[#1a1c1d] tracking-tight">
            Giải pháp toàn diện
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Khôi phục & Xử lý */}
          <div className="bg-[#ffffff] rounded-2xl border border-[#c1c6d6]/30 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-full border border-[#0059b5] text-[#0059b5] flex items-center justify-center mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1c1d] mb-4">
                Khôi phục & Xử lý
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#0059b5] shrink-0 mt-1" />
                  <span>Mở khóa tài khoản bị dính lỗi vi phạm chính sách hoặc khóa két sắt 956.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#0059b5] shrink-0 mt-1" />
                  <span>Xử lý tài khoản bị spam, report bẩn, checkpoint danh tính lạ.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#0059b5] shrink-0 mt-1" />
                  <span>Phục hồi quyền truy cập tối cao chính chủ khi bị thay đổi thông tin liên kết.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Bảo mật & Tin cậy */}
          <div className="bg-[#ffffff] rounded-2xl border border-[#c1c6d6]/30 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-full border border-[#0059b5] text-[#0059b5] flex items-center justify-center mb-6">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1c1d] mb-4">
                Bảo mật & Tin cậy
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#0059b5] shrink-0 mt-1" />
                  <span>Thiết lập bảo mật hai lớp 2FA, cấu hình mã qua ứng dụng an toàn.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#0059b5] shrink-0 mt-1" />
                  <span>Rà soát rủi ro bảo mật hệ thống, dọn dẹp các ứng dụng rác liên kết độc hại.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#0059b5] shrink-0 mt-1" />
                  <span>Tư vấn chuẩn hóa thông tin cá nhân trùng khớp với giấy tờ, tránh bị quét checkpoint.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Tăng Tương tác */}
          <div className="bg-[#ffffff] rounded-2xl border border-[#c1c6d6]/30 p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-full border border-[#5f5e60] text-[#5f5e60] flex items-center justify-center mb-6">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1a1c1d] mb-4">
                Tăng Tương tác
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#5f5e60] shrink-0 mt-1" />
                  <span>Tăng lượng người theo dõi (Followers) thật có cam kết bảo hành chống tụt.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#5f5e60] shrink-0 mt-1" />
                  <span>Tăng lượt tương tác thích (Likes), chú thích (Comments) cho bài đăng uy tín.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#414753] leading-relaxed">
                  <Check className="h-4 w-4 text-[#5f5e60] shrink-0 mt-1" />
                  <span>Phát triển tương tác Video chuyên nghiệp giúp kéo khách hàng đột phá.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Doanh nghiệp & Page */}
          <div className="bg-[#1a1c1d] text-white rounded-2xl border border-white/5 p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 shadow-md">
            <div>
              <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center mb-6">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                Doanh nghiệp & Page
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>Tối ưu hóa cài đặt thông tin Fanpage và định vị thương hiệu chuẩn SEO.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>Cấu hình, phân quyền an toàn, thiết lập bảo mật nhóm tối đa.</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                  <span>Tư vấn quản trị tài sản số chuyên sâu, ngăn rủi ro bị khóa lan tài khoản.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <a 
                href={CONTACT_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wider text-white hover:text-[#0059b5] transition-colors"
              >
                Nhận tư vấn riêng chuyên nghiệp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Process Section */}
      <section id="process" className="bg-[#ffffff] border-t border-b border-[#c1c6d6]/20 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-[32px] font-bold text-[#1a1c1d] tracking-tight">
              Quy trình làm việc rõ ràng
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#414753] mt-3">
              Đơn giản hóa mọi bước để tiết kiệm thời gian, tăng tương tác và giảm thiểu lo lắng.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline vertical bar */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#eeeef0] -translate-x-1/2 rounded-full"></div>
            
            <div className="space-y-12 sm:space-y-16 relative">
              
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                <div className="md:w-1/2 md:pr-12 md:text-right pl-14 md:pl-0 w-full order-2 md:order-1">
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#1a1c1d] mb-1">Tiếp nhận thông tin</h4>
                  <p className="font-sans text-sm text-[#414753]">Khách hàng mô tả vấn đề đang gặp phải và gửi thông tin qua Zalo.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 bg-white rounded-full border-[3px] border-[#eeeef0] text-[#0059b5] flex items-center justify-center shrink-0 z-10 font-mono text-sm font-extrabold shadow-sm transition-transform hover:scale-110">1</div>
                <div className="md:w-1/2 md:pl-12 hidden md:block order-3"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                <div className="md:w-1/2 md:pr-12 hidden md:block order-1"></div>
                <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 bg-white rounded-full border-[3px] border-[#eeeef0] text-[#0059b5] flex items-center justify-center shrink-0 z-10 font-mono text-sm font-extrabold shadow-sm transition-transform hover:scale-110">2</div>
                <div className="md:w-1/2 md:pl-12 pl-14 w-full order-2 md:order-3 text-left">
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#1a1c1d] mb-1">Kiểm tra & Phân tích</h4>
                  <p className="font-sans text-sm text-[#414753]">Tôi sẽ audit kỹ lưỡng tình trạng tài khoản để phát hiện chính xác lỗ hổng bảo mật.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                <div className="md:w-1/2 md:pr-12 md:text-right pl-14 md:pl-0 w-full order-2 md:order-1">
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#1a1c1d] mb-1">Tư vấn & Báo giá</h4>
                  <p className="font-sans text-sm text-[#414753]">Đánh giá trung thực khả năng thành công, thời gian hoàn thành và thỏa thuận chi phí hợp lý.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 bg-white rounded-full border-[3px] border-[#eeeef0] text-[#0059b5] flex items-center justify-center shrink-0 z-10 font-mono text-sm font-extrabold shadow-sm transition-transform hover:scale-110">3</div>
                <div className="md:w-1/2 md:pl-12 hidden md:block order-3"></div>
              </div>

              {/* Step 4 (Active highlighted) */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                <div className="md:w-1/2 md:pr-12 hidden md:block order-1"></div>
                <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 bg-[#0059b5] text-white rounded-full border-[3px] border-[#0059b5] flex items-center justify-center shrink-0 z-10 font-mono text-sm font-extrabold shadow-md scale-110">4</div>
                <div className="md:w-1/2 md:pl-12 pl-14 w-full order-2 md:order-3 text-left">
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#0059b5] mb-1">Tiến hành xử lý</h4>
                  <p className="font-sans text-sm text-[#414753]">Tôi bắt đầu thực hiện các giải pháp lập trình bảo mật hoặc gửi cổng kháng nghị VIP của đối tác.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
                <div className="md:w-1/2 md:pr-12 md:text-right pl-14 md:pl-0 w-full order-2 md:order-1">
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#1a1c1d] mb-1">Bàn giao & Hỗ trợ</h4>
                  <p className="font-sans text-sm text-[#414753]">Nhận bàn giao tài khoản an toàn, dọn dẹp bảo mật sau sự cố và kích hoạt bảo hành.</p>
                </div>
                <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 w-12 h-12 bg-white rounded-full border-[3px] border-[#eeeef0] text-[#0059b5] flex items-center justify-center shrink-0 z-10 font-mono text-sm font-extrabold shadow-sm transition-transform hover:scale-110">5</div>
                <div className="md:w-1/2 md:pl-12 hidden md:block order-3"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Me & transparency */}
      <section id="transparency" className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="bg-[#eeeef0] rounded-2xl p-8 md:p-14 border border-[#c1c6d6]/20 flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="flex-1 space-y-6">
            <h2 className="font-display text-3xl sm:text-[32px] font-bold text-[#1a1c1d] tracking-tight">
              Cam kết minh bạch
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#414753] leading-relaxed">
              Tôi làm việc trực tiếp 1-1, tuyệt đối không thông qua trung gian ảo để giữ bí mật thông tin của khách hàng. Mọi cam kết đều được dựng xây từ sự trung thực cao nhất.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 bg-white/70 p-4 rounded-xl border border-white">
                <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-sans font-bold text-sm text-[#1a1c1d]">Người thật tư vấn và sửa lỗi trực tiếp</span>
              </div>
              
              <div className="flex items-center gap-4 bg-white/70 p-4 rounded-xl border border-white">
                <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="font-sans font-bold text-sm text-[#1a1c1d]">Minh bạch tuyệt đối về quy trình và chi phí</span>
              </div>

              <div className="flex items-center gap-4 bg-white/70 p-4 rounded-xl border border-white">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="font-sans font-bold text-sm text-[#1a1c1d]">Tuyệt đối không cam kết xằng bậy với những ca cực khó</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0059b5]/10 to-indigo-50/10 rounded-full blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-md border border-white/80 shadow-md p-8 rounded-2xl text-center space-y-4">
                <div className="w-16 h-16 bg-[#0059b5]/10 rounded-full flex items-center justify-center mx-auto text-[#0059b5]">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#1a1c1d]">Bảo mật là ưu tiên số 1</h3>
                <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                  Toàn bộ thông tin đăng nhập, dữ liệu chat nhạy cảm bên trong tài khoản của quý khách đều được mã hóa ẩn danh và xóa lịch sử rà soát ngay sau khi làm xong việc.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section id="testimonials" className="bg-[#ffffff] py-16 md:py-24 border-t border-b border-[#c1c6d6]/20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-display text-3xl sm:text-[32px] font-bold text-[#1a1c1d] tracking-tight">
              Khách hàng nói gì về Hoàng Mỹ?
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#414753]">
              Sự hài lòng và lấy lại được "tài sản số" an toàn của quý khách là niềm kiêu hãnh của tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {REVIEWS.map((rev) => {
              // Get initials from the customer name (e.g., "Trần Minh Tâm" -> "MT", "Nguyễn Tiến Đạt" -> "TĐ")
              const getInitials = (name: string): string => {
                if (!name) return "";
                const words = name.trim().split(/\s+/);
                if (words.length >= 2) {
                  const firstWord = words[words.length - 2];
                  const lastWord = words[words.length - 1];
                  return ((firstWord[0] || "") + (lastWord[0] || "")).toUpperCase();
                }
                return name.substring(0, 2).toUpperCase();
              };

              // Get a unique background and text color combination based on name
              const getAvatarStyle = (name: string): string => {
                const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const colors = [
                  'bg-blue-100 text-blue-700 border-blue-200',
                  'bg-indigo-100 text-indigo-700 border-indigo-200',
                  'bg-sky-100 text-sky-700 border-sky-200',
                  'bg-slate-100 text-slate-700 border-slate-200',
                  'bg-emerald-100 text-emerald-800 border-emerald-200',
                ];
                return colors[hash % colors.length];
              };

              return (
                <div 
                  key={rev.id}
                  className="bg-[#f9f9fb] p-6 sm:p-8 rounded-2xl border border-[#c1c6d6]/25 flex flex-col justify-between space-y-6"
                >
                  <p className="font-sans text-[#414753] text-sm sm:text-base italic leading-relaxed">
                    "{rev.text}"
                  </p>
                  <div className="flex items-center space-x-4 pt-4 border-t border-[#c1c6d6]/20">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-display font-extrabold text-xs sm:text-sm border-2 shrink-0 ${getAvatarStyle(rev.customerName)}`}>
                      {getInitials(rev.customerName)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#1a1c1d] flex items-center gap-1.5">
                        <span>{rev.customerName}</span>
                        <span className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-100 text-emerald-800 font-sans px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3]" /> đã xác minh
                        </span>
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        Đã phục hồi: <span className="text-[#0059b5] font-semibold">{rev.serviceUsed}</span> • {rev.date}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="max-w-[800px] mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-[32px] font-bold text-[#1a1c1d] tracking-tight">
            Câu hỏi thường gặp
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.slice(0, 4).map((faq) => (
            <div 
              key={faq.id}
              className="bg-[#ffffff] rounded-2xl border border-[#c1c6d6]/30 overflow-hidden text-left"
            >
              <button 
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-[#f3f3f5] transition-colors cursor-pointer"
              >
                <span className="font-display font-bold text-sm sm:text-base text-[#1a1c1d] pr-4">
                  {faq.question}
                </span>
                <ChevronDown className={`h-5 w-5 text-[#414753] shrink-0 transition-transform duration-300 ${
                  activeFaqId === faq.id ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaqId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-[#c1c6d6]/20 bg-[#f9f9fb]/50">
                      <p className="font-sans text-sm text-[#414753] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Final CTA */}
      <section id="contact" className="max-w-[1200px] mx-auto px-5 md:px-6 pb-16 md:pb-24">
        <div className="bg-[#0059b5] text-white p-10 md:p-16 rounded-[24px] text-center relative overflow-hidden">
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Bạn cần hỗ trợ ngay bây giờ?
            </h2>
            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed">
              Nhắn tin trực tiếp qua cổng Zalo cá nhân để tôi rà soát độ nát của nick, tư vấn các bước phòng vệ và đề xuất giải pháp xử lý chất lượng nhất.
            </p>
            <div className="pt-4 flex justify-center">
              <a 
                href={CONTACT_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffffff] text-[#0059b5] rounded-full hover:bg-[#f3f3f5] transition-all duration-300 font-display text-xs font-bold uppercase tracking-wider shadow-lg active:scale-98 text-center"
              >
                <span>Nhắn Zalo Tư Vấn: 0339974745</span>
                <MessageSquare className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
