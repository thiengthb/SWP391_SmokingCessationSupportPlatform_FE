import {
  addDays,
  isBefore,
  differenceInDays,
  isAfter,
  isSameDay,
} from "date-fns";
import type { QuitPlan } from "../PlanTrackingTab";
import type { Phase } from "@/types/models/phase";

export function getCurrentPhase(plan: QuitPlan): Phase | null {
  const today = new Date();

  for (const phase of plan.phases) {
    if (
      (isSameDay(today, phase.startDate) || isAfter(today, phase.startDate)) &&
      (isSameDay(today, phase.endDate) || isBefore(today, phase.endDate))
    ) {
      return phase;
    }
  }

  // If today is after all phases, return the last phase
  if (
    plan.phases.length > 0 &&
    isAfter(today, plan.phases[plan.phases.length - 1].endDate)
  ) {
    return plan.phases[plan.phases.length - 1];
  }

  // If today is before any phase, return the first phase
  if (plan.phases.length > 0 && isBefore(today, plan.phases[0].startDate)) {
    return plan.phases[0];
  }

  return null;
}

export function getDaysRemaining(targetQuitDate: Date): number {
  const today = new Date();
  if (isAfter(today, targetQuitDate)) {
    return 0;
  }
  return differenceInDays(targetQuitDate, today);
}

export function getDaysSinceStart(startDate: Date): number {
  const today = new Date();
  if (isBefore(today, startDate)) {
    return 0;
  }
  return differenceInDays(today, startDate);
}

export function getNextMilestone(targetQuitDate: Date) {
  const today = new Date();

  // If we haven't reached the quit date yet
  if (isBefore(today, targetQuitDate)) {
    return {
      title: "Ngày cai thuốc",
      date: targetQuitDate,
      daysLeft: differenceInDays(targetQuitDate, today),
      type: "quit",
    };
  }

  // If we've already quit, show upcoming milestones
  const quitDuration = differenceInDays(today, targetQuitDate);

  if (quitDuration < 7) {
    return {
      title: "1 tuần không hút thuốc",
      date: addDays(targetQuitDate, 7),
      daysLeft: 7 - quitDuration,
      type: "milestone",
    };
  } else if (quitDuration < 30) {
    return {
      title: "1 tháng không hút thuốc",
      date: addDays(targetQuitDate, 30),
      daysLeft: 30 - quitDuration,
      type: "milestone",
    };
  } else if (quitDuration < 90) {
    return {
      title: "3 tháng không hút thuốc",
      date: addDays(targetQuitDate, 90),
      daysLeft: 90 - quitDuration,
      type: "milestone",
    };
  } else if (quitDuration < 365) {
    return {
      title: "1 năm không hút thuốc",
      date: addDays(targetQuitDate, 365),
      daysLeft: 365 - quitDuration,
      type: "milestone",
    };
  } else {
    return {
      title: "Hơn 1 năm không hút thuốc",
      date: addDays(targetQuitDate, 365),
      daysLeft: 0,
      type: "achievement",
    };
  }
}

export function calculateProgress(plan: QuitPlan) {
  const today = new Date();

  // If today is before the start date, progress is 0%
  if (isBefore(today, plan.startDate)) {
    return 0;
  }

  // If today is after the target quit date, check if there are phases after the quit date
  if (isAfter(today, plan.targetQuitDate)) {
    const lastPhase = plan.phases[plan.phases.length - 1];

    // If we have phases beyond the quit date, calculate progress based on the last phase end date
    if (lastPhase && isAfter(lastPhase.endDate, plan.targetQuitDate)) {
      const totalDuration = differenceInDays(
        lastPhase.endDate,
        plan.startDate
      );
      const progressDuration = differenceInDays(today, plan.startDate);

      if (isAfter(today, lastPhase.endDate)) {
        return 100; // Beyond the last phase, consider it 100%
      }

      return Math.min(
        100,
        Math.max(0, (progressDuration / totalDuration) * 100)
      );
    }

    // Otherwise, if we're beyond the quit date, consider it 100%
    return 100;
  }

  // Normal progress calculation during the plan
  const totalDuration = differenceInDays(plan.targetQuitDate, plan.startDate);
  const progressDuration = differenceInDays(today, plan.startDate);

  return Math.min(100, Math.max(0, (progressDuration / totalDuration) * 100));
}

export function validatePlan(plan: QuitPlan) {
  // Check if we have at least one phase
  if (plan.phases.length === 0) {
    return {
      isValid: false,
      message: "Kế hoạch cần có ít nhất một giai đoạn"
    };
  }

  // Check for date ordering issues
  if (isAfter(plan.startDate, plan.targetQuitDate)) {
    return {
      isValid: false,
      message: "Ngày bắt đầu phải trước ngày cai thuốc"
    };
  }

  // Check phases
  for (let i = 0; i < plan.phases.length; i++) {
    const phase = plan.phases[i];

    // Check if phase dates are valid
    if (isAfter(phase.startDate, phase.endDate)) {
      return {
        isValid: false,
        message: `Giai đoạn "${phase.phaseName}": Ngày bắt đầu phải trước ngày kết thúc`
      };
    }

    // Check if phases are in sequence
    if (i > 0) {
      const prevPhase = plan.phases[i - 1];
      if (isBefore(phase.startDate, addDays(prevPhase.endDate, 1))) {
        return {
          isValid: false,
          message: `Giai đoạn "${phase.phaseName}" bị chồng lấn với giai đoạn trước`
        };
      }
    }
  }

  return { isValid: true, message: "" };
}
