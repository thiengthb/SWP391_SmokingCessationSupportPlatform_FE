import type { Membership } from "@/types/models/membership";

export interface FTNDRecommendation {
  recommendedPlan: string;
  reason: string;
  description: string;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const getFTNDRecommendation = (
  ftndLevel: number, 
  memberships: Membership[]
): FTNDRecommendation | null => {
  if (memberships.length === 0) return null;

  const sortedMemberships = [...memberships].sort((a, b) => a.price - b.price);
  const freePlan = sortedMemberships.find(m => m.price === 0);
  const paidPlans = sortedMemberships.filter(m => m.price > 0);

  if (ftndLevel >= 0 && ftndLevel <= 2) {
    return {
      recommendedPlan: freePlan?.name || sortedMemberships[0]?.name || '',
      reason: 'Mức độ phụ thuộc thấp',
      description: 'Bạn có thể bắt đầu với gói cơ bản để theo dõi tiến trình cai thuốc.',
      urgencyLevel: 'low'
    };
  } else if (ftndLevel >= 3 && ftndLevel <= 4) {
    return {
      recommendedPlan: paidPlans[0]?.name || '',
      reason: 'Mức độ phụ thuộc nhẹ',
      description: 'Gói premium sẽ cung cấp thêm công cụ hỗ trợ cần thiết cho quá trình cai thuốc.',
      urgencyLevel: 'medium'
    };
  } else if (ftndLevel >= 5 && ftndLevel <= 6) {
    return {
      recommendedPlan: paidPlans[Math.min(1, paidPlans.length - 1)]?.name || paidPlans[0]?.name || '',
      reason: 'Mức độ phụ thuộc trung bình',
      description: 'Bạn cần hỗ trợ chuyên nghiệp và công cụ theo dõi chi tiết để cai thuốc thành công.',
      urgencyLevel: 'medium'
    };
  } else if (ftndLevel >= 7 && ftndLevel <= 8) {
    return {
      recommendedPlan: paidPlans[paidPlans.length - 1]?.name || '',
      reason: 'Mức độ phụ thuộc cao',
      description: 'Gói cao cấp nhất với hỗ trợ chuyên gia là cần thiết cho trường hợp của bạn.',
      urgencyLevel: 'high'
    };
  } else if (ftndLevel >= 9 && ftndLevel <= 10) {
    return {
      recommendedPlan: paidPlans[paidPlans.length - 1]?.name || '',
      reason: 'Mức độ phụ thuộc rất cao',
      description: 'Tình trạng của bạn cần sự can thiệp chuyên nghiệp cao cấp để đảm bảo thành công.',
      urgencyLevel: 'critical'
    };
  }

  return null;
};

export const getUrgencyColor = (urgencyLevel: string) => {
  switch (urgencyLevel) {
    case 'low':
      return 'from-green-50 to-green-100 border-green-200 text-green-800';
    case 'medium':
      return 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800';
    case 'high':
      return 'from-orange-50 to-orange-100 border-orange-200 text-orange-800';
    case 'critical':
      return 'from-red-50 to-red-100 border-red-200 text-red-800';
    default:
      return 'from-blue-50 to-blue-100 border-blue-200 text-blue-800';
  }
};
