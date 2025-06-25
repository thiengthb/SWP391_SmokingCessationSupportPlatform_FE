import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addDays } from 'date-fns';
import { ArrowRight, CheckCheck, Timer, Hourglass, Cigarette, BadgeCheck, Scale } from 'lucide-react';
import type { QuitPlan } from '../index';

interface PresetPlansProps {
  applyPresetPlan: (plan: QuitPlan) => void;
}

export default function PresetPlans({ applyPresetPlan }: PresetPlansProps) {
  // Default tips used in preset plans
  const DEFAULT_TIPS = {
    preparation: [
      'Ghi lại những lý do bạn muốn bỏ thuốc lá',
      'Thông báo cho bạn bè và gia đình về kế hoạch của bạn',
      'Xác định những tình huống khiến bạn muốn hút thuốc',
      'Chuẩn bị các biện pháp thay thế: kẹo cao su, snack lành mạnh...',
      'Đặt ra một ngày cụ thể để bỏ thuốc hoàn toàn'
    ],
    reduction: [
      'Giảm dần số lượng điếu thuốc mỗi ngày theo lịch trình',
      'Trì hoãn điếu thuốc đầu tiên của ngày càng lâu càng tốt',
      'Chỉ hút một nửa mỗi điếu thuốc',
      'Không mang thuốc lá theo người',
      'Tìm hoạt động thay thế khi thèm thuốc'
    ],
    quit: [
      'Vứt bỏ tất cả thuốc lá, bật lửa và gạt tàn',
      'Tránh xa những yếu tố kích thích như rượu bia',
      'Uống nhiều nước và tập thể dục nhẹ nhàng',
      'Tham gia nhóm hỗ trợ hoặc cài đặt ứng dụng bỏ thuốc',
      'Thưởng cho bản thân những thành tích nhỏ'
    ],
    maintenance: [
      'Tiếp tục tạo thói quen mới không liên quan đến thuốc lá',
      'Dành tiền tiết kiệm được cho một phần thưởng đặc biệt',
      'Theo dõi sức khỏe cải thiện của bản thân',
      'Học cách đối phó với căng thẳng mà không cần thuốc lá',
      'Tránh những tình huống có thể gây tái nghiện'
    ],
    longterm: [
      'Xây dựng bản sắc mới như một người không hút thuốc',
      'Giúp đỡ người khác trong hành trình bỏ thuốc',
      'Chú ý đến những thay đổi tích cực về sức khỏe',
      'Lập kế hoạch đối phó với những tình huống có thể gây tái nghiện',
      'Ăn mừng các cột mốc: 3 tháng, 6 tháng, 1 năm không hút thuốc'
    ]
  };
  
  // Generate a preset plan
  const createPresetPlan = (
    name: string,
    durationDays: number,
    phases: {
      name: string;
      durationDays: number;
      cigarettes: number;
      tips: string[];
    }[]
  ): QuitPlan => {
    const today = new Date();
    let currentDate = today;
    
    const createdPhases = phases.map((phase) => {
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
        tips: phase.tips
      };
    });
    
    return {
      id: crypto.randomUUID(),
      name,
      startDate: today,
      targetQuitDate: createdPhases.find(p => p.targetCigarettes === 0)?.startDate || addDays(today, durationDays),
      phases: createdPhases,
      notes: `Kế hoạch mẫu "${name}" với tổng thời gian ${durationDays} ngày.`
    };
  };
  
  // Create preset plans
  const gradualReductionPlan = createPresetPlan(
    "Giảm Dần (30 ngày)",
    30,
    [
      {
        name: "Chuẩn bị",
        durationDays: 7,
        cigarettes: 15,
        tips: DEFAULT_TIPS.preparation
      },
      {
        name: "Giảm lượng 1",
        durationDays: 7,
        cigarettes: 10,
        tips: DEFAULT_TIPS.reduction
      },
      {
        name: "Giảm lượng 2",
        durationDays: 7,
        cigarettes: 5,
        tips: DEFAULT_TIPS.reduction
      },
      {
        name: "Bỏ thuốc",
        durationDays: 9,
        cigarettes: 0,
        tips: DEFAULT_TIPS.quit
      }
    ]
  );
  
  const coldTurkeyPlan = createPresetPlan(
    "Bỏ Thuốc Ngay (14 ngày)",
    14,
    [
      {
        name: "Chuẩn bị tâm lý",
        durationDays: 7,
        cigarettes: 20, // Giữ nguyên lượng thuốc hiện tại
        tips: DEFAULT_TIPS.preparation
      },
      {
        name: "Ngừng hoàn toàn",
        durationDays: 7,
        cigarettes: 0, // Bỏ thuốc hoàn toàn
        tips: DEFAULT_TIPS.quit
      }
    ]
  );
  
  const extendedPlan = createPresetPlan(
    "Kế Hoạch Dài Hạn (90 ngày)",
    90,
    [
      {
        name: "Chuẩn bị",
        durationDays: 14,
        cigarettes: 15,
        tips: DEFAULT_TIPS.preparation
      },
      {
        name: "Giảm nhẹ",
        durationDays: 14,
        cigarettes: 10,
        tips: DEFAULT_TIPS.reduction
      },
      {
        name: "Giảm vừa",
        durationDays: 14,
        cigarettes: 5,
        tips: DEFAULT_TIPS.reduction
      },
      {
        name: "Bỏ thuốc",
        durationDays: 14,
        cigarettes: 0,
        tips: DEFAULT_TIPS.quit
      },
      {
        name: "Duy trì 1",
        durationDays: 14,
        cigarettes: 0,
        tips: DEFAULT_TIPS.maintenance
      },
      {
        name: "Duy trì 2",
        durationDays: 20,
        cigarettes: 0,
        tips: DEFAULT_TIPS.longterm
      }
    ]
  );
  
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl font-bold mb-2">Kế Hoạch Mẫu</h2>
        <p className="text-muted-foreground">
          Chọn một trong các kế hoạch mẫu dưới đây để bắt đầu nhanh chóng.
          Bạn vẫn có thể điều chỉnh các giai đoạn sau khi áp dụng.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gradual Reduction Plan */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="rounded-full bg-amber-100 p-2">
                <Hourglass className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <CardTitle>Giảm Dần</CardTitle>
            <CardDescription>
              Kế hoạch 30 ngày, giảm dần số lượng thuốc lá trước khi bỏ hoàn toàn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">30 ngày</span>
              </div>
              <div className="flex items-center gap-1">
                <Cigarette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">15 → 0 điếu/ngày</span>
              </div>
            </div>
            
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>4 giai đoạn rõ ràng</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Giảm stress cai thuốc</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Thích hợp cho người hút thường xuyên</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => applyPresetPlan(gradualReductionPlan)}
              className="w-full mt-4"
              variant="default"
            >
              Áp dụng kế hoạch
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Cold Turkey Plan */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="rounded-full bg-red-100 p-2">
                <BadgeCheck className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <CardTitle>Bỏ Thuốc Ngay</CardTitle>
            <CardDescription>
              Kế hoạch cai thuốc nhanh, ngừng hoàn toàn sau thời gian chuẩn bị ngắn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">14 ngày</span>
              </div>
              <div className="flex items-center gap-1">
                <Cigarette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">20 → 0 điếu/ngày</span>
              </div>
            </div>
            
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Cai thuốc nhanh chóng</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Chỉ có 2 giai đoạn đơn giản</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Thích hợp cho người có ý chí mạnh mẽ</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => applyPresetPlan(coldTurkeyPlan)}
              className="w-full mt-4"
              variant="default"
            >
              Áp dụng kế hoạch
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        {/* Extended Plan */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start mb-2">
              <div className="rounded-full bg-green-100 p-2">
                <Scale className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <CardTitle>Kế Hoạch Dài Hạn</CardTitle>
            <CardDescription>
              Kế hoạch toàn diện 90 ngày với các giai đoạn chuyển tiếp từ từ và duy trì
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">90 ngày</span>
              </div>
              <div className="flex items-center gap-1">
                <Cigarette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">15 → 0 điếu/ngày</span>
              </div>
            </div>
            
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>6 giai đoạn toàn diện</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Gồm cả giai đoạn duy trì lâu dài</span>
              </li>
              <li className="flex gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Thích hợp cho người muốn cai thuốc bền vững</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => applyPresetPlan(extendedPlan)}
              className="w-full mt-4"
              variant="default"
            >
              Áp dụng kế hoạch
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg border mt-6">
        <h3 className="font-medium mb-2">Làm thế nào để chọn kế hoạch phù hợp?</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <CheckCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Giảm Dần:</strong> Thích hợp cho những người hút thuốc lâu năm, giúp giảm triệu chứng cai thuốc.</span>
          </li>
          <li className="flex gap-2">
            <CheckCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Bỏ Thuốc Ngay:</strong> Phương pháp hiệu quả cho người đã sẵn sàng và có quyết tâm cao.</span>
          </li>
          <li className="flex gap-2">
            <CheckCheck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span><strong>Kế Hoạch Dài Hạn:</strong> Toàn diện nhất, giúp xây dựng thói quen mới và phòng ngừa tái nghiện.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}