export interface Service {
  id: string;
  title: string;
  description: string;
  detailedDesc: string;
  imageUrl: string;
  category: 'unlock' | 'security' | 'growth' | 'other';
  priceRange: string;
  timeframe: string;
  steps: string[];
  features: string[];
  slug: string;
}

export interface Review {
  id: string;
  customerName: string;
  avatarUrl?: string;
  rating: number;
  date: string;
  text: string;
  serviceUsed: string;
  verified: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  imageUrl: string;
  category: string;
  slug: string;
  author: string;
  
  // High-fidelity structured fields requested by the user
  seoTitle?: string;
  metaDesc?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDesc?: string;
  
  introduction?: string;
  symptoms?: string[]; // Dấu hiệu nhận biết
  causes?: string[]; // Nguyên nhân thường gặp
  
  beforeStatusTitle?: string;
  beforeStatusContent?: string;
  beforeStatusRisks?: string[]; // Rủi ro, sai lầm
  
  solutionsTitle?: string;
  solutionsContent?: string;
  solutionsSteps?: string[]; // Các bước giải quyết cụ thể
  
  expectedOutcomesTitle?: string;
  expectedOutcomes?: string[]; // Kết quả kỳ vọng
  
  faqs?: { question: string; answer: string }[];
  conclusion?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'security' | 'payment' | 'warranty';
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.trim().split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  }
  return dateStr;
}
