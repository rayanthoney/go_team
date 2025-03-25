import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Player {
  id: string;
  name: string;
  initials: string;
  number: string;
  position: string;
  status: "available" | "questionable" | "out";
}

interface TeamStats {
  record: string;
  ppg: number;
  oppPpg: number;
}

interface TeamInfoProps {
  teamName: string;
  season: string;
  stats: TeamStats;
  players: Player[];
}

export function TeamInfo({ teamName, season, stats, players }: TeamInfoProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-500";
      case "questionable":
        return "bg-yellow-500/20 text-yellow-500";
      case "out":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-neutral-200 text-neutral-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "questionable":
        return "Questionable";
      case "out":
        return "Out";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
      <div className="px-5 py-4 border-b border-neutral-200 flex justify-between items-center">
        <h2 className="font-bold text-lg">Team Information</h2>
        <Link href="/team/manage">
          <a className="text-sm font-medium text-[#FF6B00]">Manage</a>
        </Link>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center mr-4">
            <span className="text-white font-bold">{teamName.charAt(0)}</span>
          </div>
          <div>
            <div className="font-bold text-lg">{teamName}</div>
            <div className="text-sm text-neutral-500">{season}</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-neutral-500 uppercase mb-3">Season Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-neutral-50 rounded-lg py-3">
              <div className="text-2xl font-bold">{stats.record}</div>
              <div className="text-xs text-neutral-500 mt-1">Record</div>
            </div>
            <div className="bg-neutral-50 rounded-lg py-3">
              <div className="text-2xl font-bold">{stats.ppg.toFixed(1)}</div>
              <div className="text-xs text-neutral-500 mt-1">PPG</div>
            </div>
            <div className="bg-neutral-50 rounded-lg py-3">
              <div className="text-2xl font-bold">{stats.oppPpg.toFixed(1)}</div>
              <div className="text-xs text-neutral-500 mt-1">OPP PPG</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium text-neutral-500 uppercase mb-3">Team Roster</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {players.map((player) => (
              <div 
                key={player.id} 
                className="flex items-center justify-between px-3 py-2 bg-neutral-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-neutral-200 text-xs font-medium">
                      {player.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{player.name}</div>
                    <div className="text-xs text-neutral-500">
                      #{player.number} • {player.position}
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(player.status)}`}>
                    {getStatusText(player.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/team">
            <Button variant="outline" className="w-full mt-3 text-sm">
              View All Players
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
