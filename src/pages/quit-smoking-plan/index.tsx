import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addDays, isBefore, differenceInDays, isAfter, isSameDay } from 'date-fns';
import { toast } from 'sonner';
import {
  Info,
  Plus,
  Save,
  AlertCircle,
  Cigarette,
} from 'lucide-react';
import PlanPhase from './components/PlanPhase';
import { PlanOverview } from './components/PlanOverview';
import PresetPlans from './components/PresetPlans';

// Types
export interface Phase {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  targetCigarettes: number;
  description: string;
  completed: boolean;
  tips: string[];
}

export interface QuitPlan {
  id: string;
  name: string;
  startDate: Date;
  targetQuitDate: Date;
  phases: Phase[];
  notes: string;
}

// Default phase tips
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

export default function QuitSmokingPlanPage() {
  // State for active plan
  const [plan, setPlan] = useState<QuitPlan>(() => {
    const savedPlan = localStorage.getItem('quitSmokingPlan');
    if (savedPlan) {
      const parsedPlan = JSON.parse(savedPlan);
      return {
        ...parsedPlan,
        startDate: new Date(parsedPlan.startDate),
        targetQuitDate: new Date(parsedPlan.targetQuitDate),
        phases: parsedPlan.phases.map((phase: any) => ({
          ...phase,
          startDate: new Date(phase.startDate),
          endDate: new Date(phase.endDate)
        }))
      };
    }
    
    // Default new plan
    const today = new Date();
    const quitDate = addDays(today, 14);
    
    return {
      id: crypto.randomUUID(),
      name: 'Kế hoạch cai thuốc lá',
      startDate: today,
      targetQuitDate: quitDate,
      phases: [
        {
          id: crypto.randomUUID(),
          name: 'Chuẩn bị',
          startDate: today,
          endDate: addDays(today, 6),
          targetCigarettes: 10,
          description: 'Chuẩn bị tinh thần và môi trường để bắt đầu quá trình cai thuốc',
          completed: false,
          tips: DEFAULT_TIPS.preparation
        },
        {
          id: crypto.randomUUID(),
          name: 'Giảm dần',
          startDate: addDays(today, 7),
          endDate: addDays(today, 13),
          targetCigarettes: 5,
          description: 'Giảm dần số lượng thuốc lá hút hàng ngày',
          completed: false,
          tips: DEFAULT_TIPS.reduction
        },
        {
          id: crypto.randomUUID(),
          name: 'Bỏ thuốc',
          startDate: quitDate,
          endDate: addDays(quitDate, 7),
          targetCigarettes: 0,
          description: 'Ngừng hút thuốc hoàn toàn',
          completed: false,
          tips: DEFAULT_TIPS.quit
        }
      ],
      notes: ''
    };
  });
  
  // Save plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quitSmokingPlan', JSON.stringify(plan));
  }, [plan]);
  
  // Update plan name
  const updatePlanName = (name: string) => {
    setPlan(prev => ({ ...prev, name }));
  };
  
  // Update plan dates
  const updatePlanDates = (startDate: Date, targetQuitDate: Date) => {
    setPlan(prev => ({ ...prev, startDate, targetQuitDate }));
  };
  
  // Add a new phase
  const addPhase = () => {
    const lastPhase = plan.phases[plan.phases.length - 1];
    const newPhaseStartDate = lastPhase ? addDays(lastPhase.endDate, 1) : plan.startDate;
    const newPhaseEndDate = addDays(newPhaseStartDate, 7);
    
    const newPhase: Phase = {
      id: crypto.randomUUID(),
      name: `Giai đoạn ${plan.phases.length + 1}`,
      startDate: newPhaseStartDate,
      endDate: newPhaseEndDate,
      targetCigarettes: lastPhase ? Math.max(0, lastPhase.targetCigarettes - 3) : 5,
      description: 'Mô tả giai đoạn này...',
      completed: false,
      tips: DEFAULT_TIPS.maintenance
    };
    
    setPlan(prev => ({
      ...prev,
      phases: [...prev.phases, newPhase]
    }));
    
    toast.success('Đã thêm giai đoạn mới');
  };
  
  // Update a phase
  const updatePhase = (phaseId: string, updatedPhase: Partial<Phase>) => {
    setPlan(prev => ({
      ...prev,
      phases: prev.phases.map(phase => 
        phase.id === phaseId ? { ...phase, ...updatedPhase } : phase
      )
    }));
  };
  
  // Delete a phase
  const deletePhase = (phaseId: string) => {
    setPlan(prev => ({
      ...prev,
      phases: prev.phases.filter(phase => phase.id !== phaseId)
    }));
    
    toast.success('Đã xóa giai đoạn');
  };
  
  // Update plan notes
  const updateNotes = (notes: string) => {
    setPlan(prev => ({ ...prev, notes }));
  };
  
  // Reset plan with a preset
  const applyPresetPlan = (presetPlan: QuitPlan) => {
    setPlan(presetPlan);
    toast.success('Đã áp dụng kế hoạch mẫu');
  };
  
  // Validate the plan
  const validatePlan = () => {
    // Check if we have at least one phase
    if (plan.phases.length === 0) {
      toast.error('Kế hoạch cần có ít nhất một giai đoạn');
      return false;
    }
    
    // Check for date ordering issues
    if (isAfter(plan.startDate, plan.targetQuitDate)) {
      toast.error('Ngày bắt đầu phải trước ngày cai thuốc');
      return false;
    }
    
    // Check phases
    for (let i = 0; i < plan.phases.length; i++) {
      const phase = plan.phases[i];
      
      // Check if phase dates are valid
      if (isAfter(phase.startDate, phase.endDate)) {
        toast.error(`Giai đoạn "${phase.name}": Ngày bắt đầu phải trước ngày kết thúc`);
        return false;
      }
      
      // Check if phases are in sequence
      if (i > 0) {
        const prevPhase = plan.phases[i - 1];
        if (isBefore(phase.startDate, addDays(prevPhase.endDate, 1))) {
          toast.error(`Giai đoạn "${phase.name}" bị chồng lấn với giai đoạn trước`);
          return false;
        }
      }
    }
    
    return true;
  };
  
  // Save the plan
  const savePlan = () => {
    if (validatePlan()) {
      localStorage.setItem('quitSmokingPlan', JSON.stringify(plan));
      toast.success('Kế hoạch đã được lưu thành công');
    }
  };
  
  // Determine the current phase based on today's date
  const getCurrentPhase = () => {
    const today = new Date();
    
    for (const phase of plan.phases) {
      if ((isSameDay(today, phase.startDate) || isAfter(today, phase.startDate)) && 
          (isSameDay(today, phase.endDate) || isBefore(today, phase.endDate))) {
        return phase;
      }
    }
    
    // If today is after all phases, return the last phase
    if (plan.phases.length > 0 && isAfter(today, plan.phases[plan.phases.length - 1].endDate)) {
      return plan.phases[plan.phases.length - 1];
    }
    
    // If today is before any phase, return the first phase
    if (plan.phases.length > 0 && isBefore(today, plan.phases[0].startDate)) {
      return plan.phases[0];
    }
    
    return null;
  };
  
  const currentPhase = getCurrentPhase();
  
  // Calculate progress
  const calculateProgress = () => {
    const today = new Date();
    const totalDays = differenceInDays(plan.targetQuitDate, plan.startDate);
    const daysPassed = differenceInDays(today, plan.startDate);
    
    if (totalDays <= 0) return 100;
    return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Kế Hoạch Cai Thuốc Lá</h1>
        <p className="text-muted-foreground">
          Tạo và quản lý kế hoạch cai thuốc lá theo từng giai đoạn
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="phases">Giai đoạn</TabsTrigger>
            <TabsTrigger value="presets">Kế hoạch mẫu</TabsTrigger>
          </TabsList>
          
          <Button onClick={savePlan}>
            <Save className="mr-2 h-4 w-4" />
            Lưu kế hoạch
          </Button>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <PlanOverview 
            plan={plan}
            updatePlanName={updatePlanName}
            updatePlanDates={updatePlanDates}
            updateNotes={updateNotes}
            currentPhase={currentPhase}
            calculateProgress={calculateProgress}
          />
        </TabsContent>
        
        <TabsContent value="phases" className="space-y-6">
          <div className="grid gap-6">
            {plan.phases.map((phase, index) => (
              <PlanPhase
                key={phase.id}
                phase={phase}
                phaseIndex={index}
                updatePhase={updatePhase}
                deletePhase={deletePhase}
                isFirst={index === 0}
                isLast={index === plan.phases.length - 1}
                isCurrent={currentPhase?.id === phase.id}
              />
            ))}
            
            <Button variant="outline" onClick={addPhase} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Thêm giai đoạn
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="presets" className="space-y-6">
          <PresetPlans applyPresetPlan={applyPresetPlan} />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium">Lưu ý quan trọng</h3>
            <p className="text-sm text-muted-foreground">
              Cai thuốc lá có thể gặp nhiều thách thức. Hãy tham khảo ý kiến bác sĩ hoặc chuyên gia y tế để được hỗ trợ tốt nhất.
            </p>
          </div>
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/cigarette-tracker">
              <Cigarette className="mr-1.5 h-4 w-4" />
              Theo dõi hút thuốc
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/cigarette-tracker/info">
              <Info className="mr-1.5 h-4 w-4" />
              Thông tin hỗ trợ
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}