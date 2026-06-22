import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Mail, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-app-footer" className="bg-white text-[#414753] border-t border-[#eeeef0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand/About Col */}
          <div className="md:col-span-5 space-y-5">
            <Link id="footer-logo-link" to="/" className="flex items-center space-x-2.5">
              <div>
                <span className="font-sans font-bold tracking-tight text-xl text-[#1a1c1d]">
                  HOÀNG MỸ
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm text-[#5f5e60] leading-relaxed max-w-sm">
              Đơn vị hỗ trợ giải quyết các sự cố tài khoản Facebook chuyên nghiệp hàng đầu Việt Nam. 
              Cam kết lấy lại tài khoản rồi mới thanh toán, minh bạch thông tin, đồng hành bảo trợ bảo mật lâu dài.
            </p>
          </div>

          {/* Quick links Col */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-sans font-bold text-[#1a1c1d] text-sm tracking-widest uppercase">
              Chuyên Mục Dịch Vụ
            </h3>
            <ul className="space-y-2 text-sm font-sans text-[#5f5e60]">
              <li>
                <Link to="/services/phuc-hoi-hack" className="hover:text-[#0059b5] transition-colors">
                  Phục hồi Facebook bị hack
                </Link>
              </li>
              <li>
                <Link to="/services/mo-khoa-ket-tim-956" className="hover:text-[#0059b5] transition-colors">
                  Mở khóa két sắt tím 956
                </Link>
              </li>
              <li>
                <Link to="/services/vo-hieu-hoa-180-ngay" className="hover:text-[#0059b5] transition-colors">
                  Kháng lỗi vô hiệu hóa 282
                </Link>
              </li>
              <li>
                <Link to="/services/xac-minh-danh-tinh-2fa" className="hover:text-[#0059b5] transition-colors">
                  Gỡ mã bảo mật 2 yếu tố (2FA)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#0059b5] font-semibold text-[#0059b5] transition-colors inline-flex items-center space-x-1">
                  <span>Tất cả dịch vụ</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts Col */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-sans font-bold text-[#1a1c1d] text-sm tracking-widest uppercase">
              Liên Hệ Trực Tiếp
            </h3>
            <ul className="space-y-3.5 text-sm font-sans text-[#5f5e60]">
              <li className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-[#0059b5] shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone.replace(/\./g, '')}`} className="font-mono font-bold hover:text-[#0059b5] transition-colors text-[#1a1c1d]">
                  {CONTACT_INFO.phoneFormatted} (Hoàng Mỹ)
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare className="h-4.5 w-4.5 text-[#0059b5] shrink-0" />
                <a href={CONTACT_INFO.zalo} target="_blank" rel="noopener noreferrer" className="hover:text-[#0059b5] transition-colors font-semibold">
                  Zalo hỗ trợ nhanh
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-[#5f5e60] shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#0059b5] transition-colors font-semibold break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Tech line */}
        <div className="mt-12 pt-8 border-t border-[#eeeef0] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#5f5e60]">
          <p>© {currentYear} Dịch Vụ Facebook Hoàng Mỹ.</p>
          <div className="mt-3 sm:mt-0 flex items-center space-x-4">
            <span className="hover:text-[#0059b5] transition-colors cursor-pointer">Bảo vệ quyền lợi khách hàng</span>
            <span>•</span>
            <span className="hover:text-[#0059b5] transition-colors cursor-pointer">Điều khoản bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
