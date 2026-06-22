import { useState, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, MessageSquare } from 'lucide-react';
import { CONTACT_INFO, IMAGES } from '../data';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ = memo(function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    'Tất cả',
    'Khôi phục',
    'Bảo mật',
    'Tương tác'
  ];

  const faqsList: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Tài khoản bị khóa dạng 180 ngày có lấy lại được không?',
      answer: 'Tỷ lệ khôi phục phụ thuộc vào lý do bị khóa và tình trạng vi phạm. Trong hầu hết các trường hợp, nếu cung cấp đủ giấy tờ tùy thân hợp lệ và làm đúng quy trình kháng nghị, tài khoản có thể được mở lại. Thời gian xử lý từ 24h đến vài ngày.',
      category: 'Khôi phục'
    },
    {
      id: 'faq-2',
      question: 'Dịch vụ tăng follow có bảo hành không?',
      answer: 'Có, dịch vụ tăng follow của chúng tôi được bảo hành rớt (tụt) trong thời gian quy định (thường là 30-90 ngày tùy gói). Nếu lượng follow giảm dưới mức cam kết, chúng tôi sẽ bù lại miễn phí.',
      category: 'Tương tác'
    },
    {
      id: 'faq-3',
      question: 'Cần cung cấp mật khẩu khi sử dụng dịch vụ không?',
      answer: 'Tùy thuộc vào loại dịch vụ. Đa số các dịch vụ tăng tương tác (like, follow, view) chỉ cần link bài viết/profile và KHÔNG yêu cầu mật khẩu. Tuy nhiên, các dịch vụ như bảo mật tài khoản nâng cao hoặc xử lý tài khoản bị hack có thể cần quyền truy cập tạm thời để thiết lập. Mọi thông tin đều được bảo mật tuyệt đối.',
      category: 'Bảo mật'
    },
    {
      id: 'faq-4',
      question: 'Bao lâu thì dịch vụ hoàn thành?',
      answer: 'Thời gian hoàn thành phụ thuộc vào gói dịch vụ bạn chọn. Các dịch vụ tương tác thường hoàn thành trong 24-48h. Các dịch vụ xử lý sự cố (khôi phục, kháng nghị) có thể mất từ 1-7 ngày làm việc tùy vào phản hồi từ Facebook.',
      category: 'Khôi phục'
    },
    {
      id: 'faq-5',
      question: 'Nếu khôi phục tài khoản thất bại thì tôi có mất phí không?',
      answer: 'Chúng tôi cam kết CHỈ THU PHÍ khi thành công (No Cure - No Pay). Đối với hầu hết các dịch vụ khôi phục và kháng nghị, nếu không lấy lại được tài khoản, quý khách sẽ được hoàn trả 100% chi phí đặt cọc (nếu có) hoặc không phải thanh toán bất kỳ khoản phí nào.',
      category: 'Khôi phục'
    },
    {
      id: 'faq-6',
      question: 'Hệ thống tăng tương tác (like, follow) có an toàn và có bị khóa tài khoản không?',
      answer: 'Hoàn toàn an toàn. Hệ thống sử dụng các tài khoản người dùng thật hoạt động tự nhiên để tương tác, thực hiện theo thuật toán phân phối của Facebook nên không vi phạm chính sách của nền tảng. Tài khoản đăng bài và trang của bạn sẽ được bảo mật tuyệt đối, không lo bị bóp Reich hay khóa acc.',
      category: 'Tương tác'
    },
    {
      id: 'faq-7',
      question: 'Sau khi được cài đặt gói bảo mật, tài khoản của tôi có bị hack lại không?',
      answer: 'Chúng tôi sẽ cài đặt cấu hình bảo mật 3 lớp tối ưu, xóa các điểm yếu bị khai thác và liên kết định danh vững chắc. Tuy nhiên, việc bảo mật còn phụ thuộc vào thói quen sử dụng: bạn cần tuyệt đối không nhấn vào link lạ, không đăng nhập vào các trang web giả mạo và không chia sẻ mã OTP/2FA cho bất kỳ ai.',
      category: 'Bảo mật'
    },
    {
      id: 'faq-8',
      question: 'Tôi cần chuẩn bị những gì trước khi gửi tài khoản để Xác minh danh tính?',
      answer: 'Bạn chỉ cần chuẩn bị hình ảnh mặt trước và mặt sau rõ nét của các giấy tờ tùy thân gốc hợp lệ (Căn cước công dân, Bằng lái xe hoặc Hộ chiếu). Cam chụp tuyệt đối không bị mất góc, không bị lóa hoặc mờ thông tin. Các thông tin này cần khớp hoặc gần đúng với thông tin khai báo trên tài khoản.',
      category: 'Khôi phục'
    },
    {
      id: 'faq-9',
      question: 'Làm thế nào để tôi có thể theo dõi tiến độ xử lý đơn hàng của mình?',
      answer: 'Mỗi đơn hàng dịch vụ đều được Hoàng Mỹ cập nhật tiến độ trực tiếp và liên tục qua Zalo hoặc Messenger đã liên lạc trước đó. Khi có bất kỳ chuyển biến mới nào (Facebook gửi mail phản hồi, mã xác thực gửi về máy, giấy tờ được duyệt), chúng tôi sẽ chụp ảnh báo cáo ngay lập tức cho bạn.',
      category: 'Bảo mật'
    }
  ];

  const filteredFaqs = faqsList.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div id="faq-page-root" className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] pt-28 pb-16">
      <Helmet>
        <title>Câu hỏi thường gặp | Hoàng Mỹ Media</title>
        <meta name="description" content="Giải đáp nhanh chóng các thắc mắc về dịch vụ hỗ trợ Facebook. Minh bạch, rõ ràng và luôn sẵn sàng hỗ trợ bạn." />
      </Helmet>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        
        {/* Hero Section */}
        <section className="py-12 md:py-16 text-center max-w-3xl mx-auto space-y-6">
          <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#1a1c1d] tracking-tight leading-tight">
            Câu hỏi thường gặp
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#414753] leading-relaxed max-w-2xl mx-auto">
            Giải đáp nhanh chóng các thắc mắc về dịch vụ hỗ trợ Facebook. Minh bạch, rõ ràng và luôn sẵn sàng hỗ trợ bạn.
          </p>

          {/* Search Bar */}
          <div className="pt-2 w-full max-w-xl mx-auto relative">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-[#717785] h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4.5 py-4 rounded-full border border-[#eeeef0] bg-white focus:outline-none focus:border-[#0059b5] transition-all font-sans text-sm text-[#1a1c1d] placeholder:text-[#717785]"
            />
          </div>

          {/* Categories Pill Filters */}
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-sans text-xs font-bold transition-all uppercase tracking-wide cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#0059b5] text-white border-[#0059b5] shadow-sm'
                    : 'bg-white hover:bg-[#eeeef0] text-[#5f5e60] border-[#eeeef0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="max-w-3xl mx-auto py-10">
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = expandedId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-[2rem] border border-[#eeeef0] shadow-[0_10px_40px_-10px_rgba(95,94,96,0.03)] overflow-hidden text-left hover:shadow-[0_15px_45px_-10px_rgba(95,94,96,0.06)] transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full px-6 py-5.5 sm:px-8 flex items-center justify-between space-x-4 cursor-pointer focus:outline-none"
                    >
                      <span className="font-sans font-bold text-sm sm:text-base text-[#1a1c1d] leading-snug">
                        {faq.question}
                      </span>
                      <div className={`text-[#5f5e60] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-1 sm:px-8 border-t border-[#eeeef0]/50 font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="bg-white p-12 text-center rounded-[2rem] border border-[#eeeef0]">
                <p className="text-[#5f5e60] text-sm">Không tìm thấy câu hỏi nào phù hợp với từ khóa tìm kiếm.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Tất cả'); }} 
                  className="mt-4 px-4.5 py-2 bg-[#0059b5] text-white text-xs font-bold rounded-full uppercase tracking-wider cursor-pointer"
                >
                  Xem tất cả
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section (Vẫn còn thắc mắc?) */}
        <section className="max-w-[850px] mx-auto py-12 text-left">
          <div className="bg-white border border-[#eeeef0] rounded-[2.5rem] p-8 sm:p-12 shadow-[0_15px_45px_rgba(95,94,96,0.03)] flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
            
            <div className="flex-1 space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1a1c1d] tracking-tight">
                Vẫn còn thắc mắc?
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#414753] leading-relaxed max-w-lg">
                Đừng ngần ngại liên hệ trực tiếp với Hoàng Mỹ để được tư vấn cụ thể về trường hợp của bạn.
              </p>
              
              <div className="pt-2">
                <a 
                  href={CONTACT_INFO.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-[#0059b5] text-white font-display text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#00458f] transition-all gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>Chat qua Zalo</span>
                </a>
              </div>
            </div>

            {/* Circular Profile Avatar of Hoang My */}
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#f9f9fb] shadow-md shrink-0 bg-[#f3f3f5] relative">
              <img 
                src={IMAGES.avatarMain} 
                alt="Hoàng Mỹ Profile" 
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
});

export default FAQ;
