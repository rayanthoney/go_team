import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, Pause, SkipForward, SkipBack, Tag, Star, Download, 
  Camera, User, PlusCircle, Trash2, CheckCircle, Share2
} from "lucide-react";

interface Highlight {
  id: string;
  timestamp: number;
  title: string;
  type: "score" | "assist" | "rebound" | "block" | "steal" | "custom";
  player?: string;
}

interface VideoTaggerProps {
  videoSrc: string;
  videoTitle: string;
  duration: number;
}

export function VideoTagger({ videoSrc, videoTitle, duration }: VideoTaggerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [newHighlightTitle, setNewHighlightTitle] = useState("");
  const [newHighlightType, setNewHighlightType] = useState<Highlight["type"]>("score");
  const [newHighlightPlayer, setNewHighlightPlayer] = useState("");
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const jumpTo = (time: number) => {
    setCurrentTime(time);
  };
  
  const skipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };
  
  const skipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };
  
  const addHighlight = () => {
    if (!newHighlightTitle) return;
    
    const newHighlight: Highlight = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: currentTime,
      title: newHighlightTitle,
      type: newHighlightType,
      player: newHighlightPlayer || undefined
    };
    
    setHighlights([...highlights, newHighlight]);
    setNewHighlightTitle("");
    setNewHighlightType("score");
    setNewHighlightPlayer("");
  };
  
  const removeHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };
  
  const getHighlightIcon = (type: Highlight["type"]) => {
    switch (type) {
      case "score":
        return <Star className="h-4 w-4 text-yellow-500" />;
      case "assist":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "rebound":
        return <SkipBack className="h-4 w-4 text-purple-500" />;
      case "block":
        return <Trash2 className="h-4 w-4 text-red-500" />;
      case "steal":
        return <Camera className="h-4 w-4 text-green-500" />;
      default:
        return <Tag className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">{videoTitle}</h2>
              <div className="text-sm text-neutral-500">
                Total Duration: {formatTime(duration)}
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video mb-4">
              {/* This would be replaced with an actual video player component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm">Video Player at {formatTime(currentTime)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={skipBackward}>
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button onClick={handlePlayPause} className="bg-[#FF6B00] hover:bg-orange-700">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="icon" onClick={skipForward}>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="w-full bg-neutral-100 rounded-full h-2 mb-4">
              <div 
                className="bg-[#FF6B00] h-2 rounded-full" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            
            {/* Interactive timeline with highlights */}
            <div className="relative w-full h-8">
              <div className="absolute top-0 left-0 right-0 h-4 bg-neutral-100 rounded-full">
                {highlights.map((highlight) => (
                  <button
                    key={highlight.id}
                    className="absolute top-0 w-4 h-4 -mt-1 rounded-full bg-[#FF6B00] hover:bg-orange-700 border-2 border-white"
                    style={{ left: `${(highlight.timestamp / duration) * 100}%` }}
                    onClick={() => jumpTo(highlight.timestamp)}
                    title={highlight.title}
                  ></button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Tabs defaultValue="highlights">
          <TabsList className="w-full">
            <TabsTrigger value="highlights" className="flex-1">Highlights</TabsTrigger>
            <TabsTrigger value="tag" className="flex-1">Tag Play</TabsTrigger>
          </TabsList>
          
          <TabsContent value="highlights">
            <Card>
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-neutral-500 uppercase">
                    {highlights.length} Highlights
                  </h3>
                </div>
                
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {highlights.length > 0 ? (
                    highlights.map((highlight) => (
                      <div
                        key={highlight.id}
                        className="flex items-center justify-between p-2 border border-neutral-200 rounded-md hover:bg-neutral-50"
                      >
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => jumpTo(highlight.timestamp)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <div>
                            <div className="font-medium text-sm">{highlight.title}</div>
                            <div className="flex items-center text-xs text-neutral-500">
                              {getHighlightIcon(highlight.type)}
                              <span className="ml-1">{highlight.type}</span>
                              {highlight.player && (
                                <>
                                  <span className="mx-1">•</span>
                                  <User className="h-3 w-3 mr-1" />
                                  <span>{highlight.player}</span>
                                </>
                              )}
                              <span className="mx-1">•</span>
                              <span>{formatTime(highlight.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-red-100 hover:text-red-500"
                          onClick={() => removeHighlight(highlight.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-neutral-500">
                      <Tag className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p>No highlights added yet.</p>
                      <p className="text-sm">Tag important moments as you watch.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tag">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-4">Tag New Highlight</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-input px-3 py-2"
                      placeholder="e.g., Amazing three-pointer"
                      value={newHighlightTitle}
                      onChange={(e) => setNewHighlightTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <select
                      className="w-full rounded-md border border-input px-3 py-2"
                      value={newHighlightType}
                      onChange={(e) => setNewHighlightType(e.target.value as Highlight["type"])}
                    >
                      <option value="score">Score</option>
                      <option value="assist">Assist</option>
                      <option value="rebound">Rebound</option>
                      <option value="block">Block</option>
                      <option value="steal">Steal</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Player (Optional)</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-input px-3 py-2"
                      placeholder="Player name"
                      value={newHighlightPlayer}
                      onChange={(e) => setNewHighlightPlayer(e.target.value)}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      className="w-full bg-[#FF6B00] hover:bg-orange-700"
                      onClick={addHighlight}
                      disabled={!newHighlightTitle}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Highlight at {formatTime(currentTime)}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
