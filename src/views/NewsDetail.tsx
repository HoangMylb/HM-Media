import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  MessageSquare, 
  ArrowLeft, 
  Heart,
  Calendar,
  Clock,
  User,
  Share2,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { NEWS_ARTICLES, CONTACT_INFO, IMAGES } from '../data';
import { formatDate } from '../types';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  
  // Find article by slug
  const article = NEWS_ARTICLES.find(art => art.slug === slug);

  // Fallback if not found
  if (!article) {
    return <Navigate to="/news" replace />;
  }

  // Related articles (excluding current one, pick up to 3)
  const relatedArticles = NEWS_ARTICLES
    .filter(art => art.slug !== slug)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết bài viết vào bộ nhớ tạm!');
    }
  };

  // Prevent default router hash movement and scroll smoothly
  const handleScrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = IMAGES.serviceProtect;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] pt-24 pb-16"
      id="news-detail-root"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        
        {/* Breadcrumbs / Back Navigation */}
        <div className="mb-8 text-left">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0059b5] hover:text-[#00458f] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại trang Tin tức</span>
          </Link>
        </div>

        {/* 2 Column Layout: Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Article Prose Content */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-[#eeeef0] shadow-[0_10px_35px_rgba(95,94,96,0.01)] overflow-hidden text-left">
            
            {/* Header Image */}
            <div className="aspect-video w-full bg-[#f3f3f5] relative overflow-hidden flex items-center justify-center p-6 border-b border-[#eeeef0]">
              <img
                src={article.imageUrl}
                alt={article.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Main Content Info */}
            <div className="p-6 sm:p-10 space-y-8">
              
              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#5f5e60] font-sans border-b border-[#eeeef0]/80 pb-6">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-[#0059b5]" />
                  <span>Bởi: {article.author || 'Hoàng Mỹ'}</span>
                </span>
                <span className="text-[#eeeef0]">|</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(article.publishDate)}</span>
                </span>
                <span className="text-[#eeeef0]">|</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3.5xl font-extrabold text-[#1a1c1d] tracking-tight leading-tight sm:leading-snug">
                {article.title}
              </h1>

              {/* Excerpt Summary */}
              <p className="font-sans text-base text-[#414753]/90 bg-slate-50 border-l-4 border-[#0059b5] p-4.5 rounded-r-2xl font-medium leading-relaxed italic">
                "{article.excerpt}"
              </p>

              {/* Structured rendering or fallback */}
              {article.introduction ? (
                <div className="space-y-12 font-sans text-[15px] sm:text-base text-[#2c3038] leading-relaxed">
                  
                  {/* Introduction / Mở bài */}
                  <section id="introduction" className="space-y-4">
                    <p className="leading-relaxed text-[#3a3f4a] whitespace-pre-line">
                      {article.introduction}
                    </p>
                  </section>

                  {/* Mục lục / Table of Contents */}
                  <div className="p-6 bg-[#f3f6fa] rounded-3xl border border-[#0059b5]/10 space-y-4">
                    <div className="flex items-center gap-2 text-[#0059b5] font-display font-semibold">
                      <BookOpen className="h-5 w-5" />
                      <span>Mục lục bài viết</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm text-[#414753]">
                      <li>
                        <a 
                          href="#symptoms" 
                          onClick={(e) => handleScrollToId(e, 'symptoms')}
                          className="hover:text-[#0059b5] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-[#0059b5]/60">1.</span> Dấu hiệu nhận biết
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#causes" 
                          onClick={(e) => handleScrollToId(e, 'causes')}
                          className="hover:text-[#0059b5] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-[#0059b5]/60">2.</span> Nguyên nhân thường gặp
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#risks" 
                          onClick={(e) => handleScrollToId(e, 'risks')}
                          className="hover:text-[#0059b5] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-[#0059b5]/60">3.</span> Tình trạng & Sai lầm
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#solutions" 
                          onClick={(e) => handleScrollToId(e, 'solutions')}
                          className="hover:text-[#0059b5] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-[#0059b5]/60">4.</span> Hướng xử lý tham khảo
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#outcomes" 
                          onClick={(e) => handleScrollToId(e, 'outcomes')}
                          className="hover:text-[#0059b5] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-[#0059b5]/60">5.</span> Kết quả kỳ vọng & Hỗ trợ
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#faq" 
                          onClick={(e) => handleScrollToId(e, 'faq')}
                          className="hover:text-[#0059b5] flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-[#0059b5]/60">6.</span> Câu hỏi thường gặp (FAQ)
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* 1. Dấu hiệu nhận biết / Symptoms */}
                  <section id="symptoms" className="space-y-4 scroll-mt-28 text-left">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d] tracking-tight border-b border-[#eeeef0] pb-2">
                      1. Dấu hiệu nhận biết lỗi
                    </h2>
                    {article.symptoms && article.symptoms.length > 0 && (
                      <ul className="space-y-3">
                        {article.symptoms.map((sym: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-100 border border-[#eeeef0] text-[#0059b5] text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-[#3a3f4a]">{sym}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {/* 2. Nguyên nhân thường gặp / Causes */}
                  <section id="causes" className="space-y-4 scroll-mt-28 text-left">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d] tracking-tight border-b border-[#eeeef0] pb-2">
                      2. Nguyên nhân phổ biến thường gặp
                    </h2>
                    {article.causes && article.causes.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-[#414753] text-sm italic sm:text-[15px]">Tổng hợp các nhóm lý do hệ thống bảo mật quét ngăn:</p>
                        <ul className="space-y-3">
                          {article.causes.map((cau: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="w-2 h-2 rounded-full bg-[#0059b5] mt-2 shrink-0"></span>
                              <span className="text-[#3a3f4a]">{cau}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>

                  {/* 3. Tình trạng & Sai lầm / Risks */}
                  <section id="risks" className="space-y-4 scroll-mt-28 text-left">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d] tracking-tight border-b border-[#eeeef0] pb-2">
                      3. Tình trạng trước khi xử lý và sai lầm nên tránh
                    </h2>
                    <p className="text-[#3a3f4a] whitespace-pre-line">
                      {article.beforeStatusContent}
                    </p>
                    
                    {article.beforeStatusRisks && article.beforeStatusRisks.length > 0 && (
                      <div className="p-5 sm:p-6 bg-red-50 border border-red-100 rounded-2xl space-y-3 text-left">
                        <div className="flex items-center gap-2 text-red-600 font-sans font-bold text-sm sm:text-[15px]">
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          <span>Những sai lầm chí mạng cần tránh tuyệt đối:</span>
                        </div>
                        <ul className="space-y-2.5 text-sm text-red-800">
                          {article.beforeStatusRisks.map((risk: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="shrink-0">•</span>
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>

                  {/* 4. Hướng xử lý tham khảo / Solutions */}
                  <section id="solutions" className="space-y-4 scroll-mt-28 text-left">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d] tracking-tight border-b border-[#eeeef0] pb-2">
                      4. Hướng xử lý và giải pháp tham khảo
                    </h2>
                    <p className="text-[#3a3f4a] whitespace-pre-line">
                      {article.solutionsContent}
                    </p>
                    
                    {article.solutionsSteps && article.solutionsSteps.length > 0 && (
                      <ol className="space-y-4">
                        {article.solutionsSteps.map((step: string, idx: number) => (
                          <li key={idx} className="p-4 bg-[#f8f9fa] border border-[#eeeef0] rounded-xl flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#0059b5]/10 text-[#0059b5] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-[#3a3f4a]">{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}

                    {/* CTA Mềm */}
                    <div className="p-5 bg-[#0059b5]/5 border-l-4 border-[#0059b5] rounded-r-2xl space-y-3 mt-6 text-left">
                      <p className="text-xs sm:text-sm text-[#414753] leading-relaxed">
                        Nếu bạn chưa chắc tài khoản của mình đang thuộc trường hợp nào, bạn có thể gửi ảnh chụp màn hình hoặc mô tả lỗi qua Zalo để được xem trước tình trạng.
                      </p>
                      <a 
                        href="https://zalo.me/0339974745" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-sans text-[#0059b5] hover:underline cursor-pointer"
                      >
                        <span>Gửi ảnh lỗi qua Zalo: 0339974745</span>
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </a>
                    </div>
                  </section>

                  {/* 5. Kết quả kỳ vọng & Hỗ trợ / Outcomes */}
                  <section id="outcomes" className="space-y-4 scroll-mt-28 text-left">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d] tracking-tight border-b border-[#eeeef0] pb-2">
                      5. Kết quả có thể kỳ vọng và khi nào nên nhờ hỗ trợ
                    </h2>
                    
                    <div className="space-y-3">
                      <p className="text-[#414753] font-sans font-semibold text-sm sm:text-[15px]">Kết quả bạn có thể kỳ vọng khi kiên nhẫn xử lý đúng hướng:</p>
                      {article.expectedOutcomes && article.expectedOutcomes.length > 0 && (
                        <ul className="space-y-2.5">
                          {article.expectedOutcomes.map((out: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-1" />
                              <span className="text-[#3a3f4a]">{out}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-4 space-y-3 text-left">
                      <p className="text-[#414753] font-sans font-bold text-sm sm:text-[15px]">Khi nào bạn thực sự nên nhờ hỗ trợ kỹ thuật viên?</p>
                      <p className="text-sm text-[#5f5e60] leading-relaxed">
                        - Khi tài khoản bị nghẽn gửi mã hoặc đã bị quá hạn 180 ngày kháng nghị thông báo tự động.<br />
                        - Khi thông tin căn cước lệch hoàn toàn với lịch sử điền trên nick và không khớp hệ thống Meta.<br />
                        - Khi bạn sợ việc lúng túng hoặc thao tác sai làm khóa sâu lỗi vĩnh viễn không cứu được.
                      </p>
                      <p className="text-xs text-[#5f5e60] leading-relaxed bg-[#f3f3f5] p-4 rounded-2xl">
                        Bạn cũng có thể tham khảo thêm phản hồi và cập nhật thực tế trên Facebook cá nhân tại <a href="https://www.facebook.com/MyMapDay/" target="_blank" rel="noopener noreferrer" className="text-[#0059b5] font-bold hover:underline cursor-pointer">fb.com/MyMapDay</a> trước khi quyết định liên hệ.
                      </p>
                    </div>

                    {/* Box CTA chính */}
                    <div className="bg-[#0059b5] text-white p-6 sm:p-8 rounded-3xl space-y-6 text-center relative overflow-hidden mt-8 shadow-xl shadow-[#0059b5]/10">
                      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">
                        Cần kiểm tra tình trạng tài khoản?
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg mx-auto">
                        Gửi ảnh chụp màn hình hoặc mô tả lỗi qua Zalo. Tôi sẽ xem trước tình trạng, nói rõ khả năng hỗ trợ và chỉ tư vấn hướng phù hợp với trường hợp của bạn.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <a 
                          href="https://zalo.me/0339974745" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-slate-50 text-[#0059b5] text-xs font-bold font-sans uppercase tracking-wider py-3.5 px-6 rounded-full transition-all cursor-pointer inline-block"
                        >
                          Nhắn Zalo: 0339974745
                        </a>
                        <a 
                          href="https://www.facebook.com/MyMapDay/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#00458f] hover:bg-[#003875] border border-white/20 text-white text-xs font-bold font-sans uppercase tracking-wider py-3.5 px-6 rounded-full transition-all cursor-pointer inline-block"
                        >
                          Tham khảo Facebook cá nhân
                        </a>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#8e8d8f] italic leading-normal text-left mt-3">
                      Để có thêm góc nhìn trước khi sử dụng dịch vụ, bạn có thể tham khảo một số phản hồi, cập nhật và nội dung thực tế trên Facebook cá nhân. Đây chỉ là nguồn tham khảo thêm, không phải lời cam kết tuyệt đối cho mọi trường hợp, vì mỗi tài khoản sẽ có tình trạng và khả năng xử lý khác nhau.
                    </p>
                  </section>

                  {/* 6. FAQ - Accordion / Câu hỏi thường gặp */}
                  <section id="faq" className="space-y-4 scroll-mt-28 text-left">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#1a1c1d] tracking-tight border-b border-[#eeeef0] pb-2">
                      6. Câu hỏi thường gặp (FAQ)
                    </h2>
                    {article.faqs && article.faqs.length > 0 && (
                      <div className="space-y-3">
                        {article.faqs.map((faq: { question: string; answer: string }, idx: number) => {
                          const isOpen = activeFaq === idx;
                          return (
                            <div key={idx} className="border border-[#eeeef0] rounded-xl overflow-hidden bg-white">
                              <button 
                                onClick={() => setActiveFaq(isOpen ? null : idx)}
                                className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors font-sans font-bold text-xs sm:text-sm text-[#1a1c1d] cursor-pointer"
                              >
                                <span>{faq.question}</span>
                                {isOpen ? <ChevronUp className="h-4 w-4 shrink-0 text-[#0059b5]" /> : <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />}
                              </button>
                              {isOpen && (
                                <div className="p-4 bg-slate-50 border-t border-[#eeeef0] text-xs sm:text-sm text-[#414753] leading-relaxed">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>

                  {/* Conclusion / Kết luận */}
                  <section id="conclusion" className="pt-6 border-t border-[#eeeef0] space-y-3 text-left">
                    <h3 className="font-display text-lg font-bold text-[#1a1c1d]">Kết luận</h3>
                    <p className="leading-relaxed text-[#3a3f4a] whitespace-pre-line">
                      {article.conclusion}
                    </p>
                    <p className="text-xs sm:text-sm text-[#5f5e60]">
                      Nếu quý khách có thêm bất kỳ câu hỏi nào, vui lòng liên hệ nhắn Zalo ngay cho Hoàng Mỹ để được hỗ trợ định hướng kịp thời nhất.
                    </p>
                  </section>

                </div>
              ) : (
                /* Fallback to simple content rendering */
                <div className="font-sans text-base text-[#2c3038] leading-relaxed space-y-6 whitespace-pre-line prose max-w-none">
                  {article.content}
                </div>
              )}

              {/* Help & Warn Alert block */}
              <div className="p-6 rounded-2xl bg-[#0059b5]/5 border border-[#0059b5]/15 flex items-start gap-4 mt-10">
                <div className="w-10 h-10 rounded-full bg-[#0059b5]/10 text-[#0059b5] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-sans font-bold text-sm text-[#1a1c1d]">Phòng tránh rủi ro bảo mật tài khoản</p>
                  <p className="font-sans text-xs sm:text-sm text-[#5f5e60] leading-relaxed">
                    Tuyệt đối không bao giờ đăng nhập mật khẩu của bạn qua bất kỳ đường link không chính gốc nào do người lạ cung cấp ngoài ứng dụng Facebook gốc. Nếu nghi ngờ tài khoản đã bị xâm phạm, hãy nhắn tin tư vấn khẩn cấp để được rà soát lỗ hổng tức thì.
                  </p>
                </div>
              </div>

              {/* Share & Like Action Button */}
              <div className="pt-6 border-t border-[#eeeef0] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#eeeef0] hover:bg-[#e2e2e4] text-[#414753] rounded-full text-xs font-bold font-sans cursor-pointer transition-colors"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Chia sẻ bài viết</span>
                  </button>
                </div>
                <a 
                  href={CONTACT_INFO.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#0059b5] hover:bg-[#00458f] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 shadow-md shadow-[#0059b5]/10 cursor-pointer active:scale-95 text-center"
                >
                  <span>Nhận tư vấn trực tiếp</span>
                  <MessageSquare className="h-4 w-4" />
                </a>
              </div>

            </div>
          </article>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8 text-left">
            
            {/* CTA Box Contact */}
            <div className="bg-[#0059b5] text-white rounded-3xl p-6 sm:p-8 text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="w-12 h-12 rounded-full bg-white/15 text-white flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
              </div>
              
              <h3 className="font-display text-lg sm:text-xl font-bold leading-snug mb-3">
                Cần kiểm tra trạng thái nick Facebook?
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-6 max-w-xs mx-auto font-sans">
                Gửi ngay ảnh chụp màn hình lỗi hoặc link trang cá nhân của bạn cho tôi. Cam kết rà soát kỹ lưỡng, nhanh chóng trong 5 phút.
              </p>
              
              <a 
                href={CONTACT_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white hover:bg-[#f3f3f5] text-[#0059b5] font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-full shadow-md transition-all text-center cursor-pointer active:scale-98"
              >
                Nhắn Zalo ngay
              </a>
            </div>

            {/* Related Articles Widget */}
            <div className="bg-white rounded-3xl p-6 border border-[#eeeef0] shadow-[0_10px_35px_rgba(95,94,96,0.01)] text-left space-y-5">
              <h3 className="font-display text-base font-bold text-[#1a1c1d] tracking-tight border-l-4 border-[#0059b5] pl-3">
                Bài viết liên quan
              </h3>
              
              <div className="divide-y divide-[#eeeef0]/80">
                {relatedArticles.map((art) => (
                  <Link 
                    key={art.id}
                    to={`/news/${art.slug}`}
                    className="block py-4 first:pt-0 last:pb-0 group"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-gray-400 font-sans block">
                        {formatDate(art.publishDate)} • {art.readTime}
                      </span>
                      <h4 className="font-display text-sm font-bold text-[#1a1c1d] group-hover:text-[#0059b5] transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Expert Trust Signature */}
            <div className="bg-white rounded-3xl p-6 border border-[#eeeef0] shadow-[0_10px_35px_rgba(95,94,96,0.01)] text-left flex items-center gap-4">
              <img 
                src={IMAGES.avatarAbout} 
                alt="Hoàng Mỹ" 
                className="w-14 h-14 rounded-2xl object-cover border border-[#eeeef0]"
              />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-[#1a1c1d]">Chuyên Gia Hoàng Mỹ</h4>
                <p className="text-xs text-[#5f5e60] leading-relaxed">
                  Hỗ trợ khôi phục, bypass bảo mật 2FA & kháng nghị mọi cấp độ lỗi tài khoản Facebook 24/7.
                </p>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </motion.div>
  );
}
