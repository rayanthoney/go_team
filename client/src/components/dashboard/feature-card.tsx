import { Link } from "wouter";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  linkText: string;
  linkHref: string;
  linkColor: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  linkText,
  linkHref,
  linkColor,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
      <div className="p-5">
        <div 
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
          style={{ backgroundColor: iconBgColor }}
        >
          <Icon className={`h-6 w-6`} style={{ color: iconColor }} />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-neutral-600 text-sm mb-4">{description}</p>
        <Link href={linkHref}>
          <a className={`font-medium text-sm inline-flex items-center`} style={{ color: linkColor }}>
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
}
