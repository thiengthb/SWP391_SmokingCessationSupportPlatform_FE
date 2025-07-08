import type { ProgramFeature, FAQItem, Testimonial } from "@/types/models/Membership";

export const programFeatures: ProgramFeature[] = [
  {
    title: "Theo dõi thời gian không hút thuốc",
    description: "Theo dõi thời gian từ khi bạn hút điếu thuốc cuối cùng",
    free: true,
    paid: true,
  },
  {
    title: "Tiết kiệm chi phí",
    description: "Tính toán số tiền tiết kiệm từ việc không hút thuốc",
    free: true,
    paid: true,
  },
  {
    title: "Thư viện tài liệu cai thuốc",
    description: "Tiếp cận thông tin và phương pháp cai thuốc lá",
    free: true,
    paid: true,
  },
  {
    title: "Cộng đồng hỗ trợ",
    description: "Kết nối với những người khác trong hành trình cai thuốc",
    free: true,
    paid: true,
  },
  {
    title: "Ghi chép lịch sử hút thuốc",
    description: "Theo dõi số lượng và thời gian hút thuốc",
    free: true,
    paid: true,
  },
  {
    title: "Nhắc nhở và động viên",
    description: "Thông báo để duy trì động lực cai thuốc",
    free: true,
    paid: true,
  },
  {
    title: "Báo cáo tiến độ",
    description: "Thống kê chi tiết về quá trình cai thuốc",
    free: false,
    paid: true,
  },
  {
    title: "Kế hoạch cai thuốc cá nhân hóa",
    description: "Kế hoạch được tùy chỉnh theo thói quen của bạn",
    free: false,
    paid: true,
  },
  {
    title: "Phân tích mức độ cai nghiện",
    description: "Đánh giá tiến độ và hiệu quả cai thuốc",
    free: false,
    paid: true,
  },
  {
    title: "Tư vấn trực tuyến",
    description: "Hỗ trợ từ chuyên gia trong quá trình cai thuốc",
    free: false,
    paid: true,
  },
  {
    title: "AI hỗ trợ song hành",
    description: "Trợ giúp 24/7 từ AI trong việc cai thuốc, đưa ra lời khuyên và động viên",
    free: false,
    paid: true,
  }
];

export const faqs: FAQItem[] = [
  {
    question: "Các gói đăng ký có thời hạn là bao lâu?",
    answer:
      "Bạn có thể lựa chọn gói theo tháng hoặc gói theo năm. Gói theo năm sẽ giúp bạn tiết kiệm chi phí đáng kể.",
  },
  {
    question: "Tôi có thể hủy đăng ký bất kỳ lúc nào không?",
    answer:
      "Có, bạn có thể hủy đăng ký bất kỳ lúc nào. Sau khi hủy, bạn vẫn có thể sử dụng dịch vụ cho đến hết thời hạn thanh toán hiện tại.",
  },
  {
    question: "Hình thức thanh toán nào được chấp nhận?",
    answer:
      "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ, ví điện tử (MoMo, VNPay, ZaloPay), và chuyển khoản ngân hàng.",
  },
  {
    question: "Tôi có thể nâng cấp từ gói Cơ bản lên Premium sau không?",
    answer:
      "Hoàn toàn có thể! Bạn có thể nâng cấp lên gói Premium bất kỳ lúc nào. Chúng tôi sẽ tính phí theo tỷ lệ cho thời gian còn lại của chu kỳ thanh toán hiện tại.",
  },
  {
    question: "Liệu ứng dụng có hiệu quả với mọi người không?",
    answer:
      "Hiệu quả của việc cai thuốc lá phụ thuộc vào nhiều yếu tố, bao gồm cả quyết tâm cá nhân. Ứng dụng của chúng tôi cung cấp công cụ và hỗ trợ, nhưng kết quả cuối cùng sẽ khác nhau tùy từng người.",
  },
  {
    question: "Thông tin cá nhân của tôi có được bảo mật không?",
    answer:
      "Chúng tôi coi trọng quyền riêng tư của bạn. Tất cả thông tin cá nhân được mã hóa và bảo mật theo chính sách bảo mật của chúng tôi. Chúng tôi không bao giờ chia sẻ thông tin của bạn với bên thứ ba mà không có sự đồng ý.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Tuấn Anh",
    role: "Người dùng Premium",
    content:
      "Sau nhiều lần thất bại, cuối cùng tôi đã cai thuốc thành công nhờ hỗ trợ từ gói Premium. Tư vấn trực tuyến là điều giúp tôi vượt qua những thời điểm khó khăn nhất.",
    avatar: "https://i.pravatar.cc/100?img=3",
    rating: 5,
  },
  {
    name: "Thanh Hà",
    role: "Người dùng Premium",
    content:
      "Đã cai thuốc được 3 tháng nhờ kế hoạch cá nhân hóa. Tính năng theo dõi tiền tiết kiệm là động lực lớn, đã tiết kiệm được gần 3 triệu đồng rồi!",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
  },
  {
    name: "Minh Đức",
    role: "Người dùng Cơ bản",
    content:
      "Bắt đầu với gói cơ bản để thử và thấy rất hiệu quả. Cộng đồng hỗ trợ rất nhiệt tình và đầy động viên. Đang cân nhắc nâng cấp lên Premium.",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 4,
  },
];
