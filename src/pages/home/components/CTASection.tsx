import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Change Your Life?</h2>
        <p className="mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
          Join thousands of others who have successfully quit smoking with our support
        </p>
        <Button size="lg" variant="secondary" className="gap-2" onClick={onGetStarted}>
          Get Started Now <Zap className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
