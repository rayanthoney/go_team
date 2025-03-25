import { useEffect, useState } from "react";
import { PlayCircle, Film, BarChart2 } from "lucide-react";
import { GameHighlight } from "@/components/dashboard/game-highlight";
import { FeatureCard } from "@/components/dashboard/feature-card";
import { RecentGames } from "@/components/dashboard/recent-games";
import { TeamInfo } from "@/components/dashboard/team-info";

export default function Dashboard() {
  const [upcomingGame, setUpcomingGame] = useState({
    id: "1",
    opponent: "Eastside Lions",
    date: "Saturday, Oct 15",
    time: "7:00 PM",
    location: "home" as const,
    confirmCount: 12,
    totalPlayers: 15
  });

  const [recentGames, setRecentGames] = useState([
    {
      id: "game1",
      opponent: "Eastside Lions",
      date: "Oct 8, 2023",
      result: "W" as const,
      score: "78-65",
      opponentInitials: "EL"
    },
    {
      id: "game2",
      opponent: "South Hoops",
      date: "Oct 1, 2023",
      result: "L" as const,
      score: "62-68",
      opponentInitials: "SH"
    }
  ]);

  const [teamInfo, setTeamInfo] = useState({
    teamName: "Wildcats",
    season: "2023-2024 Season",
    stats: {
      record: "5-2",
      ppg: 72.4,
      oppPpg: 65.1
    },
    players: [
      {
        id: "player1",
        name: "James Davis",
        initials: "JD",
        number: "23",
        position: "Guard",
        status: "available" as const
      },
      {
        id: "player2",
        name: "Mike Thomas",
        initials: "MT",
        number: "11",
        position: "Forward",
        status: "questionable" as const
      },
      {
        id: "player3",
        name: "Kevin Johnson",
        initials: "KJ",
        number: "34",
        position: "Center",
        status: "available" as const
      }
    ]
  });

  useEffect(() => {
    // In real implementation, we would fetch this data from the API
    // For example:
    // const fetchDashboardData = async () => {
    //   try {
    //     const [upcomingGameRes, recentGamesRes, teamInfoRes] = await Promise.all([
    //       fetch('/api/games/upcoming'),
    //       fetch('/api/games/recent'),
    //       fetch('/api/team/info')
    //     ]);
    //     
    //     if (upcomingGameRes.ok) setUpcomingGame(await upcomingGameRes.json());
    //     if (recentGamesRes.ok) setRecentGames(await recentGamesRes.json());
    //     if (teamInfoRes.ok) setTeamInfo(await teamInfoRes.json());
    //   } catch (error) {
    //     console.error("Failed to load dashboard data", error);
    //   }
    // };
    // 
    // fetchDashboardData();
  }, []);

  const features = [
    {
      title: "Live Streaming",
      description: "Broadcast your games live with AutoStream technology that follows the action.",
      icon: PlayCircle,
      iconColor: "#FF6B00",
      iconBgColor: "rgba(255, 107, 0, 0.1)",
      linkText: "Start streaming",
      linkHref: "/stream",
      linkColor: "#FF6B00"
    },
    {
      title: "Film Room",
      description: "Analyze game footage with automatic highlights and tagging features.",
      icon: Film,
      iconColor: "#38B2AC",
      iconBgColor: "rgba(56, 178, 172, 0.1)",
      linkText: "Go to Film Room",
      linkHref: "/film-room",
      linkColor: "#38B2AC"
    },
    {
      title: "Stats & Scoring",
      description: "Track game stats with real-time scorekeeping and detailed analytics.",
      icon: BarChart2,
      iconColor: "#2D3748",
      iconBgColor: "rgba(45, 55, 72, 0.1)",
      linkText: "View Statistics",
      linkHref: "/stats",
      linkColor: "#2D3748"
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome, Coach</h1>
        <p className="text-neutral-600 mt-1">Your Wildcats have an upcoming game this weekend.</p>
      </div>
      
      <GameHighlight game={upcomingGame} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            iconColor={feature.iconColor}
            iconBgColor={feature.iconBgColor}
            linkText={feature.linkText}
            linkHref={feature.linkHref}
            linkColor={feature.linkColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <RecentGames games={recentGames} />
        </div>
        
        <div>
          <TeamInfo 
            teamName={teamInfo.teamName}
            season={teamInfo.season}
            stats={teamInfo.stats}
            players={teamInfo.players}
          />
        </div>
      </div>
    </div>
  );
}
