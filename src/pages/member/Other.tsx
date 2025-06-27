import React, { useState } from "react";
import PresetPlans from "./components/PresetPlans";
import { toast } from "sonner";
import type { QuitPlan } from "./PlanTrackingTab";
import { addDays } from "date-fns";

const DEFAULT_TIPS = {
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
export const Other = () => {
  const [plan, setPlan] = useState<QuitPlan>(() => {
    const savedPlan = localStorage.getItem("quitSmokingPlan");
    if (savedPlan) {
      const parsedPlan = JSON.parse(savedPlan);
      return {
        ...parsedPlan,
        startDate: new Date(parsedPlan.startDate),
        targetQuitDate: new Date(parsedPlan.targetQuitDate),
        phases: parsedPlan.phases.map((phase: any) => ({
          ...phase,
          startDate: new Date(phase.startDate),
          endDate: new Date(phase.endDate),
        })),
      };
    }

    // Default new plan
    const today = new Date();
    const quitDate = addDays(today, 14);

    return {
      id: crypto.randomUUID(),
      name: "Kế hoạch cai thuốc lá",
      startDate: today,
      targetQuitDate: quitDate,
      phases: [
        {
          id: crypto.randomUUID(),
          name: "Chuẩn bị",
          startDate: today,
          endDate: addDays(today, 6),
          targetCigarettes: 10,
          description:
            "Chuẩn bị tinh thần và môi trường để bắt đầu quá trình cai thuốc",
          completed: false,
          tips: DEFAULT_TIPS.preparation,
        },
        {
          id: crypto.randomUUID(),
          name: "Giảm dần",
          startDate: addDays(today, 7),
          endDate: addDays(today, 13),
          targetCigarettes: 5,
          description: "Giảm dần số lượng thuốc lá hút hàng ngày",
          completed: false,
          tips: DEFAULT_TIPS.reduction,
        },
        {
          id: crypto.randomUUID(),
          name: "Bỏ thuốc",
          startDate: quitDate,
          endDate: addDays(quitDate, 7),
          targetCigarettes: 0,
          description: "Ngừng hút thuốc hoàn toàn",
          completed: false,
          tips: DEFAULT_TIPS.quit,
        },
      ],
      notes: "",
    };
  });

  const applyPresetPlan = (presetPlan: QuitPlan) => {
    setPlan(presetPlan);
    toast.success("Đã áp dụng kế hoạch mẫu");
  };
  return <PresetPlans applyPresetPlan={applyPresetPlan} />;
};
