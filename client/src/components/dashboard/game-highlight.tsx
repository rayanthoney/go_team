import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

interface Game {
  id: string;
  opponent: string;
  date: string;
  time: string;
  location: "home" | "away";
  confirmCount: number;
  totalPlayers: number;
}

interface GameHighlightProps {
  game: Game;
}

export function GameHighlight({ game }: GameHighlightProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-neutral-200">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Next Game</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
            {game.location === "home" ? "Home" : "Away"}
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold">{game.opponent}</div>
              <div className="text-neutral-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{game.date}</span> • 
                <Clock className="h-4 w-4 mx-1" />
                <span>{game.time}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Link href="/stream">
              <Button className="w-full sm:w-auto bg-[#FF6B00] hover:bg-orange-700">
                <PlayCircleIcon className="h-5 w-5 mr-2" />
                Stream Game
              </Button>
            </Link>
            <Link href={`/schedule/${game.id}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                <Calendar className="h-5 w-5 mr-2" />
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-neutral-50 px-5 py-3 border-t border-neutral-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-neutral-500">
            <span className="font-medium">{game.confirmCount}</span> of <span>{game.totalPlayers}</span> players confirmed
          </div>
          <Link href={`/team/rsvp/${game.id}`}>
            <a className="text-sm font-medium text-[#FF6B00] hover:text-orange-700">
              Check RSVPs
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PlayCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}
