import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ChevronRight, 
  HelpCircle, 
  CreditCard, 
  Calendar, 
  Clock, 
  Users, 
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from '@/components/ui/switch';

interface PricingFeature {
  name: string;
  basic: boolean | string;
  premium: boolean | string;
  elite: boolean | string;
  tooltip?: string;
}

interface PlanFeatures {
  category: string;
  features: PricingFeature[];
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Calculate prices based on billing cycle
  const basicPrice = billingCycle === 'monthly' ? 29.99 : 19.99;
  const premiumPrice = billingCycle === 'monthly' ? 59.99 : 49.99;
  const elitePrice = billingCycle === 'monthly' ? 99.99 : 79.99;

  const annualSavingsBasic = ((29.99 * 12) - (19.99 * 12)).toFixed(0);
  const annualSavingsPremium = ((59.99 * 12) - (49.99 * 12)).toFixed(0);
  const annualSavingsElite = ((99.99 * 12) - (79.99 * 12)).toFixed(0);
  
  const recommendedPlan = 'premium';

  const planFeatures: PlanFeatures[] = [
    {
      category: 'Gym Access',
      features: [
        { 
          name: 'Standard gym hours access', 
          basic: true, 
          premium: true, 
          elite: true 
        },
        { 
          name: 'Extended hours access', 
          basic: false, 
          premium: true, 
          elite: true,
          tooltip: 'Access to gym outside standard hours (5am-11pm)'
        },
        { 
          name: '24/7 access', 
          basic: false, 
          premium: false, 
          elite: true,
          tooltip: 'Access the gym at any time, day or night'
        },
        { 
          name: 'Multiple location access', 
          basic: false, 
          premium: true, 
          elite: true,
          tooltip: 'Access all locations in your city'
        },
        { 
          name: 'Global gym access', 
          basic: false, 
          premium: false, 
          elite: true,
          tooltip: 'Access to partner gyms worldwide'
        },
      ]
    },
    {
      category: 'Fitness Classes',
      features: [
        { 
          name: 'Group classes', 
          basic: true, 
          premium: true, 
          elite: true,
          tooltip: 'Access to standard group fitness classes'
        },
        { 
          name: 'Classes per month', 
          basic: '4 classes', 
          premium: '8 classes', 
          elite: 'Unlimited' as any
        },
        { 
          name: 'Premium classes', 
          basic: false, 
          premium: true, 
          elite: true,
          tooltip: 'Access to specialized fitness classes'
        },
        { 
          name: 'Class reservation priority', 
          basic: false, 
          premium: true, 
          elite: true,
          tooltip: 'Book classes earlier than standard members'
        },
      ]
    },
    {
      category: 'Personal Training',
      features: [
        { 
          name: 'Free PT sessions', 
          basic: '1 session', 
          premium: '2 sessions', 
          elite: '4 sessions' as any,
          tooltip: 'Number of free personal training sessions per month'
        },
        { 
          name: 'PT session discount', 
          basic: '0%', 
          premium: '15%', 
          elite: '25%' as any
        },
        { 
          name: 'Fitness assessment', 
          basic: 'Once', 
          premium: 'Quarterly', 
          elite: 'Monthly' as any
        },
        { 
          name: 'Personalized workout plans', 
          basic: false, 
          premium: true, 
          elite: true
        },
      ]
    },
    {
      category: 'Amenities',
      features: [
        { 
          name: 'Locker use', 
          basic: 'Day use', 
          premium: 'Day use', 
          elite: 'Dedicated locker' as any
        },
        { 
          name: 'Towel service', 
          basic: false, 
          premium: true, 
          elite: true 
        },
        { 
          name: 'Sauna access', 
          basic: false, 
          premium: true, 
          elite: true 
        },
        { 
          name: 'Spa facilities', 
          basic: false, 
          premium: false, 
          elite: true 
        },
        { 
          name: 'Juice bar discount', 
          basic: '0%', 
          premium: '10%', 
          elite: '20%' as any 
        },
      ]
    },
    {
      category: 'Digital Features',
      features: [
        { 
          name: 'Mobile app access', 
          basic: true, 
          premium: true, 
          elite: true 
        },
        { 
          name: 'Progress tracking', 
          basic: true, 
          premium: true, 
          elite: true 
        },
        { 
          name: 'Online workout library', 
          basic: 'Limited', 
          premium: 'Full access', 
          elite: 'Full access' as any
        },
        { 
          name: 'Nutrition planning', 
          basic: false, 
          premium: 'Basic', 
          elite: 'Advanced' as any
        },
        { 
          name: 'Health data integration', 
          basic: false, 
          premium: true, 
          elite: true 
        },
      ]
    },
    {
      category: 'Additional Perks',
      features: [
        { 
          name: 'Guest passes', 
          basic: '1/month', 
          premium: '3/month', 
          elite: 'Unlimited' as any
        },
        { 
          name: 'Free parking', 
          basic: false, 
          premium: true, 
          elite: true 
        },
        { 
          name: 'Childcare services', 
          basic: false, 
          premium: 'Discounted', 
          elite: 'Included' as any
        },
        { 
          name: 'Exclusive events', 
          basic: false, 
          premium: false, 
          elite: true 
        },
        { 
          name: 'Member rewards program', 
          basic: false, 
          premium: true, 
          elite: true 
        },
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I cancel my membership?',
      answer: 'You can cancel your membership at any time by logging into your account and going to the membership section. If you cancel before your billing period ends, you will maintain access until that period expires. There are no cancellation fees.'
    },
    {
      question: 'Can I freeze my membership temporarily?',
      answer: 'Yes, you can freeze your membership for up to 3 months per year. During this time, you will not be charged, and your membership will resume automatically after the freeze period ends. This feature is available on all membership tiers.'
    },
    {
      question: 'Are there any signup fees?',
      answer: 'Basic and Premium memberships have a one-time signup fee of $49. This fee is waived for Elite memberships. We occasionally run promotions where the signup fee is waived for all membership tiers.'
    },
    {
      question: 'Can I upgrade my membership later?',
      answer: 'Yes, you can upgrade your membership at any time. The price difference will be prorated for the remaining days in your current billing cycle. Downgrades take effect at the start of your next billing cycle.'
    },
    {
      question: 'Do you offer family memberships?',
      answer: 'Yes, we offer family plans that provide a 15% discount when 2 or more family members join. Family members can have different membership tiers as needed.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and bank transfers. We also support payment through Apple Pay, Google Pay, and PayPal.'
    },
  ];

  const testimonials = [
    {
      name: 'Michael S.',
      role: 'Premium Member',
      content: 'Switching to the Premium plan was worth every penny. The extra classes and personal training sessions have accelerated my fitness journey. Highly recommend!',
      avatar: 'https://i.pravatar.cc/100?img=3',
      rating: 5
    },
    {
      name: 'Sarah L.',
      role: 'Elite Member',
      content: 'The Elite membership has transformed my lifestyle. 24/7 access fits my busy schedule perfectly, and the personalized fitness plans keep me motivated.',
      avatar: 'https://i.pravatar.cc/100?img=5',
      rating: 5
    },
    {
      name: 'David R.',
      role: 'Basic Member',
      content: 'Started with Basic to test the waters and I\'ve been impressed with the value. Great facilities and friendly staff. Considering upgrading soon!',
      avatar: 'https://i.pravatar.cc/100?img=12',
      rating: 4
    }
  ];

  return (
    <div className="py-10 px-4 md:px-6 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-4">Membership Plans</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Find the Perfect Plan for Your Fitness Journey</h1>
        <p className="text-xl text-muted-foreground">
          Choose a membership that fits your lifestyle and goals. All plans include state-of-the-art facilities and expert instructors.
        </p>
        
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === 'annual'}
              onCheckedChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            />
            <span className={`text-sm ${billingCycle === "annual" ? "font-medium" : "text-muted-foreground"}`}>
              Annual
            </span>

            {billingCycle === 'annual' && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                Save up to ${annualSavingsElite}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Basic Plan */}
        <Card className="relative border-border/60">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Essential fitness access for beginners</CardDescription>

            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${basicPrice}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              
              {billingCycle === 'annual' && (
                <p className="text-sm text-muted-foreground mt-1">
                  Billed annually (${(basicPrice * 12).toFixed(2)})
                </p>
              )}
              
              {billingCycle === 'annual' && (
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                  Save ${annualSavingsBasic}/year
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Access to gym facilities</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>4 classes per month</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>1 personal training session</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Mobile app access</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">Extended hours</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-muted-foreground">Multi-location access</span>
              </li>
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button className="w-full" variant="outline">
              Choose Basic
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="relative border-primary/50 shadow-md">
          <div className="absolute top-0 right-0 transform translate-y-[-10px] translate-x-[10px]">
            <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
          </div>
          
          <CardHeader>
            <CardTitle>Premium</CardTitle>
            <CardDescription>Enhanced access for serious fitness enthusiasts</CardDescription>

            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${premiumPrice}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              
              {billingCycle === 'annual' && (
                <p className="text-sm text-muted-foreground mt-1">
                  Billed annually (${(premiumPrice * 12).toFixed(2)})
                </p>
              )}
              
              {billingCycle === 'annual' && (
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                  Save ${annualSavingsPremium}/year
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Everything in Basic, plus:</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Extended hours access</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>8 classes per month</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Multi-location access</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>2 personal training sessions</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Sauna & towel service</span>
              </li>
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button className="w-full">
              Choose Premium
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Elite Plan */}
        <Card className="relative bg-gradient-to-b from-muted/50 to-background border-muted">
          <CardHeader>
            <CardTitle>Elite</CardTitle>
            <CardDescription>Ultimate fitness experience with exclusive perks</CardDescription>

            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${elitePrice}</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              
              {billingCycle === 'annual' && (
                <p className="text-sm text-muted-foreground mt-1">
                  Billed annually (${(elitePrice * 12).toFixed(2)})
                </p>
              )}
              
              {billingCycle === 'annual' && (
                <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                  Save ${annualSavingsElite}/year
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Everything in Premium, plus:</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>24/7 access to all facilities</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Unlimited classes</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Global gym access</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>4 personal training sessions</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Exclusive spa facilities</span>
              </li>
            </ul>
          </CardContent>
          
          <CardFooter>
            <Button className="w-full" variant="secondary">
              Choose Elite
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Feature Comparison */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Full Feature Comparison</h2>
          <p className="text-muted-foreground">See what's included in each membership plan</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-medium text-lg">Features</th>
                <th className="text-center py-4 px-4 font-medium text-lg">Basic</th>
                <th className="text-center py-4 px-4 font-medium text-lg">
                  Premium
                  {recommendedPlan === 'premium' && (
                    <Badge className="ml-2 bg-primary">Recommended</Badge>
                  )}
                </th>
                <th className="text-center py-4 px-4 font-medium text-lg">Elite</th>
              </tr>
            </thead>
            <tbody>
              {planFeatures.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  <tr>
                    <td colSpan={4} className="py-4 px-4 bg-muted/50">
                      <h3 className="font-semibold text-md">{category.category}</h3>
                    </td>
                  </tr>
                  
                  {category.features.map((feature, featureIndex) => (
                    <tr key={featureIndex} className="border-b border-border/60">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span>{feature.name}</span>
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground ml-2" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </td>
                      
                      <td className="py-3 px-4 text-center">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          <span>{feature.basic}</span>
                        )}
                      </td>
                      
                      <td className="py-3 px-4 text-center">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          <span>{feature.premium}</span>
                        )}
                      </td>
                      
                      <td className="py-3 px-4 text-center">
                        {typeof feature.elite === 'boolean' ? (
                          feature.elite ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )
                        ) : (
                          <span>{feature.elite}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Membership Benefits */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Why Choose Our Membership</h2>
          <p className="text-muted-foreground">Enjoy these benefits with any of our membership plans</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Flexible Contracts</h3>
              <p className="text-muted-foreground">No long-term commitments. Choose monthly or annual billing with the ability to cancel anytime.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Extended Hours</h3>
              <p className="text-muted-foreground">Enjoy early morning and late night access to fit your schedule with our Premium and Elite plans.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Trainers</h3>
              <p className="text-muted-foreground">Access to certified personal trainers who will help you achieve your fitness goals safely and effectively.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Payments</h3>
              <p className="text-muted-foreground">Secure and convenient payment options with the ability to update or change your plan online anytime.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">What Our Members Say</h2>
          <p className="text-muted-foreground">Don't just take our word for it</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      className={`w-5 h-5 ${starIndex < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="italic">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* FAQs */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find answers to common questions about our memberships</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-muted rounded-xl p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-lg mb-6">
            Choose the membership that fits your lifestyle and goals. Join today and get started on your path to better fitness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Browse Membership Plans
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Tour
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Have questions? Call us at (123) 456-7890</span>
          </div>
        </div>
      </div>
    </div>
  );
}