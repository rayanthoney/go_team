import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { HomeIcon, PlayCircle, Film, BarChart2, Users, Calendar, Settings } from "lucide-react";

interface SubscriptionTier {
  name: string;
  level: 'free' | 'plus' | 'premium';
}

interface SidebarProps {
  subscription?: SubscriptionTier;
}

export function Sidebar({ subscription = { name: "Free Plan", level: "free" } }: SidebarProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/stream", label: "Live Stream", icon: PlayCircle },
    { href: "/film-room", label: "Film Room", icon: Film },
    { href: "/stats", label: "Stats", icon: BarChart2 },
    { href: "/team", label: "Team", icon: Users },
    { href: "/schedule", label: "Schedule", icon: Calendar },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-neutral-200 bg-white">
      <div className="flex items-center h-16 px-6 border-b border-neutral-200">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center">
            <PlayCircle className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl">GameChanger</span>
        </div>
      </div>
      
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
            >
              <a 
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  location === item.href 
                    ? "bg-[#FF6B00] text-white" 
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                )}
              >
                <item.icon 
                  className={cn(
                    "mr-3 h-5 w-5",
                    location === item.href ? "text-white" : "text-neutral-500"
                  )} 
                />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
        
        <div className="px-4 mt-auto">
          <div className="p-3 bg-neutral-100 rounded-lg">
            <div className="text-xs font-medium text-neutral-500 uppercase">Current plan</div>
            <div className="mt-1 flex justify-between items-center">
              <div className="font-semibold">{subscription.name}</div>
              {subscription.level !== "premium" && (
                <Link href="/subscription">
                  <a className="text-xs font-medium text-[#FF6B00] hover:text-orange-700">
                    Upgrade
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
