import { addDays } from "date-fns";
import type { QuitPlan } from "@/pages/member/PlanTrackingTab";

// Default tips for different phases
export const DEFAULT_TIPS = {
  preparation: [
    "Ghi lại những lý do bạn muốn bỏ thuốc lá",
    "Thông báo cho bạn bè và gia đình về kế hoạch của bạn",
    "Xác định những tình huống khiến bạn muốn hút thuốc",
    "Chuẩn bị các biện pháp thay thế: kẹo cao su, snack lành mạnh...",
    "Đặt ra một ngày cụ thể để bỏ thuốc hoàn toàn",
  ],
  reduction: [
    "Giảm dần số lượng điếu thuốc mỗi ngày theo lịch trình",
    "Trì hoãn điếu thuốc đầu tiên của ngày càng lâu càng tốt",
    "Chỉ hút một nửa mỗi điếu thuốc",
    "Không mang thuốc lá theo người",
    "Tìm hoạt động thay thế khi thèm thuốc",
  ],
  quit: [
    "Vứt bỏ tất cả thuốc lá, bật lửa và gạt tàn",
    "Tránh xa những yếu tố kích thích như rượu bia",
    "Uống nhiều nước và tập thể dục nhẹ nhàng",
    "Tham gia nhóm hỗ trợ hoặc cài đặt ứng dụng bỏ thuốc",
    "Thưởng cho bản thân những thành tích nhỏ",
  ],
  maintenance: [
    "Tiếp tục tạo thói quen mới không liên quan đến thuốc lá",
    "Dành tiền tiết kiệm được cho một phần thưởng đặc biệt",
    "Theo dõi sức khỏe cải thiện của bản thân",
    "Học cách đối phó với căng thẳng mà không cần thuốc lá",
    "Tránh những tình huống có thể gây tái nghiện",
  ],
  longterm: [
    "Xây dựng bản sắc mới như một người không hút thuốc",
    "Giúp đỡ người khác trong hành trình bỏ thuốc",
    "Chú ý đến những thay đổi tích cực về sức khỏe",
    "Lập kế hoạch đối phó với những tình huống có thể gây tái nghiện",
    "Ăn mừng các cột mốc: 3 tháng, 6 tháng, 1 năm không hút thuốc",
  ],
};

// Define types for plan templates and phases
export interface PlanTemplate {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  duration: number;
  cigarettesRange: string;
  benefits: string[];
  suitableFor: string;
  phases: PlanPhaseTemplate[];
}

export interface PlanPhaseTemplate {
  name: string;
  durationDays: number;
  cigarettes: number;
  tips: string[];
}

// Plan data
export const presetPlans: PlanTemplate[] = [
  {
    id: "gradual-reduction",
    name: "Giảm Dần",
    shortName: "Giảm Dần",
    description: "Kế hoạch 30 ngày, giảm dần số lượng thuốc lá trước khi bỏ hoàn toàn",
    icon: "Hourglass",
    iconColor: "amber",
    bgColor: "amber",
    duration: 30,
    cigarettesRange: "15 → 0 điếu/ngày",
    benefits: [
      "4 giai đoạn rõ ràng",
      "Giảm stress cai thuốc",
      "Thích hợp cho người hút thường xuyên"
    ],
    suitableFor: "Thích hợp cho những người hút thuốc lâu năm, giúp giảm triệu chứng cai thuốc.",
    phases: [
      {
        name: "Chuẩn bị",
        durationDays: 7,
        cigarettes: 15,
        tips: DEFAULT_TIPS.preparation,
      },
      {
        name: "Giảm lượng 1",
        durationDays: 7,
        cigarettes: 10,
        tips: DEFAULT_TIPS.reduction,
      },
      {
        name: "Giảm lượng 2",
        durationDays: 7,
        cigarettes: 5,
        tips: DEFAULT_TIPS.reduction,
      },
      {
        name: "Bỏ thuốc",
        durationDays: 9,
        cigarettes: 0,
        tips: DEFAULT_TIPS.quit,
      },
    ],
  },
  {
    id: "cold-turkey",
    name: "Bỏ Thuốc Ngay",
    shortName: "Bỏ Thuốc Ngay",
    description: "Kế hoạch cai thuốc nhanh, ngừng hoàn toàn sau thời gian chuẩn bị ngắn",
    icon: "BadgeCheck",
    iconColor: "red",
    bgColor: "red",
    duration: 14,
    cigarettesRange: "20 → 0 điếu/ngày",
    benefits: [
      "Cai thuốc nhanh chóng",
      "Chỉ có 2 giai đoạn đơn giản",
      "Thích hợp cho người có ý chí mạnh mẽ"
    ],
    suitableFor: "Phương pháp hiệu quả cho người đã sẵn sàng và có quyết tâm cao.",
    phases: [
      {
        name: "Chuẩn bị tâm lý",
        durationDays: 7,
        cigarettes: 20,
        tips: DEFAULT_TIPS.preparation,
      },
      {
        name: "Ngừng hoàn toàn",
        durationDays: 7,
        cigarettes: 0,
        tips: DEFAULT_TIPS.quit,
      },
    ],
  },
  {
    id: "extended-plan",
    name: "Kế Hoạch Dài Hạn",
    shortName: "Kế Hoạch Dài Hạn",
    description: "Kế hoạch toàn diện 90 ngày với các giai đoạn chuyển tiếp từ từ và duy trì",
    icon: "Scale",
    iconColor: "green",
    bgColor: "green",
    duration: 90,
    cigarettesRange: "15 → 0 điếu/ngày",
    benefits: [
      "6 giai đoạn toàn diện",
      "Gồm cả giai đoạn duy trì lâu dài",
      "Thích hợp cho người muốn cai thuốc bền vững"
    ],
    suitableFor: "Toàn diện nhất, giúp xây dựng thói quen mới và phòng ngừa tái nghiện.",
    phases: [
      {
        name: "Chuẩn bị",
        durationDays: 14,
        cigarettes: 15,
        tips: DEFAULT_TIPS.preparation,
      },
      {
        name: "Giảm nhẹ",
        durationDays: 14,
        cigarettes: 10,
        tips: DEFAULT_TIPS.reduction,
      },
      {
        name: "Giảm vừa",
        durationDays: 14,
        cigarettes: 5,
        tips: DEFAULT_TIPS.reduction,
      },
      {
        name: "Bỏ thuốc",
        durationDays: 14,
        cigarettes: 0,
        tips: DEFAULT_TIPS.quit,
      },
      {
        name: "Duy trì 1",
        durationDays: 14,
        cigarettes: 0,
        tips: DEFAULT_TIPS.maintenance,
      },
      {
        name: "Duy trì 2",
        durationDays: 20,
        cigarettes: 0,
        tips: DEFAULT_TIPS.longterm,
      },
    ],
  },
];

// Helper function to create plan from template
export const createPresetPlan = (planTemplate: PlanTemplate): QuitPlan => {
  const today = new Date();
  let currentDate = today;

  const createdPhases = planTemplate.phases.map((phase) => {
    const startDate = currentDate;
    const endDate = addDays(startDate, phase.durationDays - 1);
    currentDate = addDays(endDate, 1);

    return {
      id: crypto.randomUUID(),
      name: phase.name,
      startDate,
      endDate,
      targetCigarettes: phase.cigarettes,
      description: `Giai đoạn ${phase.name} với mục tiêu ${phase.cigarettes} điếu thuốc mỗi ngày`,
      completed: false,
      tips: phase.tips,
    };
  });

  return {
    id: crypto.randomUUID(),
    name: planTemplate.name,
    startDate: today,
    targetQuitDate:
      createdPhases.find((p) => p.targetCigarettes === 0)?.startDate ||
      addDays(today, planTemplate.duration),
    phases: createdPhases,
    notes: `Kế hoạch mẫu "${planTemplate.name}" với tổng thời gian ${planTemplate.duration} ngày.`,
  };
};
