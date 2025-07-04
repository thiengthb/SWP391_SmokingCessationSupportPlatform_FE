import { addDays } from "date-fns";
import type { QuitPlan } from "@/pages/tracking/PlanTrackingTab";
import type { Tip } from "@/types/models/plan";

// Default tips for different phases
export const DEFAULT_TIPS = {
  preparation: [
   { content: "Ghi lại những lý do bạn muốn bỏ thuốc lá"},
   { content: "Thông báo cho bạn bè và gia đình về kế hoạch của bạn"},
   { content: "Xác định những tình huống khiến bạn muốn hút thuốc"},
   { content: "Chuẩn bị các biện pháp thay thế: kẹo cao su, snack lành mạnh..."},
   { content: "Đặt ra một ngày cụ thể để bỏ thuốc hoàn toàn"},
  ],
  reduction: [
   { content: "Giảm dần số lượng điếu thuốc mỗi ngày theo lịch trình"},
   { content: "Trì hoãn điếu thuốc đầu tiên của ngày càng lâu càng tốt"},
   { content: "Chỉ hút một nửa mỗi điếu thuốc"},
   { content: "Không mang thuốc lá theo người"},
   { content: "Tìm hoạt động thay thế khi thèm thuốc"},
  ],
  quit: [
   { content: "Vứt bỏ tất cả thuốc lá, bật lửa và gạt tàn"},
   { content: "Tránh xa những yếu tố kích thích như rượu bia"},
   { content: "Uống nhiều nước và tập thể dục nhẹ nhàng"},
   { content: "Tham gia nhóm hỗ trợ hoặc cài đặt ứng dụng bỏ thuốc"},
   { content: "Thưởng cho bản thân những thành tích nhỏ"},
  ],
  maintenance: [
   { content: "Tiếp tục tạo thói quen mới không liên quan đến thuốc lá"},
   { content: "Dành tiền tiết kiệm được cho một phần thưởng đặc biệt"},
   { content: "Theo dõi sức khỏe cải thiện của bản thân"},
   { content: "Học cách đối phó với căng thẳng mà không cần thuốc lá"},
   { content: "Tránh những tình huống có thể gây tái nghiện"},
  ],
  longterm: [
   { content: "Xây dựng bản sắc mới như một người không hút thuốc"},
   { content: "Giúp đỡ người khác trong hành trình bỏ thuốc"},
   { content: "Chú ý đến những thay đổi tích cực về sức khỏe"},
   { content: "Lập kế hoạch đối phó với những tình huống có thể gây tái nghiện"},
   { content: "Ăn mừng các cột mốc: 3 tháng, 6 tháng, 1 năm không hút thuốc"},
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
  tips: Tip[];
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
      phaseName: phase.name,
      startDate,
      endDate,
      cigaretteBound: phase.cigarettes,
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
      createdPhases.find((p) => p.cigaretteBound === 0)?.startDate ||
      addDays(today, planTemplate.duration),
    phases: createdPhases,
    notes: `Kế hoạch mẫu "${planTemplate.name}" với tổng thời gian ${planTemplate.duration} ngày.`,
  };
};
