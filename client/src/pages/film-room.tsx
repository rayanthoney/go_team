import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VideoTagger } from "@/components/film-room/video-tagger";
import { Film, Clock, Calendar, ArrowUpRight } from "lucide-react";

export default function FilmRoom() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  
  const games = [
    {
      id: "game1",
      opponent: "Eastside Lions",
      date: "Oct 8, 2023",
      result: "W",
      score: "78-65",
      duration: 4860, // In seconds (1 hour 21 minutes)
      thumbnailBg: "bg-blue-100"
    },
    {
      id: "game2",
      opponent: "South Hoops",
      date: "Oct 1, 2023",
      result: "L",
      score: "62-68",
      duration: 5100, // In seconds (1 hour 25 minutes)
      thumbnailBg: "bg-purple-100"
    },
    {
      id: "game3",
      opponent: "West Valley",
      date: "Sep 24, 2023",
      result: "W",
      score: "71-63",
      duration: 4740, // In seconds (1 hour 19 minutes)
      thumbnailBg: "bg-green-100"
    }
  ];
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Film Room</h1>
          <p className="text-neutral-600">Review and analyze your team's performances</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button>
            <Film className="mr-2 h-4 w-4" />
            Import Game Film
          </Button>
        </div>
      </div>
      
      {selectedGame ? (
        <div>
          <div className="mb-4 flex items-center">
            <Button variant="outline" onClick={() => setSelectedGame(null)} className="mr-2">
              Back to Games
            </Button>
            <h2 className="text-xl font-semibold">
              Game vs. {games.find(g => g.id === selectedGame)?.opponent}
            </h2>
          </div>
          
          <VideoTagger 
            videoSrc="/game-video.mp4"
            videoTitle={`Wildcats vs. ${games.find(g => g.id === selectedGame)?.opponent}`}
            duration={games.find(g => g.id === selectedGame)?.duration || 0}
          />
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Games</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="breakdowns">Breakdowns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <Card key={game.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div 
                    className={`aspect-video flex items-center justify-center relative ${game.thumbnailBg}`}
                  >
                    <Film className="h-12 w-12 text-neutral-600 opacity-50" />
                    <Button 
                      className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/50 hover:bg-black/70 text-white transition-opacity"
                      variant="ghost"
                      onClick={() => setSelectedGame(game.id)}
                    >
                      <ArrowUpRight className="mr-2 h-5 w-5" />
                      View Film
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">vs. {game.opponent}</h3>
                        <div className="flex items-center text-sm text-neutral-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{game.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatDuration(game.duration)}</span>
                        </div>
                      </div>
                      
                      <div className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        game.result === 'W' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {game.result}: {game.score}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedGame(game.id)}
                      >
                        Full Game
                      </Button>
                      <Button size="sm" className="bg-[#FF6B00] hover:bg-orange-700">
                        Highlights
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="highlights">
            <Card>
              <CardHeader>
                <CardTitle>Game Highlights</CardTitle>
                <CardDescription>
                  Quick access to the best moments from each game
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-12 text-center text-neutral-500 border border-dashed rounded-lg">
                  <Film className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="text-lg font-medium mb-2">No highlights yet</p>
                  <p className="text-sm">
                    Select a game from the "All Games" tab to create highlights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="breakdowns">
            <Card>
              <CardHeader>
                <CardTitle>Game Breakdowns</CardTitle>
                <CardDescription>
                  Detailed analysis and coaching breakdowns of your games
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-12 text-center text-neutral-500 border border-dashed rounded-lg">
                  <Film className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="text-lg font-medium mb-2">No breakdowns yet</p>
                  <p className="text-sm">
                    Watch and analyze a game to start creating breakdowns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
