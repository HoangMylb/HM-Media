import { IMAGES } from './imagesData';
import { Service, Review, NewsArticle, FAQItem } from './types';
import { BLOG_ARTICLES } from './blogArticlesData';

export { IMAGES };

// Trust badges & Contacts Constants
export const CONTACT_INFO = {
  phone: '0339974745',
  phoneFormatted: '0339 974 745',
  zalo: 'https://zalo.me/0339974745',
  facebook: 'https://www.facebook.com/MyMapDay/',
  email: 'nguyenmylb85@gmail.com',
  address: 'Tòa nhà Landmark 81, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
  activeHours: 'Hỗ trợ 24/7 (Kể cả ngày lễ, Tết)'
};

// Fallback Mapping to real host-free Cloud Images (from original Googleusercontent links)
export const IMAGE_FALLBACKS: Record<string, string> = {
  '/images/services/Hacked.jpg': IMAGES.serviceHacked,
  '/images/services/kettim.jpg': IMAGES.servicePadlock956,
  '/images/services/180ngaychuakhang.jpg': IMAGES.serviceViolation,
  '/images/services/Mat2fa.jpg': IMAGES.service2FA,
  '/images/services/XacMinhDanhTinh.jpg': IMAGES.serviceIdentity,
  '/images/services/180ngayDakhang.jpg': IMAGES.serviceSuspend180,
  '/images/services/KhoaProtect.jpg': IMAGES.serviceProtect,
  '/images/services/VHH.jpg': IMAGES.servicePermDisabled,
  '/images/services/KhongNhanTin.jpg': IMAGES.serviceMessageBlock,
};

export const getServiceImage = (path: string): string => {
  return IMAGE_FALLBACKS[path] || path;
};

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Trần Minh Tâm',
    avatarUrl: IMAGES.avatarHands,
    rating: 5,
    date: 'Tháng 6, 2026',
    text: 'Bị hack nick Facebook bán hàng đổi hết email sđt lạ hoắc, mình tưởng như mất hết liên hệ khách quen bao năm qua. Nhờ anh Mỹ hỗ trợ nhiệt tình làm việc xuyên đêm, chỉ trong 4 tiếng sau nick đã về an toàn. Rất chuyên nghiệp và uy tín!',
    serviceUsed: 'Khôi phục nick bị đổi email SĐT',
    verified: true
  },
  {
    id: 'rev-2',
    customerName: 'Phạm Quỳnh Anh',
    avatarUrl: IMAGES.avatarAbout,
    rating: 5,
    date: 'Tháng 6, 2026',
    text: 'Hệ thống bảo mật 2FA của mình bị lỗi ứng dụng do đổi mới máy điện thoại, không tài nào nhận được mã đăng nhập. Anh Mỹ gỡ mã bypass chưa đầy 15 phút là xong xuôi. Chi phí rất hợp lý, thanh toán sau tiện lợi.',
    serviceUsed: 'Gỡ bypass 2 yếu tố 2FA',
    verified: true
  },
  {
    id: 'rev-3',
    customerName: 'Nguyễn Tiến Đạt',
    avatarUrl: IMAGES.avatarMain,
    rating: 5,
    date: 'Hôm qua',
    text: 'Tài khoản chạy ads bị quét vô hiệu hóa 180 ngày (lỗi 282), tự úp CCCD thì dính treo. May tìm đúng chỗ anh Mỹ làm cổng đối tác rà soát VIP trong 3 ngày nick về hoạt động bình thường, không mất đi pixel marketing nào.',
    serviceUsed: 'Kháng vô hiệu hoá 180 ngày',
    verified: true
  },
  {
    id: 'rev-4',
    customerName: 'Hoàng Thảo',
    avatarUrl: IMAGES.avatarHands,
    rating: 5,
    date: 'Tuần trước',
    text: 'Rất hài lòng với dịch vụ gỡ két sắt tím 956 ở đây. Vừa nhanh vừa bảo mật tuyệt đối thông tin cá nhân. Hướng dẫn thêm cách tự cài mật khẩu an toàn và chống quét rất hay.',
    serviceUsed: 'Mở khóa két sắt 956',
    verified: true
  }
];

export const SERVICES: Service[] = [
  {
    id: 'phuc-hoi-hack',
    title: 'Facebook bị hack thay đổi Email và SĐT',
    description: 'Khôi phục tài khoản bị hacker chiếm quyền điều khiển, đổi thông tin email, số điện thoại, gỡ bảo mật gốc.',
    detailedDesc: 'Dịch vụ khôi phục tài khoản Facebook bị hacker xâm nhập, thay đổi hoàn toàn email đăng ký, số điện thoại liên kết và mật khẩu đăng nhập. Chúng tôi sử dụng các phương pháp kỹ thuật bảo mật an toàn để lấy lại tài khoản nhanh chóng, đảm bảo tính bảo mật và sự riêng tư cho khách hàng.',
    imageUrl: '/images/services/Hacked.jpg',
    category: 'unlock',
    priceRange: 'Thanh toán sau khi thành công',
    timeframe: '5 phút – 24 giờ',
    slug: 'phuc-hoi-hack',
    steps: [
      'Dấu hiệu nhận biết: Tài khoản bị đăng xuất đột ngột, khi tìm kiếm không thấy hoặc thấy thông tin lạ. Email nhận thông báo bị gỡ bỏ.',
      'Nguyên nhân: Có thể do truy cập link lạ, cài các tiện ích mở rộng không an toàn, hoặc dính phần mềm độc hại theo dõi bàn phím.',
      'Yêu cầu khôi phục: Quý khách cần còn giữ thiết bị (điện thoại, máy tính) từng đăng nhập Facebook đó thường xuyên trước đây.'
    ],
    features: [
      'Bảo hành chống hack lại trong vòng 30 ngày.',
      'Hỗ trợ cài đặt hệ thống bảo mật 3 tầng sau khi lấy lại.',
      'Chỉ nhận phí khi khách kiểm tra vào được nick.'
    ]
  },
  {
    id: 'mo-khoa-ket-tim-956',
    title: 'Facebook bị khóa két sắt màu tím',
    description: 'Vượt qua các bước xác minh danh tính "Két Sắt Tím 956" do Facebook tạm khóa do nghi ngờ thiết bị lạ.',
    detailedDesc: 'Lỗi két sắt màu tím hiển thị khóa 956 bắt xác minh nhưng không hiển thị nút bắt đầu, hoặc bị treo dạng tìm hiểu thêm. Chúng tôi hỗ trợ ngâm IP sạch, chuyển đổi dạng xác nhận hoặc gửi biểu mẫu kháng nghị chuyên sâu giúp tài khoản được mở khóa nhanh gọn, không lo bị treo.',
    imageUrl: '/images/services/kettim.jpg',
    category: 'unlock',
    priceRange: 'Thanh toán sau khi thành công',
    timeframe: '5 phút – 24 giờ',
    slug: 'mo-khoa-ket-tim-956',
    steps: [
      'Dấu hiệu nhận biết: Trình duyệt đăng nhập báo tài khoản bị khóa kèm biểu tượng két sắt màu tím.',
      'Nguyên nhân: Có thể do bị người khác chơi xấu báo cáo, dính hoạt động vi phạm chính sách hoặc spam quá nhiều.',
      'Yêu cầu khôi phục: Quý khách cần còn giữ thiết bị từng đăng nhập Facebook bị khóa đó.'
    ],
    features: [
      'Bypass nhanh dạng két sắt 956 trong ngày.',
      'Chuyển đổi dạng xác minh sang nhận mã email hoặc SĐT dễ dàng.',
      'Làm trực tiếp không qua trung gian, bảo mật 100%.'
    ]
  },
  {
    id: 'vi-pham-tieu-chuan',
    title: 'Facebook vi phạm tiêu chuẩn cộng đồng',
    description: 'Kháng nghị tài khoản bị khóa do hệ thống quét nhầm vi phạm các chính sách tiêu chuẩn cộng đồng của Meta.',
    detailedDesc: 'Hệ thống AI của Facebook chặn tài khoản của học viên, chủ shop hoặc tổ chức do phát hiện nội dung có chứa từ khóa nhạy cảm. Chúng tôi soạn thảo kháng nghị bằng tiếng Anh, gửi qua cổng tổng đài hỗ trợ Meta Doanh Nghiệp để rà soát thủ công, khôi phục trạng thái hoạt động tốt nhất.',
    imageUrl: '/images/services/180ngaychuakhang.jpg',
    category: 'unlock',
    priceRange: 'Thanh toán sau khi thành công',
    timeframe: '30 phút – 30 ngày',
    slug: 'vi-pham-tieu-chuan',
    steps: [
      'Dấu hiệu nhận biết: Tài khoản bị khóa và nhận thông báo vi phạm các chính sách tiêu chuẩn cộng đồng.',
      'Nguyên nhân: Có thể do đăng bài về tuyển dụng, xuất khẩu lao động, chính trị hoặc chia sẻ nội dung không được phép.',
      'Yêu cầu khôi phục: Được hỗ trợ rà soát chính chủ bằng tài khoản Meta Business hoặc có giấy tờ căn cước khớp thông tin.'
    ],
    features: [
      'Giải trình rà soát trực tiếp với kỹ thuật viên Facebook.',
      'Xử lý khôi phục kháng nghị quyền quản trị viên Fanpage/Group.',
      'Cam kết thời gian xử lý nhanh chóng và tỷ lệ thành công tối đa.'
    ]
  },
  {
    id: 'xac-minh-danh-tinh-2fa',
    title: 'Facebook bị mã đăng nhập',
    description: 'Mất phương thức xác nhận, không nhận được mã SMS hoặc mất ứng dụng tạo mã xác thực hai lớp 2FA.',
    detailedDesc: 'Lớp bảo mật xác thực 2 yếu tố (2FA) vô cùng quan trọng nhưng đôi khi lại trở thành rào cản lớn nhất khi quý khách đổi điện thoại, làm mất app Authenticator hoặc nhà mạng gặp lỗi không gửi mã SMS về thiết bị. Dịch vụ của chúng tôi giúp quý khách đăng nhập được Facebook và bypass 2FA dễ dàng.',
    imageUrl: '/images/services/Mat2fa.jpg',
    category: 'security',
    priceRange: 'Thanh toán sau khi thành công',
    timeframe: '5 phút – 24 giờ',
    slug: 'xac-minh-danh-tinh-2fa',
    steps: [
      'Dấu hiệu nhận biết: Đăng nhập đúng mật khẩu nhưng bị yêu cầu mã đăng nhập hoặc xác thực 2 yếu tố để tiếp tục.',
      'Nguyên nhân: Có thể do mất phương thức xác nhận hoặc tài khoản đã bị người khác cài xác thực bảo mật trước đó.',
      'Yêu cầu khôi phục: Quý khách cần còn nhớ thông tin ngày tháng năm sinh trên Facebook.'
    ],
    features: [
      'Gỡ bypass 2 yếu tố chỉ trong vòng 15 đến 30 phút.',
      'Cấp mã dự phòng đăng nhập khẩn cấp.',
      'Hướng dẫn cấu hình bảo mật app Authenticator đồng bộ điện toán đám mây.'
    ]
  },
  {
    id: 'khoa-bat-xac-minh',
    title: 'Facebook bị khóa bắt xác minh danh tính',
    description: 'Hỗ trợ vượt qua các rào cản bắt xác minh nhân thân, xác định danh tính bạn bè từ hệ thống Meta.',
    detailedDesc: 'Yêu cầu tải lên giấy tờ của Meta đối với người dùng thông thường rất khó vượt qua do ảnh chụp không rõ hoặc thông tin khác biệt. Chúng tôi hỗ trợ chuẩn hóa giấy tờ khớp từng chi tiết để AI Meta tự động duyệt mở lại nick cho quý khách.',
    imageUrl: '/images/services/XacMinhDanhTinh.jpg',
    category: 'unlock',
    priceRange: 'Thanh toán sau khi thành công',
    timeframe: '5 phút – 24 giờ',
    slug: 'khoa-bat-xac-minh',
    steps: [
      'Dấu hiệu nhận biết: Đăng nhập Facebook bị yêu cầu xác minh danh tính.',
      'Nguyên nhân: Có thể do đăng nhập thiết bị lạ, bị người khác báo cáo xấu hoặc tài khoản có hoạt động bất thường.',
      'Yêu cầu khôi phục: Còn giữ thiết bị từng đăng nhập Facebook đó và còn quyền truy cập Email liên kết.'
    ],
    features: [
      'Hỗ trợ chế tạo phôi giấy tờ tùy thân khớp thông tin Facebook khi bị đăng ký lệch tên.',
      'Tỷ lệ duyệt thành công cực kỳ cao nhờ kinh nghiệm am hiểu thuật toán quét AI.',
      'Đảm bảo tuyệt đối không rò rỉ hình ảnh giấy tờ ra bên ngoài.'
    ]
  },
  {
    id: 'vo-hieu-hoa-180-ngay',
    title: 'Facebook bị vô hiệu hóa 180 ngày',
    description: 'Kháng bẫy treo vô hiệu hóa 180 ngày (phản hồi trong vòng 180 ngày) do vi phạm chính sách quét.',
    detailedDesc: 'Trường hợp kháng nghị lỗi 282 vô hiệu hóa 180 ngày đòi hỏi gửi yêu cầu nhanh chóng và đúng định dạng biểu mẫu hỗ trợ. Việc gửi sai nhiều lần sẽ dẫn đến treo vĩnh viễn không thể cứu chữa. Chúng tôi giúp xử lý chuyên sâu ca này mượt mà.',
    imageUrl: '/images/services/180ngayDakhang.jpg',
    category: 'unlock',
    priceRange: 'Thanh toán sau khi thành công',
    timeframe: '5 phút – 24 giờ',
    slug: 'vo-hieu-hoa-180-ngay',
    steps: [
      'Dấu hiệu nhận biết: Facebook yêu cầu tải ảnh hoặc căn cước công dân trong vòng 180 ngày.',
      'Nguyên nhân: Tài khoản bị quét tiêu chuẩn cộng đồng hoặc đăng nhập bất thường.',
      'Yêu cầu khôi phục: Còn quyền truy cập email hoặc thiết bị an toàn.'
    ],
    features: [
      'Xử lý nhanh chóng các lỗi khóa treo 282/180 ngày.',
      'Đại lý đối tác nộp rà soát thủ công cam kết bảo mật.',
      'Không tạm ứng tiền trước, kiểm tra nick rồi mới thanh toán.'
    ]
  },
  {
    id: 'vo-hieu-hoa-vinh-vien',
    title: 'Facebook bị vô hiệu hóa vĩnh viễn',
    description: 'Hỗ trợ kháng nghị phán quyết "Quyết định vĩnh viễn" thông qua tệp khách hàng đối tác VIP.',
    detailedDesc: 'Khi tài khoản báo "Chúng tôi đã đưa ra quyết định vĩnh viễn", cơ hội cứu vớt dường như bằng không. Tuy nhiên, chúng tôi hỗ trợ cổng kháng nghị Doanh Nghiệp độc quyền (Meta Business Suite / Agency Ads Level) để cứu vớt các nick bán hàng giá trị.',
    imageUrl: '/images/services/VHH.jpg',
    category: 'unlock',
    priceRange: 'Khảo sát tình trạng báo giá riêng',
    timeframe: '1 ngày – 30 ngày',
    slug: 'vo-hieu-hoa-vinh-vien',
    steps: [
      'Dấu hiệu nhận biết: Facebook thông báo tài khoản bị vô hiệu hóa vĩnh viễn, vô hiệu hóa trang cá nhân không thời hạn.',
      'Nguyên nhân: Có thể do vi phạm chính sách nghiêm trọng, hoạt động tuyển dụng có tính rủi ro cao hoặc đăng nội dung không phù hợp.',
      'Yêu cầu khôi phục: Quý khách cần còn giữ quyền truy cập Email liên kết với Facebook.'
    ],
    features: [
      'Giải pháp cuối cùng bằng cổng kháng nghị đối tác VIP.',
      'Giám sát hồ sơ rà soát thủ công của chuyên viên Meta.',
      'Thanh toán sau, an toàn và cam kết trách nhiệm vững vàng.'
    ]
  },
  {
    id: 'xac-minh-nhan-tin',
    title: 'Xác minh danh tính để nhắn tin',
    description: 'Gỡ chặn Messenger, cứu tình trạng chặn gửi tin nhắn, dẹp bỏ cảnh báo vi phạm tính năng trò chuyện.',
    detailedDesc: 'Messenger bị khóa tính năng nhắn tin hoặc yêu cầu xác minh danh tính để tiếp tục trò chuyện. Hãy để chuyên viên của chúng tôi can thiệp, gửi mã mở khóa tính năng chat an toàn, không bị khóa lan sang tài khoản chính.',
    imageUrl: '/images/services/KhongNhanTin.jpg',
    category: 'other',
    priceRange: 'Thanh toán sau khi thành công',
    timeframe: '5 phút – 24 giờ',
    slug: 'xac-minh-nhan-tin',
    steps: [
      'Dấu hiệu nhận biết: Không thể nhắn tin hoặc bị yêu cầu xác minh danh tính để tiếp tục nhắn tin.',
      'Nguyên nhân: Hoạt động nhắn tin có dấu hiệu bất thường, tài khoản thiếu độ tin cậy hoặc Meta quét nhầm tài khoản ảo.',
      'Yêu cầu khôi phục: Còn thông tin tài khoản cơ bản và liên kết ứng dụng.'
    ],
    features: [
      'Gỡ chặn chat Messenger cấp tốc từ 5 phút đến tối đa 24 giờ.',
      'Bảo vệ hộp thư trò chuyện, chống dính spam và quét hàng loạt.',
      'Không yêu cầu giữ mật khẩu tài khoản lâu dài.'
    ]
  }
];

export const NEWS_ARTICLES: NewsArticle[] = BLOG_ARTICLES;

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Quy trình giao dịch mở khóa bên mình như thế nào? Có cần đưa mật khẩu không?',
    answer: 'Tùy thuộc vào từng lỗi cụ thể. Với một số lỗi như mở khóa 956 hoặc vượt 2FA, chúng tôi chỉ cần link trang cá nhân và mã xác minh hiển thị trên máy của bạn. Với trường hợp hack sâu cần can thiệp hệ thống, chúng tôi sẽ cần pass cũ gần nhất. Mọi dữ liệu bàn giao đều được mã hóa và cam kết bảo mật bằng văn bản online, xóa sạch lịch sử ngay sau khi hoàn thành nhiệm vụ.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'Thời gian lấy lại tài khoản bị hack thường mất bao lâu?',
    answer: 'Thông thường đối với tài khoản chính chủ, có tương tác chụp ảnh đời thực trên trang cá nhân thì thời gian khôi phục chỉ từ 2 đến 12 giờ làm việc. Đối với các tài khoản bị hack sâu, đổi toàn bộ thông tin lâu ngày không dùng có thể mất tối đa 24h - 48h để Meta Team xác duyệt.',
    category: 'warranty'
  },
  {
    id: 'faq-3',
    question: 'Trường hợp mở khóa không thành công bên mình có thu phí không?',
    answer: 'Tuyệt đối KHÔNG. Phương châm làm việc của Hoàng Mỹ là "Làm được việc mới nhận tiền". Nếu trường hợp nick bị dính án tử hoặc Meta từ chối kháng nghị vĩnh viễn, chúng tôi sẽ hoàn trả lại toàn bộ tiền cọc (nếu có) và không thu bất kỳ chi phí phát sinh nào từ quý khách.',
    category: 'payment'
  },
  {
    id: 'faq-4',
    question: 'Sau khi mở khóa xong, tài khoản của tôi có bị hack hay bị khóa lại không?',
    answer: 'Chúng tôi cam kết bảo hành 1 đổi 1 hoặc bảo hành kỹ thuật 30 ngày cho các dịch vụ liên quan đến mở khóa và chống hack lại. Trong quy trình bàn giao, chuyên viên Hoàng Mỹ sẽ trực tiếp thiết lập lớp phòng vệ 3 tầng và tặng tài liệu độc quyền giúp bảo vệ tài khoản vĩnh viễn từ các đợt quét của Facebook.',
    category: 'security'
  },
  {
    id: 'faq-5',
    question: 'Làm thế nào để phân biệt dịch vụ thật của Hoàng Mỹ với các đối tượng lừa đảo mạo danh?',
    answer: 'Quý khách lưu ý: Hoàng Mỹ chỉ sử dụng duy nhất các thông tin liên hệ chính thống hiển thị trên trang web này (Số điện thoại hotline đuôi 745, Link Zalo chính chủ có tích xác thực, và Trang cá nhân Facebook chính thức). Chúng tôi KHÔNG BAO GIỜ chủ động inbox yêu cầu chuyển tiền trước vào các tài khoản lạ không trùng tên Hoàng Mỹ.',
    category: 'general'
  }
];
