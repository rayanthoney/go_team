import { Link } from "wouter";
import { Film, BarChart2, Image } from "lucide-react";

interface Game {
  id: string;
  opponent: string;
  date: string;
  result: "W" | "L";
  score: string;
  opponentInitials: string;
}

interface RecentGamesProps {
  games: Game[];
}

export function RecentGames({ games }: RecentGamesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
      <div className="px-5 py-4 border-b border-neutral-200 flex justify-between items-center">
        <h2 className="font-bold text-lg">Recent Games</h2>
        <Link href="/stats/history">
          <a className="text-sm font-medium text-[#FF6B00]">View all</a>
        </Link>
      </div>
      
      <div className="divide-y divide-neutral-100">
        {games.map((game) => (
          <div key={game.id} className="px-5 py-4 hover:bg-neutral-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-neutral-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                  <span className="font-bold text-neutral-600">{game.opponentInitials}</span>
                </div>
                <div>
                  <div className="font-medium">vs. {game.opponent}</div>
                  <div className="text-sm text-neutral-500">{game.date}</div>
                </div>
              </div>
              <div className="text-center">
                <div 
                  className={`font-bold text-lg ${
                    game.result === "W" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {game.result}
                </div>
                <div className="text-sm">{game.score}</div>
              </div>
            </div>
            <div className="mt-3 flex text-xs">
              <Link href={`/film-room/game/${game.id}`}>
                <a className="mr-4 text-[#FF6B00] font-medium flex items-center">
                  <Film className="h-4 w-4 mr-1" />
                  Watch Replay
                </a>
              </Link>
              <Link href={`/stats/game/${game.id}`}>
                <a className="mr-4 text-neutral-600 font-medium flex items-center">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Stats
                </a>
              </Link>
              <Link href={`/film-room/highlights/${game.id}`}>
                <a className="text-neutral-600 font-medium flex items-center">
                  <Image className="h-4 w-4 mr-1" />
                  Highlights
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
