import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  title?: string;
  isLive?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  height?: string;
  width?: string;
  onEnded?: () => void;
}

export function VideoPlayer({
  src,
  title,
  isLive = false,
  autoPlay = false,
  controls = true,
  height = "100%",
  width = "100%",
  onEnded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseInt(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(parseInt(e.target.value));
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(video.duration, video.currentTime + 10);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const enterFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card className="overflow-hidden relative rounded-lg border-0 shadow-lg">
      <CardContent className="p-0 relative">
        <video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          autoPlay={autoPlay}
          className="w-full h-full object-cover bg-black"
          onClick={togglePlay}
        />
        
        {title && (
          <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent text-white">
            <h3 className="font-semibold">{title}</h3>
            {isLive && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full inline-block mt-1">
                LIVE
              </span>
            )}
          </div>
        )}
        
        {controls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            {!isLive && (
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer"
              />
            )}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </Button>
                {!isLive && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                      onClick={skipBackward}
                    >
                      <ChevronLeft size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                      onClick={skipForward}
                    >
                      <ChevronRight size={18} />
                    </Button>
                  </>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                {!isLive && (
                  <span className="text-xs text-white mr-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                  onClick={enterFullscreen}
                >
                  <Maximize size={18} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
