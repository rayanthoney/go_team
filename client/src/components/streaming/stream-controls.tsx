import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Play, Pause, ChevronUp, ChevronDown, Users, Share2, 
  BarChart2, MessageSquare, Mic, MicOff, Video, VideoOff 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StreamControlsProps {
  isStreaming: boolean;
  viewerCount: number;
  onToggleStream: () => void;
  onShareStream: () => void;
  onToggleScoreboard: () => void;
  onToggleChat: () => void;
  onToggleStats: () => void;
}

export function StreamControls({
  isStreaming,
  viewerCount,
  onToggleStream,
  onShareStream,
  onToggleScoreboard,
  onToggleChat,
  onToggleStats,
}: StreamControlsProps) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const handleMicToggle = () => {
    setIsMicMuted(!isMicMuted);
  };

  const handleCameraToggle = () => {
    setIsCameraOff(!isCameraOff);
  };

  const incrementScoreA = () => {
    setScoreA(scoreA + 1);
  };

  const decrementScoreA = () => {
    if (scoreA > 0) setScoreA(scoreA - 1);
  };

  const incrementScoreB = () => {
    setScoreB(scoreB + 1);
  };

  const decrementScoreB = () => {
    if (scoreB > 0) setScoreB(scoreB - 1);
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                size="lg"
                variant={isStreaming ? "destructive" : "default"}
                className={isStreaming ? "bg-red-600 hover:bg-red-700" : "bg-[#FF6B00] hover:bg-orange-700"}
                onClick={onToggleStream}
              >
                {isStreaming ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    End Stream
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Start Stream
                  </>
                )}
              </Button>
              
              {isStreaming && (
                <div className="flex items-center space-x-2 ml-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleMicToggle}
                    className={isMicMuted ? "bg-red-100 border-red-200" : ""}
                  >
                    {isMicMuted ? <MicOff className="h-5 w-5 text-red-500" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleCameraToggle}
                    className={isCameraOff ? "bg-red-100 border-red-200" : ""}
                  >
                    {isCameraOff ? <VideoOff className="h-5 w-5 text-red-500" /> : <Video className="h-5 w-5" />}
                  </Button>
                </div>
              )}
            </div>
            
            {isStreaming && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-1 text-neutral-500" />
                  <span>{viewerCount} viewers</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onShareStream}>
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {isStreaming && (
        <>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2">Quick Scoreboard</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-center">
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" onClick={decrementScoreA}>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <span className="font-bold text-xl mx-1">{scoreA}</span>
                      <Button variant="ghost" size="sm" onClick={incrementScoreA}>
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-xs">Home</span>
                  </div>
                  
                  <span className="text-2xl font-bold mx-2">-</span>
                  
                  <div className="text-center">
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" onClick={decrementScoreB}>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <span className="font-bold text-xl mx-1">{scoreB}</span>
                      <Button variant="ghost" size="sm" onClick={incrementScoreB}>
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-xs">Away</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onToggleScoreboard}
                  >
                    Show on Stream
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onToggleStats}
                  >
                    <BarChart2 className="h-4 w-4 mr-1" />
                    Stats
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onToggleChat}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2">Stream Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Video Quality</span>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none">
                    <option>Auto (Recommended)</option>
                    <option>720p</option>
                    <option>480p</option>
                    <option>360p</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Audience</span>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none">
                    <option>Public</option>
                    <option>Team Only</option>
                    <option>Private (Invite Only)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AutoStream</span>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none">
                    <option>Enable</option>
                    <option>Disable</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
