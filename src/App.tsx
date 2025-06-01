import Hero from "./components/template/home/hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Trophy, Users, Heart, ChartBar, Clock, CheckCircle2, Star } from "lucide-react";

function App() {
  const features = [
    {
      icon: Brain,
      title: "Smart Analytics",
      description: "Track your progress with advanced metrics and personalized insights"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join thousands of others on their journey to quit smoking"
    },
    {
      icon: Heart,
      title: "Health Tracking",
      description: "Monitor your health improvements in real-time"
    }
  ];

  const stats = [
    { value: "100K+", label: "Active Users" },
    { value: "2M+", label: "Smoke-free Days" },
    { value: "98%", label: "Success Rate" },
    { value: "$5M+", label: "Money Saved" }
  ];

  const milestones = [
    { time: "20 minutes", effect: "Blood pressure normalizes" },
    { time: "12 hours", effect: "Carbon monoxide levels drop" },
    { time: "2-12 weeks", effect: "Circulation improves" },
    { time: "1-9 months", effect: "Breathing improves significantly" }
  ];

  const benefits = [
    { title: "Improved Health", description: "Feel better physically and mentally" },
    { title: "Save Money", description: "Cut unnecessary expenses from smoking" },
    { title: "Better Lifestyle", description: "Enjoy a healthier, smoke-free life" }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - New */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Quitting</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Your Health Journey</h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-4 items-start">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">{milestone.time}</div>
                  <div className="text-muted-foreground">{milestone.effect}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "This app helped me quit smoking after 10 years. The community support and tracking features made all the difference."
                </p>
                <div className="font-semibold">- Satisfied User</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of others who have successfully quit smoking with our support
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Get Started Now</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
