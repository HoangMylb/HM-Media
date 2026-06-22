import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./views/Home'));
const Services = lazy(() => import('./views/Services'));
const ServiceDetail = lazy(() => import('./views/ServiceDetail'));
const FAQ = lazy(() => import('./views/FAQ'));
const News = lazy(() => import('./views/News'));
const NewsDetail = lazy(() => import('./views/NewsDetail'));
const Contact = lazy(() => import('./views/Contact'));

export default function App() {
  return (
    <Router>
      <Helmet>
        <html lang="vi" />
        <title>Hoàng Mỹ - Dịch vụ hỗ trợ Facebook uy tín</title>
        <meta name="description" content="Dịch vụ hỗ trợ Facebook chuyên nghiệp: Khôi phục tài khoản bị hack, mở khóa két sắt tím 956, xử lý vô hiệu hóa 180 ngày, gỡ 2FA." />
        <meta property="og:title" content="Hoàng Mỹ - Dịch vụ hỗ trợ Facebook uy tín" />
        <meta property="og:description" content="Dịch vụ hỗ trợ Facebook chuyên nghiệp: Khôi phục tài khoản bị hack, mở khóa két sắt tím 956, xử lý vô hiệu hóa 180 ngày." />
      </Helmet>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 relative antialiased text-slate-800">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#0059b5] border-t-transparent rounded-full animate-spin" /></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}
