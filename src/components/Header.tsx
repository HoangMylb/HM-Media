import { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';
import { CONTACT_INFO, getZaloLink } from '../data';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsMobileDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Dịch vụ', path: '/services' }
  ];

  const secondaryNavLinks = [
    { name: 'Tin tức', path: '/news' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Liên hệ', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const otherServicesGroup1 = [
    { name: 'Dịch vụ tăng mắt live', hot: true },
    { name: 'Dịch vụ tăng like', hot: true },
    { name: 'Dịch vụ tăng Follows, Like Fanpage', hot: true },
    { name: 'Dịch vụ tăng comment', hot: true },
    { name: 'Dịch vụ tăng view video', hot: true },
    { name: 'Dịch vụ tăng chia sẻ', hot: true },
    { name: 'Dịch vụ tăng đánh giá', hot: true },
    { name: 'Dịch vụ Vip theo tháng', hot: true },
    { name: 'Dịch vụ lọc bạn bè không tương tác', hot: false }
  ];

  const otherServicesGroup2 = [
    { name: 'Dịch vụ tăng follow instagram', hot: true },
    { name: 'Dịch vụ tăng Like Instagram', hot: true },
    { name: 'Dịch vụ tăng Comment Instagram', hot: true },
    { name: 'Dịch vụ tăng view Instagram', hot: false },
    { name: 'Tăng follow Tiktok', hot: true },
    { name: 'Tăng like Tiktok', hot: true },
    { name: 'Tăng view Tiktok', hot: true },
    { name: 'Tăng Sub Youtube', hot: true },
    { name: 'Tăng View Youtube', hot: true },
    { name: 'Tăng Comment Youtube', hot: true },
    { name: 'Tăng Like Youtube', hot: true }
  ];

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#eeeef0]/50 py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-[#eeeef0]/30 py-4.5'
      }`}
    >
      <div className="max-w-[1250px] mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link 
            id="header-logo-link" 
            to="/" 
            className="font-display text-[26px] font-bold tracking-tight text-[#414753] hover:opacity-90 transition-opacity"
          >
            Hoàng Mỹ
          </Link>

          {/* Center-Right Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={`desktop-nav-link-${link.path.replace('/', 'home')}`}
                to={link.path}
                className={`relative font-sans text-[14px] font-semibold transition-colors py-1.5 ${
                  isActive(link.path)
                    ? 'text-[#0059b5]'
                    : 'text-[#5f5e60] hover:text-[#0059b5]'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0059b5]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </Link>
            ))}

            {/* Sub services dropdown */}
            <div 
              className="relative py-1.5"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1 font-sans text-[14px] font-semibold text-[#5f5e60] hover:text-[#0059b5] transition-colors focus:outline-none cursor-pointer"
              >
                <span>Dịch vụ khác</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-[40%] mt-2.5 w-[850px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-[#eeeef0] p-7 z-50 text-left grid grid-cols-12 gap-7"
                  >
                    {/* Column 1: Tăng tương tác cá nhân */}
                    <div className="col-span-4">
                      <h4 className="font-display text-[15px] font-extrabold text-[#0059b5] tracking-tight mb-4 uppercase">
                        Tăng Tương Tác Cá Nhân
                      </h4>
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                        {otherServicesGroup1.map((item) => (
                          <a
                            key={item.name}
                            href={getZaloLink(`Chào anh Hoàng Mỹ, tôi cần tư vấn dịch vụ: ${item.name}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start group/item py-1 text-sm text-[#414753] hover:text-[#0059b5] transition-all"
                          >
                            <ChevronRight className="h-4 w-4 text-gray-300 group-hover/item:text-[#0059b5] group-hover/item:translate-x-0.5 transition-all shrink-0 mt-0.5 mr-1" />
                            <span className="font-sans leading-tight text-[13px] font-medium">
                              {item.name}
                            </span>
                            {item.hot && (
                              <span className="px-1 py-0.5 text-[8px] font-extrabold leading-none bg-[#ef4444] text-white rounded font-mono uppercase shrink-0 ml-1.5 self-center">
                                HOT
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Dịch vụ mạng xã hội khác */}
                    <div className="col-span-4">
                      <h4 className="font-display text-[15px] font-extrabold text-[#0059b5] tracking-tight mb-4 uppercase">
                        Dịch vụ mạng xã hội khác
                      </h4>
                      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                        {otherServicesGroup2.map((item) => (
                          <a
                            key={item.name}
                            href={getZaloLink(`Chào anh Hoàng Mỹ, tôi cần tư vấn dịch vụ: ${item.name}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start group/item py-1 text-sm text-[#414753] hover:text-[#0059b5] transition-all"
                          >
                            <ChevronRight className="h-4 w-4 text-gray-300 group-hover/item:text-[#0059b5] group-hover/item:translate-x-0.5 transition-all shrink-0 mt-0.5 mr-1" />
                            <span className="font-sans leading-tight text-[13px] font-medium">
                              {item.name}
                            </span>
                            {item.hot && (
                              <span className="px-1 py-0.5 text-[8px] font-extrabold leading-none bg-[#ef4444] text-white rounded font-mono uppercase shrink-0 ml-1.5 self-center">
                                HOT
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Chạy ADS cam kết */}
                    <div className="col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-[#0059b5]/5 to-sky-500/5 border border-[#eeeef0]">
                      <div>
                        <div className="bg-[#0059b5] text-white px-2.5 py-1 rounded-full text-[9px] font-extrabold font-mono tracking-wider uppercase inline-block mb-3.5">
                          QUẢNG CÁO CHUYÊN NGHIỆP
                        </div>
                        <h4 className="font-display text-base font-bold text-[#1a1c1d] tracking-tight leading-snug mb-2">
                          Chạy ADS Facebook, Google, Tiktok
                        </h4>
                        <p className="font-sans text-[12.5px] text-[#5f5e60] leading-relaxed mb-4">
                          Cam kết uy tín, minh bạch rõ ràng hóa đơn thanh toán. Tối ưu hóa chi phí chiến dịch, gia tăng tỷ lệ chuyển đổi đơn hàng hiệu quả.
                        </p>
                      </div>
                      <a
                        href={getZaloLink('Chào anh Hoàng Mỹ, tôi cần tư vấn dịch vụ: Chạy ADS cam kết uy tín minh bạch rõ ràng')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0059b5] text-white text-[12px] font-bold uppercase tracking-wider hover:bg-[#00458f] transition-all active:scale-98 shadow-sm cursor-pointer mt-4"
                      >
                        <span>Tư vấn Chạy ADS</span>
                        <MessageSquare className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {secondaryNavLinks.map((link) => (
              <Link
                key={link.path}
                id={`desktop-nav-link-${link.path.replace('/', 'home')}`}
                to={link.path}
                className={`relative font-sans text-[14px] font-semibold transition-colors py-1.5 ${
                  isActive(link.path)
                    ? 'text-[#0059b5]'
                    : 'text-[#5f5e60] hover:text-[#0059b5]'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0059b5]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Call to Action Button */}
          <div className="hidden md:flex items-center">
            <a
              id="header-rescue-cta"
              href={CONTACT_INFO.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-[#0059b5] hover:bg-[#00458f] text-white font-sans text-[13px] font-bold tracking-wide transition-all active:scale-95 shadow-md shadow-[#0059b5]/5 uppercase tracking-wider"
            >
              Tư vấn ngay
            </a>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggler"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl transition-all text-[#1a1c1d] hover:bg-[#eeeef0]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-[#eeeef0] overflow-hidden"
          >
            <div className="px-5 pt-2 pb-6 space-y-3">
              {/* Primary Nav Links */}
              <Link
                to="/"
                className={`block px-4 py-2.5 rounded-xl font-sans text-[15px] font-bold transition-all ${
                  isActive('/')
                    ? 'bg-[#eeeef0] text-[#0059b5] border-l-4 border-[#0059b5] pl-3'
                    : 'text-[#414753] hover:bg-[#eeeef0]'
                }`}
              >
                Trang chủ
              </Link>

              <Link
                to="/services"
                className={`block px-4 py-2.5 rounded-xl font-sans text-[15px] font-bold transition-all ${
                  isActive('/services') && !location.pathname.includes('mobi')
                    ? 'bg-[#eeeef0] text-[#0059b5] border-l-4 border-[#0059b5] pl-3'
                    : 'text-[#414753] hover:bg-[#eeeef0]'
                }`}
              >
                Dịch vụ
              </Link>

              {/* Mobile "Dịch vụ khác" Collapsible Accordion */}
              <div className="border border-[#eeeef0] rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 font-sans text-[15px] font-bold text-[#414753] hover:bg-[#eeeef0] transition-colors"
                >
                  <span className="text-[#0059b5]">Dịch vụ khác (Tăng tương tác / Ads)</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-[#5f5e60] transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isMobileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-[#eeeef0] overflow-hidden bg-white divide-y divide-[#f5f5f7]"
                    >
                      {/* Section Chạy ADS */}
                      <div className="p-4 bg-gradient-to-r from-[#0059b5]/5 to-sky-500/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-1.5 py-0.5 text-[8px] font-extrabold leading-none bg-[#0059b5] text-white rounded font-mono uppercase">
                            ADS CAM KẾT
                          </span>
                        </div>
                        <p className="font-sans text-[12px] text-[#5f5e60] leading-relaxed mb-3">
                          Chạy ADS Facebook, Google, Tiktok uy tín, minh bạch rõ ràng hóa đơn.
                        </p>
                        <a
                          href={getZaloLink('Chào anh Hoàng Mỹ, tôi cần tư vấn dịch vụ: Chạy ADS cam kết uy tín minh bạch rõ ràng')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-lg bg-[#0059b5] text-white text-center font-display text-[11px] font-bold uppercase tracking-wider hover:bg-[#00458f] transition-all block"
                        >
                          Tư vấn ADS qua Zalo
                        </a>
                      </div>

                      {/* Group 1 */}
                      <div className="p-4">
                        <h5 className="font-display text-[12px] font-extrabold text-[#0059b5] mb-2.5 uppercase tracking-wide">
                          Tăng Tương Tác Cá Nhân
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {otherServicesGroup1.map((item) => (
                            <a
                              key={item.name}
                              href={getZaloLink(`Chào anh Hoàng Mỹ, tôi cần tư vấn dịch vụ: ${item.name}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center py-1.5 text-[13px] text-[#414753] hover:text-[#0059b5] font-medium"
                            >
                              <ChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0 mr-1" />
                              <span className="truncate">{item.name}</span>
                              {item.hot && (
                                <span className="px-1 py-0.5 text-[7px] font-extrabold leading-none bg-[#ef4444] text-white rounded font-mono uppercase ml-1 shrink-0">
                                  HOT
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Group 2 */}
                      <div className="p-4">
                        <h5 className="font-display text-[12px] font-extrabold text-[#0059b5] mb-2.5 uppercase tracking-wide">
                          Dịch vụ mạng xã hội khác
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {otherServicesGroup2.map((item) => (
                            <a
                              key={item.name}
                              href={getZaloLink(`Chào anh Hoàng Mỹ, tôi cần tư vấn dịch vụ: ${item.name}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center py-1.5 text-[13px] text-[#414753] hover:text-[#0059b5] font-medium"
                            >
                              <ChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0 mr-1" />
                              <span className="truncate">{item.name}</span>
                              {item.hot && (
                                <span className="px-1 py-0.5 text-[7px] font-extrabold leading-none bg-[#ef4444] text-white rounded font-mono uppercase ml-1 shrink-0">
                                  HOT
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {secondaryNavLinks.map((link) => (
                <Link
                  key={link.path}
                  id={`mobile-nav-link-${link.path.replace('/', 'home')}`}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-xl font-sans text-[15px] font-bold transition-all ${
                    isActive(link.path)
                      ? 'bg-[#eeeef0] text-[#0059b5] border-l-4 border-[#0059b5] pl-3'
                      : 'text-[#414753] hover:bg-[#eeeef0]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-[#eeeef0] flex flex-col">
                <a
                  id="mobile-nav-zalo-link"
                  href={CONTACT_INFO.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3 rounded-full bg-[#0059b5] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  Tư vấn ngay
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(Header);
