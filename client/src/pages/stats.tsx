import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScoreKeeper } from "@/components/stats/score-keeper";
import { 
  BarChart3, TrendingUp, PieChart, UserCircle2, Tag, ClipboardCheck,
  Download, Printer, Share2, ChevronLeft, ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Stats() {
  const [activeSection, setActiveSection] = useState<"overview" | "scorekeeping" | "player">("overview");
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleSaveGame = () => {
    // In a real implementation, this would save the game data to the backend
    toast({
      title: "Game saved successfully",
      description: "Your game stats have been saved and are available for review.",
    });
    setActiveSection("overview");
  };
  
  const homeTeam = {
    name: "Wildcats",
    players: [
      { id: "p1", name: "James Davis", number: "23", position: "Guard" },
      { id: "p2", name: "Mike Thomas", number: "11", position: "Forward" },
      { id: "p3", name: "Kevin Johnson", number: "34", position: "Center" },
      { id: "p4", name: "Alex Smith", number: "7", position: "Guard" },
      { id: "p5", name: "Tyler Brown", number: "15", position: "Forward" }
    ]
  };
  
  const awayTeam = {
    name: "Eastside Lions"
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {activeSection === "overview" 
              ? "Team Statistics" 
              : activeSection === "scorekeeping"
                ? "Live Scorekeeping"
                : "Player Statistics"}
          </h1>
          <p className="text-neutral-600">
            {activeSection === "overview" 
              ? "Track and analyze your team's performance" 
              : activeSection === "scorekeeping"
                ? "Keep score during the game in real-time"
                : "Detailed stats for individual players"}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          {activeSection === "overview" && (
            <Button 
              className="bg-[#FF6B00] hover:bg-orange-700"
              onClick={() => setActiveSection("scorekeeping")}
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Start Scorekeeping
            </Button>
          )}
          
          {activeSection === "scorekeeping" && (
            <Button 
              variant="outline"
              onClick={() => setActiveSection("overview")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Stats
            </Button>
          )}
          
          {activeSection === "player" && (
            <Button 
              variant="outline"
              onClick={() => setActiveSection("overview")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Team Stats
            </Button>
          )}
        </div>
      </div>
      
      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Record</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5-2</div>
                <p className="text-sm text-neutral-500">Current season</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Points Per Game</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">72.4</div>
                <p className="text-sm text-neutral-500">Team average</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Field Goal %</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">46.2%</div>
                <p className="text-sm text-neutral-500">Season average</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Team Performance</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="charts">
                    <TabsList className="mb-4">
                      <TabsTrigger value="charts">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Charts
                      </TabsTrigger>
                      <TabsTrigger value="trends">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Trends
                      </TabsTrigger>
                      <TabsTrigger value="breakdown">
                        <PieChart className="h-4 w-4 mr-2" />
                        Breakdown
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="charts">
                      <div className="aspect-[2/1] p-6 bg-neutral-50 rounded-md flex items-center justify-center">
                        <div className="text-center text-neutral-500">
                          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-30" />
                          <p>Game performance stats will be displayed here</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="trends">
                      <div className="aspect-[2/1] p-6 bg-neutral-50 rounded-md flex items-center justify-center">
                        <div className="text-center text-neutral-500">
                          <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-30" />
                          <p>Performance trends over time will be displayed here</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="breakdown">
                      <div className="aspect-[2/1] p-6 bg-neutral-50 rounded-md flex items-center justify-center">
                        <div className="text-center text-neutral-500">
                          <PieChart className="h-12 w-12 mx-auto mb-2 opacity-30" />
                          <p>Statistical breakdowns will be displayed here</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Player Stats</CardTitle>
                  <CardDescription>
                    Click on a player to view detailed stats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {homeTeam.players.map(player => (
                      <div 
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-neutral-50 rounded-md cursor-pointer hover:bg-neutral-100"
                        onClick={() => {
                          setSelectedPlayer(player.id);
                          setActiveSection("player");
                        }}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-neutral-200 rounded-full mr-3 flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{player.name}</div>
                            <div className="text-xs text-neutral-500">
                              #{player.number} • {player.position}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Games</CardTitle>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share Stats
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Game</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Result</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">PTS</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">REB</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">AST</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">FG%</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-100">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium">vs. Eastside Lions</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm">Oct 8, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          W 78-65
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">78</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">42</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">21</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">45.2%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm">
                          <Tag className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium">vs. South Hoops</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm">Oct 1, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                          L 62-68
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">62</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">35</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">14</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">38.7%</td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm">
                          <Tag className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeSection === "scorekeeping" && (
        <ScoreKeeper 
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          onSave={handleSaveGame}
        />
      )}
      
      {activeSection === "player" && selectedPlayer && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center mr-4 text-white font-bold">
                  {homeTeam.players.find(p => p.id === selectedPlayer)?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {homeTeam.players.find(p => p.id === selectedPlayer)?.name}
                  </CardTitle>
                  <CardDescription>
                    #{homeTeam.players.find(p => p.id === selectedPlayer)?.number} • {homeTeam.players.find(p => p.id === selectedPlayer)?.position}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-neutral-50 p-4 rounded-lg text-center">
                  <div className="text-neutral-500 text-sm mb-1">PPG</div>
                  <div className="text-2xl font-bold">12.5</div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg text-center">
                  <div className="text-neutral-500 text-sm mb-1">RPG</div>
                  <div className="text-2xl font-bold">6.2</div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg text-center">
                  <div className="text-neutral-500 text-sm mb-1">APG</div>
                  <div className="text-2xl font-bold">3.8</div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg text-center">
                  <div className="text-neutral-500 text-sm mb-1">FG%</div>
                  <div className="text-2xl font-bold">44.3%</div>
                </div>
              </div>
              
              <div className="aspect-[2/1] p-6 bg-neutral-50 rounded-md flex items-center justify-center mb-6">
                <div className="text-center text-neutral-500">
                  <UserCircle2 className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>Player performance charts will be displayed here</p>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="bg-neutral-50 px-4 py-3 border-b">
                  <h3 className="font-semibold">Game-by-Game Stats</h3>
                </div>
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Game</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">PTS</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">REB</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">AST</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">STL</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">BLK</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">FG</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">3PT</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-100">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">vs. Eastside Lions</div>
                        <div className="text-xs text-neutral-500">Oct 8, 2023</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center font-semibold">14</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">8</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">5</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">2</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">6-12</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">2-5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium">vs. South Hoops</div>
                        <div className="text-xs text-neutral-500">Oct 1, 2023</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center font-semibold">11</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">5</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">3</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">1</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">0</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">4-10</td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">1-4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
