import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollToTop from './components/ScrollToTop';

// Views
import Home from './views/Home';
import Services from './views/Services';
import ServiceDetail from './views/ServiceDetail';
import FAQ from './views/FAQ';
import News from './views/News';
import NewsDetail from './views/NewsDetail';
import Contact from './views/Contact';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 relative antialiased text-slate-800">
        
        {/* Universal Header Navigation */}
        <Header />

        {/* Core content Router */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Universal Footer */}
        <Footer />

        {/* Reactive floating Chat Widget buttons */}
        <ChatWidget />
        
      </div>
    </Router>
  );
}
