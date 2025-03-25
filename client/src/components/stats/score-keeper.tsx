import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Minus, PlusCircle, ChevronUp, ChevronDown, RotateCcw,
  Clock, UserPlus, Play, Pause, RefreshCw, Save
} from "lucide-react";

interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
}

interface PlayerStats {
  playerId: string;
  points: number;
  rebounds: number;
  assists: number;
  blocks: number;
  steals: number;
  fouls: number;
  minutes: number;
}

interface TeamStats {
  homeScore: number;
  awayScore: number;
  quarter: number;
  timeRemaining: string;
  fouls: number;
  timeouts: number;
}

interface ScoreKeeperProps {
  homeTeam: {
    name: string;
    players: Player[];
  };
  awayTeam: {
    name: string;
  };
  onSave: () => void;
}

export function ScoreKeeper({ homeTeam, awayTeam, onSave }: ScoreKeeperProps) {
  const [teamStats, setTeamStats] = useState<TeamStats>({
    homeScore: 0,
    awayScore: 0,
    quarter: 1,
    timeRemaining: "10:00",
    fouls: 0,
    timeouts: 5
  });
  
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>(
    homeTeam.players.map(player => ({
      playerId: player.id,
      points: 0,
      rebounds: 0,
      assists: 0,
      blocks: 0,
      steals: 0,
      fouls: 0,
      minutes: 0
    }))
  );
  
  const [clockRunning, setClockRunning] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  
  const updateTeamStat = (key: keyof TeamStats, value: number | string) => {
    setTeamStats(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const updatePlayerStat = (playerId: string, stat: keyof PlayerStats, change: number) => {
    setPlayerStats(prev => 
      prev.map(p => 
        p.playerId === playerId 
          ? { ...p, [stat]: Math.max(0, p[stat] + change) }
          : p
      )
    );
    
    // If updating points, also update team score
    if (stat === 'points' && change > 0) {
      updateTeamStat('homeScore', teamStats.homeScore + change);
      setLastAction(`${homeTeam.players.find(p => p.id === playerId)?.name} scored ${change} points`);
    }
  };
  
  const incrementQuarter = () => {
    if (teamStats.quarter < 4) {
      updateTeamStat('quarter', teamStats.quarter + 1);
      updateTeamStat('timeRemaining', "10:00");
    }
  };
  
  const decrementQuarter = () => {
    if (teamStats.quarter > 1) {
      updateTeamStat('quarter', teamStats.quarter - 1);
    }
  };
  
  const toggleClock = () => {
    setClockRunning(!clockRunning);
  };
  
  const resetClock = () => {
    updateTeamStat('timeRemaining', "10:00");
  };
  
  const undoLastAction = () => {
    // This would be more complex in a real app
    // For now, just clear the last action message
    setLastAction(null);
  };
  
  const getPlayerById = (id: string) => {
    return homeTeam.players.find(p => p.id === id);
  };
  
  const getPlayerStats = (id: string) => {
    return playerStats.find(p => p.playerId === id) || {
      playerId: id,
      points: 0,
      rebounds: 0,
      assists: 0,
      blocks: 0,
      steals: 0,
      fouls: 0,
      minutes: 0
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <Card>
          <CardHeader>
            <CardTitle>Live Scorekeeping</CardTitle>
            <CardDescription>
              Track scores, stats, and plays in real-time
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-6 p-4 bg-neutral-50 rounded-lg">
              <div className="text-center">
                <div className="text-sm font-medium mb-1">{homeTeam.name}</div>
                <div className="text-4xl font-bold">{teamStats.homeScore}</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-2 mb-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={decrementQuarter}
                    disabled={teamStats.quarter <= 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">Q{teamStats.quarter}</div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={incrementQuarter}
                    disabled={teamStats.quarter >= 4}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-neutral-500" />
                  <div className="text-xl font-medium">{teamStats.timeRemaining}</div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={toggleClock}
                    >
                      {clockRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={resetClock}
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium mb-1">{awayTeam.name}</div>
                <div className="text-4xl font-bold">{teamStats.awayScore}</div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button 
                  className="justify-start"
                  onClick={() => updateTeamStat('homeScore', teamStats.homeScore + 2)}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  2 pts (Home)
                </Button>
                <Button 
                  className="justify-start"
                  onClick={() => updateTeamStat('homeScore', teamStats.homeScore + 3)}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  3 pts (Home)
                </Button>
                <Button 
                  className="justify-start"
                  onClick={() => updateTeamStat('awayScore', teamStats.awayScore + 2)}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  2 pts (Away)
                </Button>
                <Button 
                  className="justify-start"
                  onClick={() => updateTeamStat('awayScore', teamStats.awayScore + 3)}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  3 pts (Away)
                </Button>
              </div>
            </div>
            
            {lastAction && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">Last action:</span> {lastAction}
                </div>
                <Button variant="ghost" size="sm" onClick={undoLastAction}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Undo
                </Button>
              </div>
            )}
            
            <Tabs defaultValue="roster">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="roster" className="flex-1">Roster & Stats</TabsTrigger>
                <TabsTrigger value="plays" className="flex-1">Recent Plays</TabsTrigger>
              </TabsList>
              
              <TabsContent value="roster">
                <div className="rounded-md border overflow-hidden">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Player</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">PTS</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">REB</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">AST</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">BLK</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">STL</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">PF</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-100">
                      {homeTeam.players.map((player) => {
                        const stats = getPlayerStats(player.id);
                        return (
                          <tr key={player.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium">
                                  {player.name}
                                </div>
                                <div className="ml-2 text-xs text-neutral-500">
                                  #{player.number}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'points', -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium">{stats.points}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'points', 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'rebounds', -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium">{stats.rebounds}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'rebounds', 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'assists', -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium">{stats.assists}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'assists', 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'blocks', -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium">{stats.blocks}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'blocks', 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'steals', -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium">{stats.steals}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'steals', 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'fouls', -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium">{stats.fouls}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updatePlayerStat(player.id, 'fouls', 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end space-x-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updatePlayerStat(player.id, 'points', 2)}
                                >
                                  +2
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updatePlayerStat(player.id, 'points', 3)}
                                >
                                  +3
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <Button className="mt-4" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Player
                </Button>
              </TabsContent>
              
              <TabsContent value="plays">
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <p className="text-neutral-500">Play-by-play will appear here during the game</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={onSave} className="bg-[#FF6B00] hover:bg-orange-700">
              <Save className="h-4 w-4 mr-2" />
              Save Game
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="lg:col-span-4">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  className="h-auto py-4 flex flex-col items-center"
                  onClick={() => updateTeamStat('homeScore', teamStats.homeScore + 1)}
                >
                  <span className="mb-1">Free Throw</span>
                  <span className="text-xs">+1 pt (Home)</span>
                </Button>
                <Button 
                  className="h-auto py-4 flex flex-col items-center"
                  onClick={() => updateTeamStat('awayScore', teamStats.awayScore + 1)}
                >
                  <span className="mb-1">Free Throw</span>
                  <span className="text-xs">+1 pt (Away)</span>
                </Button>
                <Button 
                  className="h-auto py-4 flex flex-col items-center bg-blue-600 hover:bg-blue-700"
                  onClick={() => updateTeamStat('homeScore', teamStats.homeScore + 2)}
                >
                  <span className="mb-1">2-Pointer</span>
                  <span className="text-xs">+2 pts (Home)</span>
                </Button>
                <Button 
                  className="h-auto py-4 flex flex-col items-center bg-blue-600 hover:bg-blue-700"
                  onClick={() => updateTeamStat('awayScore', teamStats.awayScore + 2)}
                >
                  <span className="mb-1">2-Pointer</span>
                  <span className="text-xs">+2 pts (Away)</span>
                </Button>
                <Button 
                  className="h-auto py-4 flex flex-col items-center bg-purple-600 hover:bg-purple-700"
                  onClick={() => updateTeamStat('homeScore', teamStats.homeScore + 3)}
                >
                  <span className="mb-1">3-Pointer</span>
                  <span className="text-xs">+3 pts (Home)</span>
                </Button>
                <Button 
                  className="h-auto py-4 flex flex-col items-center bg-purple-600 hover:bg-purple-700"
                  onClick={() => updateTeamStat('awayScore', teamStats.awayScore + 3)}
                >
                  <span className="mb-1">3-Pointer</span>
                  <span className="text-xs">+3 pts (Away)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team Fouls & Timeouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Team Fouls</span>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateTeamStat('fouls', Math.max(0, teamStats.fouls - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-bold text-lg">{teamStats.fouls}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateTeamStat('fouls', teamStats.fouls + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        teamStats.fouls >= 5 ? 'bg-red-500' : 'bg-[#FF6B00]'
                      }`}
                      style={{ width: `${Math.min(100, (teamStats.fouls / 5) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Timeouts Remaining</span>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateTeamStat('timeouts', Math.max(0, teamStats.timeouts - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-bold text-lg">{teamStats.timeouts}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateTeamStat('timeouts', Math.min(5, teamStats.timeouts + 1))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`flex-1 h-2 rounded-full ${
                          i < teamStats.timeouts ? 'bg-green-500' : 'bg-neutral-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Advanced Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Custom Play</span>
                  <Button size="sm">Add</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Manual Clock Adjust</span>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Possession Arrow</span>
                  <Button size="sm" variant="outline">Toggle</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
