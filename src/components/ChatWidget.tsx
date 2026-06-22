import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, X, MessageSquare, ShieldAlert } from 'lucide-react';
import { CONTACT_INFO } from '../data';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="quick-contact-widget" className="fixed bottom-6 right-6 z-45 flex flex-col items-end">
      {/* Expanded Actions Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="mb-4 w-76 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-700 to-blue-950 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <h4 className="font-sans font-bold text-sm">Chuyên viên Hoàng Mỹ</h4>
                  <p className="text-[10px] text-emerald-300">Đang trực tuyến hỗ trợ quý khách</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* List of Contacts */}
            <div className="p-4 space-y-3">
              <p className="text-xs font-sans text-gray-400 leading-relaxed mb-1">
                Vui lòng chọn kênh liên hệ chính chủ bên dưới để được chẩn đoán và báo giá lỗi miễn phí:
              </p>

              {/* Zalo */}
              <a
                href={CONTACT_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 hover:border-blue-500/40 transition-all text-blue-300 text-sm font-semibold group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-lg bg-blue-500 text-white font-sans text-xs font-black">
                    Za
                  </div>
                  <span>Nhắn Zalo Ngay</span>
                </div>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded-full uppercase">
                  Ưu tiên
                </span>
              </a>

              {/* FB Profile */}
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 hover:border-blue-500/40 transition-all text-blue-300 text-sm font-semibold"
              >
                <div className="flex items-center space-x-2.5">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  <span>Trang Cá Nhân FB</span>
                </div>
                <span className="text-xs text-blue-400 font-sans">Chính chủ</span>
              </a>

              {/* Call Hotline */}
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\./g, '')}`}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-emerald-600/15 border border-emerald-500/20 hover:bg-emerald-600/22 transition-all text-emerald-300 text-sm font-semibold"
              >
                <Phone className="h-4.5 w-4.5 text-emerald-400" />
                <span>Hotline: {CONTACT_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Footer warning */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center flex items-center justify-center space-x-1.5 text-[10px] text-gray-500">
              <ShieldAlert className="h-3 w-3 text-amber-500" />
              <span>Cam kết bảo mật 100% dữ liệu tài khoản</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Action Button */}
      <motion.button
        id="chat-widget-trigger-button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`shadow-2xl flex items-center justify-center rounded-full transition-transform ${
          isOpen 
            ? 'h-13 w-13 bg-slate-800 text-white' 
            : 'h-15 w-15 bg-gradient-to-tr from-blue-600 via-blue-600 to-blue-500 text-white animate-bounce'
        }`}
        aria-label="Contact Specialist"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </motion.button>
    </div>
  );
}

export default memo(ChatWidget);
