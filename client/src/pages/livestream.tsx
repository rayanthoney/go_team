import { useState } from "react";
import { VideoPlayer } from "@/components/ui/video-player";
import { StreamControls } from "@/components/streaming/stream-controls";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Settings } from "lucide-react";

export default function LiveStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  const handleToggleStream = () => {
    setIsStreaming(!isStreaming);
    if (!isStreaming) {
      // In a real implementation, this would initiate the stream
      setViewerCount(0);
      // Simulate viewers joining
      const viewerInterval = setInterval(() => {
        setViewerCount((prev) => {
          const newCount = prev + Math.floor(Math.random() * 3);
          return newCount > 20 ? Math.floor(Math.random() * 5) + 18 : newCount;
        });
      }, 5000);

      return () => clearInterval(viewerInterval);
    }
  };

  const handleShareStream = () => {
    navigator.clipboard.writeText("https://ReadyRoster.com/stream/live-1234");
    // In real implementation, we would show a toast message
  };

  const handleToggleScoreboard = () => {
    setShowScoreboard(!showScoreboard);
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  const handleToggleStats = () => {
    setShowStats(!showStats);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Live Streaming</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>
                {isStreaming ? "Live Broadcast" : "Stream Preview"}
              </CardTitle>
              <CardDescription>
                {isStreaming
                  ? "Your game is currently being streamed live"
                  : "Set up your camera angle and start streaming when ready"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-md bg-black relative">
                <VideoPlayer
                  src={isStreaming ? "/stream.mp4" : undefined}
                  isLive={isStreaming}
                  title={
                    isStreaming ? "Wildcats vs. Eastside Lions" : undefined
                  }
                />

                {showScoreboard && isStreaming && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-xs">HOME</div>
                        <div className="text-2xl font-bold">68</div>
                      </div>
                      <div className="text-xl">-</div>
                      <div className="text-center">
                        <div className="text-xs">AWAY</div>
                        <div className="text-2xl font-bold">64</div>
                      </div>
                      <div className="text-sm font-medium border-l border-white/30 pl-3 ml-2">
                        Q4 2:45
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {isStreaming && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button
                    variant={showChat ? "default" : "outline"}
                    className={
                      showChat ? "bg-[#FF6B00] hover:bg-orange-700" : ""
                    }
                    onClick={handleToggleChat}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat {showChat ? "On" : "Off"}
                  </Button>
                  <Button
                    variant={showStats ? "default" : "outline"}
                    className={
                      showStats ? "bg-[#FF6B00] hover:bg-orange-700" : ""
                    }
                    onClick={handleToggleStats}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Stats {showStats ? "On" : "Off"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Stream Settings
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {isStreaming && showChat && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>
                  Chat with viewers during your live stream
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="p-4 text-center text-neutral-500 bg-neutral-50 rounded-md">
                    Chat messages will appear here during your live stream.
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="preview">Controls</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <StreamControls
                isStreaming={isStreaming}
                viewerCount={viewerCount}
                onToggleStream={handleToggleStream}
                onShareStream={handleShareStream}
                onToggleScoreboard={handleToggleScoreboard}
                onToggleChat={handleToggleChat}
                onToggleStats={handleToggleStats}
              />
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Stream Settings</CardTitle>
                  <CardDescription>
                    Configure your stream quality and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Stream Quality
                    </label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option>High Definition (HD)</option>
                      <option>Standard Definition (SD)</option>
                      <option>Auto (Based on Network)</option>
                    </select>
                    <p className="text-xs text-neutral-500">
                      Higher quality uses more data and requires better internet
                      connection.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      AutoStream Tracking
                    </label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                    <p className="text-xs text-neutral-500">
                      AutoStream automatically follows the action on the court.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Record Stream</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="record-stream"
                        className="rounded border-neutral-300"
                        defaultChecked
                      />
                      <label htmlFor="record-stream" className="text-sm">
                        Save stream for later viewing
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Stream Privacy
                    </label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                      <option>Public - Anyone can watch</option>
                      <option>Team Only - Only team members can watch</option>
                      <option>
                        Private - Only people with the link can watch
                      </option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience">
              <Card>
                <CardHeader>
                  <CardTitle>Stream Audience</CardTitle>
                  <CardDescription>
                    {isStreaming
                      ? `${viewerCount} people currently watching`
                      : "Start streaming to see your audience"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isStreaming ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-neutral-50 rounded-md flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs">JD</span>
                          </div>
                          <span className="font-medium">John Davis</span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          Joined 5m ago
                        </span>
                      </div>

                      <div className="p-3 bg-neutral-50 rounded-md flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs">SM</span>
                          </div>
                          <span className="font-medium">Sarah Miller</span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          Joined 3m ago
                        </span>
                      </div>

                      <div className="p-3 bg-neutral-50 rounded-md flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-xs">RW</span>
                          </div>
                          <span className="font-medium">Robert Wilson</span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          Joined 1m ago
                        </span>
                      </div>

                      <div className="text-center text-sm text-neutral-500 py-2">
                        + {viewerCount - 3} more viewers
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-neutral-500">
                      <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>
                        Your audience will appear here once you start streaming.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
