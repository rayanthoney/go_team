import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { HomeIcon, PlayCircle, Film, BarChart2, Users } from "lucide-react";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function MobileHeader() {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white border-b border-neutral-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center">
              <PlayCircle className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">ReadyRoster</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-neutral-100"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
          </button>

          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-neutral-300 text-sm">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/stream", label: "Stream", icon: PlayCircle },
    { href: "/film-room", label: "Film", icon: Film },
    { href: "/stats", label: "Stats", icon: BarChart2 },
    { href: "/team", label: "Team", icon: Users },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-40">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex flex-col items-center justify-center",
                location === item.href ? "text-[#FF6B00]" : "text-neutral-500"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
