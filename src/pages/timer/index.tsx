import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RefreshCw, Clock, History, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';

interface ResetHistoryItem {
  timestamp: number;
  duration: number;
}

export default function TimerPage() {
  const [seconds, setSeconds] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [resetHistory, setResetHistory] = useState<ResetHistoryItem[]>([]);
  const [lastResetTime, setLastResetTime] = useState<Date | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonAnimating, setButtonAnimating] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format seconds to hh:mm:ss
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  // Format time for display
  const formatDateTime = (date: Date) => {
    return format(date, 'HH:mm:ss - dd/MM/yyyy', { locale: vi });
  };

  // Format duration for display
  const formatDurationDisplay = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} giây`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes} phút ${remainingSeconds > 0 ? `${remainingSeconds} giây` : ''}`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      return `${hours} giờ ${remainingMinutes > 0 ? `${remainingMinutes} phút` : ''}`;
    }
  };

  const handleReset = () => {
    if (buttonAnimating) return;
    
    setButtonAnimating(true);
    setIsResetting(true);
    
    // Add to history if there's a duration to record
    if (seconds > 0) {
      const now = new Date();
      setResetHistory(prev => [
        { timestamp: now.getTime(), duration: seconds },
        ...prev.slice(0, 4) // Keep only last 5 records
      ]);
      setLastResetTime(now);
    }
    
    // Reset the counter
    setSeconds(0);
    
    // Show toast notification
    toast.success('Bộ đếm đã được đặt lại', {
      description: 'Thời gian đã được đặt về 00:00:00',
      position: 'bottom-center',
    });
    
    // Reset animation state after 500ms
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
    
    setTimeout(() => {
      setButtonAnimating(false);
    }, 1000);

    // Add button press effect
    if (buttonRef.current) {
      buttonRef.current.classList.add('ring-4', 'ring-primary/30');
      setTimeout(() => {
        buttonRef.current?.classList.remove('ring-4', 'ring-primary/30');
      }, 300);
    }
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse" as const,
      duration: 2
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/50 p-4">
      <Card className="w-full max-w-md p-8 flex flex-col items-center justify-center space-y-10 shadow-xl relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-dashed border-primary animate-spin-slow" style={{animationDuration: '30s'}}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border-4 border-dashed border-primary animate-spin-slow" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="w-full text-center space-y-1">
          <h1 className="text-2xl font-bold">Đồng Hồ Đếm Thời Gian</h1>
          <p className="text-sm text-muted-foreground">Bấm vào nút để đặt lại bộ đếm</p>
        </div>
        
        {/* Reset button */}
        <div className="flex justify-center items-center">
          <motion.div
            whileTap={{ scale: 0.95 }}
            animate={{ 
              rotate: isResetting ? 360 : 0,
              ...(seconds > 60 ? pulseAnimation : {})
            }}
            className="relative"
          >
            <Button 
              ref={buttonRef}
              variant="outline" 
              size="lg"
              onClick={handleReset}
              className="h-36 w-36 rounded-full border-4 border-primary shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col items-center justify-center gap-2 bg-background"
            >
              <RefreshCw className={`h-10 w-10 transition-all duration-300 ${isResetting ? 'text-primary animate-spin' : ''}`} />
              <span className="text-lg font-medium">Reset</span>
            </Button>

            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-background rounded-full shadow-inner" />
          </motion.div>
        </div>
        
        {/* Counter display */}
        <div className="bg-muted/50 rounded-xl w-full p-6 flex flex-col items-center border border-border/50 shadow-inner">
          <p className="text-muted-foreground mb-2 flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Thời gian đã trôi qua
          </p>
          
          <motion.div
            key={seconds}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-bold font-mono tabular-nums bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent"
          >
            {formatTime(seconds)}
          </motion.div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between w-full text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(), 'EEEE, dd/MM', { locale: vi })}</span>
            </div>
            
            <AnimatePresence>
              {lastResetTime && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-muted-foreground flex items-center gap-1"
                >
                  <History className="h-3 w-3" />
                  <span>Đặt lại lúc: {formatDateTime(lastResetTime)}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Reset history */}
        {resetHistory.length > 0 && (
          <div className="w-full">
            <p className="text-sm font-medium mb-2 flex items-center gap-1">
              <History className="h-4 w-4" />
              Lịch sử đặt lại gần đây:
            </p>
            
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {resetHistory.map((item, index) => (
                <motion.div 
                  key={item.timestamp}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-muted/30 p-3 rounded-lg text-sm flex justify-between items-center"
                >
                  <span>{formatDateTime(new Date(item.timestamp))}</span>
                  <span className="text-primary font-medium">
                    {formatDurationDisplay(item.duration)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}