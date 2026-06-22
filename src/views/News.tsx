import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowDown,
  Clock,
  Calendar,
  User,
  BookOpen
} from 'lucide-react';
import { NEWS_ARTICLES, CONTACT_INFO, IMAGES } from '../data';
import { formatDate } from '../types';

export default function News() {
  
  // Use all articles from the central data file
  const allArticles = NEWS_ARTICLES;

  // First 3 articles are designated as "Bài viết nổi bật" (Featured posts)
  const featuredArticles = allArticles.slice(0, 3);
  
  // Remaining articles go into the "Mẹo và Kiến thức cốt lõi" list
  const gridArticles = allArticles.slice(3);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = IMAGES.serviceProtect;
  };

  return (
    <div id="news-page-root" className="min-h-screen bg-[#f9f9fb] text-[#1a1c1d] pt-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 py-12 md:py-16 text-left">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Text Block */}
          <div className="flex-1 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#eeeef0] text-[#0059b5] font-sans text-[12px] font-semibold tracking-wide uppercase">
              Tin tức & kiến thức Facebook
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1c1d] tracking-tight leading-[1.1] md:leading-[1.1]">
              Cập nhật kiến thức Facebook, bảo mật tài khoản và cách xử lý lỗi thường gặp
            </h1>
            <p className="font-sans text-[14px] sm:text-[15px] text-[#414753] leading-relaxed max-w-2xl">
              Tổng hợp các bài viết hướng dẫn chuyên sâu giúp bạn hiểu rõ hơn về tài khoản Facebook, gỡ lỗi 180 ngày, bảo vệ chống hack, bypass bảo mật 2 yếu tố, tối ưu hoá Fanpage/Group hiệu quả.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => handleScrollToSection('all-articles-list')}
                className="bg-[#0059b5] hover:bg-[#00458f] text-white px-7 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-md shadow-[#0059b5]/10 cursor-pointer"
              >
                <span>Xem bài viết mới nhất</span>
                <ArrowDown className="h-4 w-4" />
              </button>
              <a 
                href={CONTACT_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eeeef0] hover:bg-[#e2e2e4] text-[#1a1c1d] px-7 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center cursor-pointer"
              >
                Liên hệ Zalo tư vấn
              </a>
            </div>
          </div>

          {/* Right Concept Image */}
          <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px] rounded-[2rem] overflow-hidden bg-white border border-[#eeeef0] shadow-[0_15px_40px_rgba(95,94,96,0.03)] p-4 flex items-center justify-center">
            <img 
              className="w-full h-full object-contain mix-blend-multiply" 
              src={IMAGES.serviceProtect} 
              alt="Social Media Security Concept"
              referrerPolicy="no-referrer"
              onError={handleImageError}
            />
          </div>

        </div>
      </section>

      {/* 2. Main Blogs Area */}
      <main id="all-articles-list" className="max-w-[1200px] mx-auto px-5 sm:px-6 py-12 space-y-20 text-left">
        
        {/* Featured Posts list */}
        <section className="space-y-8">
          <h2 className="font-display text-2xl font-bold text-[#1a1c1d] tracking-tight border-l-4 border-[#0059b5] pl-3 flex items-center gap-2">
            <BookOpen className="h-5.5 w-5.5 text-[#0059b5]" />
            <span>Bài viết nổi bật</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((art) => (
              <Link 
                to={`/news/${art.slug}`}
                key={art.id}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(95,94,96,0.02)] border border-[#eeeef0] flex flex-col justify-between h-full group hover:shadow-[0_15px_45px_rgba(95,94,96,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-[#f3f3f5] relative overflow-hidden flex items-center justify-center p-2 border-b border-[#eeeef0]/30">
                  <img 
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    src={art.imageUrl} 
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                  <span className="absolute bottom-3 left-3 bg-white border border-[#eeeef0]/70 text-[#0059b5] text-[10px] font-sans font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                    Nổi bật
                  </span>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-display text-base font-bold text-[#1a1c1d] group-hover:text-[#0059b5] transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#414753] line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#eeeef0] flex items-center justify-between text-[11px] text-[#5f5e60]">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3 text-[#0059b5]" />
                      <span>{art.author || 'Hoàng Mỹ'}</span>
                    </span>
                    <span className="font-sans font-bold text-[#0059b5] inline-flex items-center gap-1">
                      Đọc tiếp <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Post Grid & Sidebar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Posts List */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="font-display text-2xl font-bold text-[#1a1c1d] tracking-tight border-l-4 border-[#0059b5] pl-3 mb-6">
              Mẹo và Kiến thức cốt lõi
            </h2>

            <div className="space-y-6">
              {gridArticles.map((art) => (
                <Link 
                  to={`/news/${art.slug}`}
                  key={art.id}
                  className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-2xl border border-[#eeeef0] hover:border-[#eeeef0]/80 shadow-[0_10px_35px_rgba(95,94,96,0.01)] hover:shadow-[0_15px_45px_rgba(95,94,96,0.04)] group cursor-pointer transition-all duration-300"
                >
                  <div className="sm:w-44 aspect-video sm:aspect-square bg-[#f3f3f5] rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-3 border border-[#eeeef0]/30">
                    <img 
                      className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-103 transition-transform duration-500" 
                      src={art.imageUrl} 
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-grow text-left space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-sans text-[#5f5e60]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(art.publishDate)}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{art.readTime}</span>
                      </span>
                    </div>
                    <h3 className="font-display text-[16px] sm:text-lg font-bold text-[#1a1c1d] group-hover:text-[#0059b5] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#414753] line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Box: Chia sẻ kỹ thuật */}
            <div className="bg-white rounded-[24px] p-6 border border-[#eeeef0] shadow-[0_10px_35px_rgba(95,94,96,0.01)] text-left">
              <h3 className="font-display text-[15px] font-bold text-[#1a1c1d] uppercase tracking-wide border-b border-[#eeeef0] pb-3 mb-4">
                Vì sao đọc Blog này?
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#414753] leading-relaxed">
                Tất cả bài viết được trực tiếp soạn thảo và biên tập từ thực tế ứng cứu tài khoản của Hoàng Mỹ. Giúp quý khách trang bị đầy đủ phản xạ bảo mật trước các chiêu trò lừa đảo tinh vi thời công nghệ số.
              </p>
            </div>

            {/* Box 2: CTA Solid Blue Card */}
            <div className="bg-[#0059b5] text-white rounded-[24px] p-6 text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="w-12 h-12 rounded-full bg-white/15 text-white flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
              </div>
              
              <h3 className="font-display text-lg font-bold leading-snug mb-2">
                Bạn đang gặp lỗi tài khoản Facebook?
              </h3>
              <p className="text-xs text-white/95 leading-relaxed mb-6 max-w-xs mx-auto">
                Đừng tự xử lý nếu không chắc chắn. Hãy để chuyên gia hỗ trợ bạn nhanh chóng.
              </p>
              
              <a 
                href={CONTACT_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white hover:bg-[#f3f3f5] text-[#0059b5] font-sans text-xs font-bold uppercase tracking-wider py-3.5 rounded-full shadow-sm transition-all text-center cursor-pointer active:scale-98"
              >
                Nhắn Zalo ngay
              </a>
            </div>

          </aside>
        </div>

      </main>

      {/* 4. Personal Trust / Expert Section */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 pb-12">
        <div className="bg-[#ffffff] border border-[#eeeef0] rounded-[2.5rem] overflow-hidden shadow-[0_15px_45px_rgba(95,94,96,0.03)] flex flex-col md:flex-row items-center text-left">
          
          {/* Portrait Photo of Hoang My */}
          <div className="w-full md:w-1/2 aspect-square relative md:h-[450px] bg-[#f3f3f5]">
            <img 
              className="w-full h-full object-cover" 
              src={IMAGES.avatarAbout} 
              alt="Hoàng Mỹ - Chuyên gia tư vấn Facebook"
              referrerPolicy="no-referrer"
            />
            {/* Floating verification badge */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-[#eeeef0]/50 px-4.5 py-2.5 rounded-full shadow-sm flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-[#0059b5]" />
              <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#1a1c1d]">Chuyên gia tư vấn</span>
            </div>
          </div>

          {/* Texts details of trust */}
          <div className="p-8 sm:p-12 md:w-1/2 space-y-6">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#1a1c1d] tracking-tight leading-tight">
              Kiến thức thực tế, dễ hiểu
            </h2>
            <p className="font-sans text-sm sm:text-[15px] text-[#414753] leading-relaxed">
              Tất cả các bài viết đều được đúc kết từ kinh nghiệm xử lý hàng ngàn trường hợp thực tế. Nếu bạn không tìm thấy câu trả lời cho vấn đề của mình, hoặc tình huống quá phức tạp, đừng ngần ngại liên hệ trực tiếp.
            </p>
            
            <div className="pt-4 border-t border-[#eeeef0] space-y-4">
              <p className="font-sans font-bold text-xs sm:text-sm text-[#1a1c1d]">
                Không biết nên đọc bài nào trước?
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={CONTACT_INFO.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#0059b5] hover:bg-[#00458f] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Nhắn Zalo để được kiểm tra
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
