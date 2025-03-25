import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Package, PlayCircle, BarChart2, Film, Calendar, Users } from "lucide-react";
import { PlanCard, SubscriptionPlan } from "@/components/subscription/plan-card";
import { useToast } from "@/hooks/use-toast";

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">("yearly");
  const { toast } = useToast();
  
  const handleSelectPlan = (planId: string) => {
    // In a real implementation, this would open a payment flow
    toast({
      title: "Subscription selected",
      description: `You've selected the ${planId} plan. Let's set up your payment.`,
    });
  };

  const plans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Free Plan",
      price: null,
      billingPeriod: "",
      description: "Basic features for all users",
      features: [
        { name: "Live streaming", included: true },
        { name: "Team scheduling", included: true },
        { name: "Team messaging", included: true },
        { name: "Basic statistics", included: true },
        { name: "Box scores", included: false },
        { name: "Live play-by-plays", included: false },
        { name: "Full event videos", included: false },
        { name: "Highlight clipping", included: false },
        { name: "Season stats", included: false },
        { name: "Athlete profiles", included: false }
      ],
      current: true
    },
    {
      id: "plus",
      name: "Plus Plan",
      price: billingCycle === "yearly" ? 29.99 : 3.99,
      billingPeriod: billingCycle === "yearly" ? "year" : "month",
      description: "Essential tools for serious teams",
      features: [
        { name: "Live streaming", included: true },
        { name: "Team scheduling", included: true },
        { name: "Team messaging", included: true },
        { name: "Basic statistics", included: true },
        { name: "Box scores", included: true },
        { name: "Live play-by-plays", included: true },
        { name: "Game recap stories", included: true },
        { name: "Live game alerts", included: true },
        { name: "Full event videos", included: false },
        { name: "Highlight clipping", included: false },
        { name: "Season stats", included: false },
        { name: "Athlete profiles", included: false }
      ],
      highlighted: true
    },
    {
      id: "premium",
      name: "Premium Plan",
      price: billingCycle === "yearly" ? 89.99 : 9.99,
      billingPeriod: billingCycle === "yearly" ? "year" : "month",
      description: "Complete suite for advanced teams",
      features: [
        { name: "Live streaming", included: true },
        { name: "Team scheduling", included: true },
        { name: "Team messaging", included: true },
        { name: "Basic statistics", included: true },
        { name: "Box scores", included: true },
        { name: "Live play-by-plays", included: true },
        { name: "Game recap stories", included: true },
        { name: "Live game alerts", included: true },
        { name: "Full event videos", included: true },
        { name: "Highlight clipping", included: true },
        { name: "Season stats", included: true },
        { name: "Spray charts", included: true },
        { name: "Shareable athlete profiles", included: true }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Elevate Your Game</h1>
          <p className="text-xl text-neutral-600 mb-6">
            Choose the plan that fits your team's needs
          </p>
          
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-l-lg ${
                billingCycle === "monthly" 
                  ? "bg-[#FF6B00] text-white" 
                  : "bg-neutral-100 text-neutral-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-r-lg ${
                billingCycle === "yearly" 
                  ? "bg-[#FF6B00] text-white" 
                  : "bg-neutral-100 text-neutral-700"
              }`}
            >
              Yearly
              <span className="ml-1 text-xs font-medium">
                {billingCycle === "yearly" ? "(Save 17%)" : "(Save 17%)"}
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelectPlan={handleSelectPlan}
            />
          ))}
        </div>
        
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Compare Plans</CardTitle>
            <CardDescription>
              See a detailed comparison of all available plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">Feature</th>
                    <th className="py-3 text-center font-medium">Free</th>
                    <th className="py-3 text-center font-medium">Plus</th>
                    <th className="py-3 text-center font-medium">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Live Streaming</td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Box Scores</td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Live Play-by-Plays</td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Game Recap Stories</td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Full Event Videos</td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Highlight Clipping</td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Season Stats</td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Team Management</td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Team Messaging</td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Athlete Profiles</td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-neutral-300">—</span>
                    </td>
                    <td className="py-3 text-center">
                      <Check className="h-5 w-5 mx-auto text-green-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Can I cancel my subscription at any time?</h3>
                <p className="text-sm text-neutral-600">
                  Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to your plan's features until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">How do I change my subscription plan?</h3>
                <p className="text-sm text-neutral-600">
                  You can upgrade or downgrade your plan at any time from your account settings. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Is there a limit to how many games I can stream?</h3>
                <p className="text-sm text-neutral-600">
                  No, there is no limit to the number of games you can stream on any plan. Stream as many games as you'd like!
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">How many team members can I add?</h3>
                <p className="text-sm text-neutral-600">
                  All plans allow you to add unlimited team members, including players, coaches, and staff.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center">
                      <PlayCircle className="h-5 w-5 text-[#FF6B00]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Enhanced Live Streaming</h3>
                    <p className="text-sm text-neutral-600">
                      Broadcast games with AutoStream technology that automatically follows the action on iOS devices.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Film className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Advanced Game Analysis</h3>
                    <p className="text-sm text-neutral-600">
                      Review game footage with automatic highlight clips for scoring plays, assists, blocks, steals, and rebounds.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <BarChart2 className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Comprehensive Statistics</h3>
                    <p className="text-sm text-neutral-600">
                      Track detailed player and team statistics with real-time scoring and automatic statistical compilations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Team Management</h3>
                    <p className="text-sm text-neutral-600">
                      Organize your team with scheduling, messaging, and RSVP features for games and practices.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-[#FF6B00] bg-[#FF6B00]/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-bold mb-1">Ready to elevate your team's game?</h3>
                <p className="text-neutral-600">
                  Get started with GameChanger today and transform how you coach, play, and experience basketball.
                </p>
              </div>
              <Button className="bg-[#FF6B00] hover:bg-orange-700">
                <Package className="mr-2 h-4 w-4" />
                Choose a Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
