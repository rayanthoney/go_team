import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number | null;
  billingPeriod: string;
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
  current?: boolean;
}

interface PlanCardProps {
  plan: SubscriptionPlan;
  onSelectPlan: (planId: string) => void;
}

export function PlanCard({ plan, onSelectPlan }: PlanCardProps) {
  return (
    <div className={`
      rounded-lg border overflow-hidden transition-all
      ${plan.highlighted ? 'border-[#FF6B00] shadow-lg' : 'border-neutral-200'}
      ${plan.current ? 'bg-neutral-50' : 'bg-white'}
    `}>
      {plan.highlighted && (
        <div className="bg-[#FF6B00] text-white py-1 px-4 text-sm text-center font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-neutral-600 mt-1 text-sm">{plan.description}</p>
          </div>
          
          {plan.current && (
            <Badge variant="outline" className="border-green-300 text-green-600 bg-green-50">
              Current Plan
            </Badge>
          )}
        </div>
        
        <div className="mt-5">
          <div className="flex items-end">
            {plan.price === null ? (
              <span className="text-2xl font-bold">Free</span>
            ) : (
              <>
                <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                <span className="text-neutral-500 ml-1">/{plan.billingPeriod}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium text-neutral-500 uppercase">What's included:</h4>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li 
                key={index}
                className={`flex items-start ${feature.included ? 'text-neutral-900' : 'text-neutral-400 line-through'}`}
              >
                <CheckCircle2 
                  className={`h-5 w-5 mr-2 flex-shrink-0 ${
                    feature.included ? 'text-green-500' : 'text-neutral-300'
                  }`} 
                />
                <span className="text-sm">{feature.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8">
          {plan.current ? (
            <Button disabled className="w-full bg-neutral-200 text-neutral-600 hover:bg-neutral-200">
              Current Plan
            </Button>
          ) : (
            <Button 
              className={`w-full ${plan.highlighted ? 'bg-[#FF6B00] hover:bg-orange-700' : ''}`}
              onClick={() => onSelectPlan(plan.id)}
            >
              {plan.price === null ? 'Get Started' : 'Upgrade'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
