import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown, ArrowRight } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

interface PricingPreviewSectionProps {
  onViewPricing: () => void;
}

const plans = [
  {
    name: "Miễn phí",
    period: "Mãi mãi",
    description: "Bắt đầu hành trình cai thuốc",
    features: ["Theo dõi cơ bản", "Thống kê đơn giản", "Cộng đồng hỗ trợ"],
    cta: "Bắt đầu miễn phí",
    popular: false,
  },
  {
    name: "Premium",
    period: "Tháng",
    description: "Tất cả tính năng nâng cao",
    features: [
      "Kế hoạch cá nhân hóa",
      "Hỗ trợ chuyên gia",
      "Thống kê chi tiết",
    ],
    cta: "Nâng cấp Premium",
    popular: true,
  },
];

export function PricingPreviewSection({
  onViewPricing,
}: PricingPreviewSectionProps) {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Chọn gói phù hợp với bạn
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Bắt đầu miễn phí hoặc nâng cấp để có trải nghiệm tốt nhất
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative rounded-2xl p-8 ${
              plan.popular
                ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl"
                : "bg-white border border-gray-200 shadow-lg"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Crown className="h-4 w-4 mr-1" />
                  Phổ biến nhất
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${
                plan.popular
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
              size="lg"
              onClick={() => navigate("/pricing")}
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={onViewPricing}
          className="border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          Xem chi tiết tất cả gói
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
