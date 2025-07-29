import { addDays } from "date-fns";
import type { QuitPlan } from "@/pages/tracking/PlanTrackingTab";
import type { Tip } from "@/types/models/plan";
import { BadgeCheck, Hourglass, Scale, type LucideIcon } from "lucide-react";
import { PhaseStatus } from "@/types/enums/PhaseStatus";

// Default tips for different phases
export const DEFAULT_TIPS = {
  preparation: [
   { id: "prep-1", content: "Ghi lại những lý do bạn muốn bỏ thuốc lá"},
   { id: "prep-2", content: "Thông báo cho bạn bè và gia đình về kế hoạch của bạn"},
   { id: "prep-3", content: "Xác định những tình huống khiến bạn muốn hút thuốc"},
   { id: "prep-4", content: "Chuẩn bị các biện pháp thay thế: kẹo cao su, snack lành mạnh..."},
   { id: "prep-5", content: "Đặt ra một ngày cụ thể để bỏ thuốc hoàn toàn"},
  ],
  reduction: [
   { id: "reduce-1", content: "Giảm dần số lượng điếu thuốc mỗi ngày theo lịch trình"},
   { id: "reduce-2", content: "Trì hoãn điếu thuốc đầu tiên của ngày càng lâu càng tốt"},
   { id: "reduce-3", content: "Chỉ hút một nửa mỗi điếu thuốc"},
   { id: "reduce-4", content: "Không mang thuốc lá theo người"},
   { id: "reduce-5", content: "Tìm hoạt động thay thế khi thèm thuốc"},
  ],
  quit: [
   { id: "quit-1", content: "Vứt bỏ tất cả thuốc lá, bật lửa và gạt tàn"},
   { id: "quit-2", content: "Tránh xa những yếu tố kích thích như rượu bia"},
   { id: "quit-3", content: "Uống nhiều nước và tập thể dục nhẹ nhàng"},
   { id: "quit-4", content: "Tham gia nhóm hỗ trợ hoặc cài đặt ứng dụng bỏ thuốc"},
   { id: "quit-5", content: "Thưởng cho bản thân những thành tích nhỏ"},
  ],
  maintenance: [
   { id: "maint-1", content: "Tiếp tục tạo thói quen mới không liên quan đến thuốc lá"},
   { id: "maint-2", content: "Dành tiền tiết kiệm được cho một phần thưởng đặc biệt"},
   { id: "maint-3", content: "Theo dõi sức khỏe cải thiện của bản thân"},
   { id: "maint-4", content: "Học cách đối phó với căng thẳng mà không cần thuốc lá"},
   { id: "maint-5", content: "Tránh những tình huống có thể gây tái nghiện"},
  ],
  longterm: [
   { id: "long-1", content: "Xây dựng bản sắc mới như một người không hút thuốc"},
   { id: "long-2", content: "Giúp đỡ người khác trong hành trình bỏ thuốc"},
   { id: "long-3", content: "Chú ý đến những thay đổi tích cực về sức khỏe"},
   { id: "long-4", content: "Lập kế hoạch đối phó với những tình huống có thể gây tái nghiện"},
   { id: "long-5", content: "Ăn mừng các cột mốc: 3 tháng, 6 tháng, 1 năm không hút thuốc"},
  ],
};

// Define types for plan templates and phases
export interface PlanTemplate {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  duration: number;
  cigarettesRange: string;
  benefits: string[];
  suitableFor: string;
  phases: PlanPhaseTemplate[];
  difficulty: string;
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
    id: "gentle-30-day", // Updated ID to match recommendation logic
    name: "Giảm Dần",
    shortName: "Giảm Dần",
    description: "Kế hoạch 30 ngày, giảm dần số lượng thuốc lá trước khi bỏ hoàn toàn",
    icon: Hourglass,
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
    difficulty: "Trung bình",
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
    id: "rapid-7-day", // Updated ID to match recommendation logic
    name: "Bỏ Thuốc Ngay",
    shortName: "Bỏ Thuốc Ngay",
    description: "Kế hoạch cai thuốc nhanh, ngừng hoàn toàn sau thời gian chuẩn bị ngắn",
    icon: BadgeCheck,
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
    difficulty: "Khó",
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
    id: "balanced-21-day", // Updated ID to match recommendation logic
    name: "Kế Hoạch Dài Hạn",
    shortName: "Kế Hoạch Dài Hạn",
    description: "Kế hoạch toàn diện 90 ngày với các giai đoạn chuyển tiếp từ từ và duy trì",
    icon: Scale,
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
    difficulty: "Dễ",
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
  {
    id: "intensive-14-day", // Added to match recommendation logic
    name: "Cai Thuốc Tăng Cường",
    shortName: "Tăng Cường",
    description: "Kế hoạch 14 ngày tập trung cao độ để cai thuốc nhanh chóng và hiệu quả",
    icon: BadgeCheck,
    iconColor: "blue",
    bgColor: "blue",
    duration: 14,
    cigarettesRange: "10 → 0 điếu/ngày",
    benefits: [
      "Kết quả nhanh chóng",
      "Hỗ trợ tăng cường",
      "Thích hợp cho người có mức độ phụ thuộc cao"
    ],
    suitableFor: "Dành cho người đã thử cai thuốc nhiều lần hoặc có mức độ phụ thuộc cao.",
    difficulty: "Khó",
    phases: [
      {
        name: "Chuẩn bị tích cực",
        durationDays: 4,
        cigarettes: 10,
        tips: DEFAULT_TIPS.preparation,
      },
      {
        name: "Giảm lượng nhanh",
        durationDays: 3,
        cigarettes: 5,
        tips: DEFAULT_TIPS.reduction,
      },
      {
        name: "Bỏ thuốc hoàn toàn",
        durationDays: 7,
        cigarettes: 0,
        tips: DEFAULT_TIPS.quit,
      },
    ],
  },
];

// Helper function to create plan from template
export const createPresetPlan = (planTemplate: PlanTemplate): QuitPlan => {
  const today = new Date();
  let currentDate = today;
  const planId = crypto.randomUUID();

  const createdPhases = planTemplate.phases.map((phase, index) => {
    const startDate = currentDate;
    const endDate = addDays(startDate, phase.durationDays - 1);
    currentDate = addDays(endDate, 1);

    return {
      id: crypto.randomUUID(),
      planId: planId, // Add missing planId property
      phaseNo: index + 1, // Add missing phaseNo property
      phaseName: phase.name,
      startDate,
      endDate,
      cigaretteBound: phase.cigarettes,
      description: `Giai đoạn ${phase.name} với mục tiêu ${phase.cigarettes} điếu thuốc mỗi ngày`,
      completed: false,
      phaseStatus: PhaseStatus.PENDING, // Cast to PhaseStatus type
      tips: phase.tips,
    };
  });

  return {
    id: planId, // Use the same planId for consistency
    name: planTemplate.name,
    startDate: today,
    targetQuitDate:
      createdPhases.find((p) => p.cigaretteBound === 0)?.startDate ||
      addDays(today, planTemplate.duration),
    phases: createdPhases,
    description: `Kế hoạch mẫu "${planTemplate.name}" với tổng thời gian ${planTemplate.duration} ngày.`,
  };
}
