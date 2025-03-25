import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, 
  Plus, MapPin, Clock, Users, 
  ChevronLeft, ChevronRight, 
  MoreHorizontal, Check, X, Mail 
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const { toast } = useToast();
  
  const events = [
    {
      id: "event1",
      title: "Game vs. Eastside Lions",
      type: "game",
      date: "Oct 15, 2023",
      time: "7:00 PM",
      location: "Central High School",
      isHome: true,
      confirmedCount: 12,
      totalCount: 15,
      status: "upcoming" as const
    },
    {
      id: "event2",
      title: "Team Practice",
      type: "practice",
      date: "Oct 12, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Central High School",
      isHome: true,
      confirmedCount: 14,
      totalCount: 15,
      status: "upcoming" as const
    },
    {
      id: "event3",
      title: "Game vs. South Hoops",
      type: "game",
      date: "Oct 1, 2023",
      time: "6:30 PM",
      location: "South Hoops Arena",
      isHome: false,
      status: "completed" as const,
      result: "L 62-68"
    },
    {
      id: "event4",
      title: "Game vs. West Valley",
      type: "game",
      date: "Sep 24, 2023",
      time: "7:00 PM",
      location: "Central High School",
      isHome: true,
      status: "completed" as const,
      result: "W 71-63"
    }
  ];
  
  const handleAddEvent = () => {
    toast({
      title: "Event added",
      description: "Your event has been added to the schedule.",
    });
    setIsAddEventOpen(false);
  };
  
  const handleSendReminder = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: "Reminder sent",
        description: `Reminder for "${event.title}" has been sent to the team.`,
      });
    }
  };
  
  const handleCancelEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: "Event cancelled",
        description: `"${event.title}" has been cancelled and the team has been notified.`,
      });
    }
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team Schedule</h1>
          <p className="text-neutral-600">Manage your games, practices, and team events</p>
        </div>
        
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event and notify your team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Title</label>
                <input
                  className="col-span-3 border rounded-md px-3 py-2"
                  placeholder="Event title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Type</label>
                <select className="col-span-3 border rounded-md px-3 py-2">
                  <option>Game</option>
                  <option>Practice</option>
                  <option>Team Meeting</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Date</label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toLocaleDateString() : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Time</label>
                <input
                  className="col-span-3 border rounded-md px-3 py-2"
                  placeholder="7:00 PM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Location</label>
                <input
                  className="col-span-3 border rounded-md px-3 py-2"
                  placeholder="Event location"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Notes</label>
                <textarea
                  className="col-span-3 border rounded-md px-3 py-2"
                  placeholder="Additional details about the event"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Notify Team</label>
                <div className="col-span-3 flex items-center">
                  <input
                    type="checkbox"
                    id="notify-team"
                    className="rounded border-neutral-300 mr-2"
                    defaultChecked
                  />
                  <label htmlFor="notify-team">Send notification to all team members</label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>
                Add Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Events</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter(event => event.status === "upcoming")
                  .map(event => (
                    <div 
                      key={event.id}
                      className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
                        <div className="flex items-center mb-3 md:mb-0">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                            event.type === "game" 
                              ? "bg-primary/10 text-primary" 
                              : "bg-secondary/10 text-secondary"
                          }`}>
                            {event.type === "game" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <div className="flex flex-wrap text-sm text-neutral-500">
                              <div className="flex items-center mr-3">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center mr-3">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{event.location}</span>
                                {event.isHome ? (
                                  <span className="ml-1 bg-primary/10 text-primary rounded-full text-xs px-2">Home</span>
                                ) : (
                                  <span className="ml-1 bg-neutral-100 text-neutral-600 rounded-full text-xs px-2">Away</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                          <div className="flex items-center text-sm text-neutral-500 bg-neutral-50 px-3 py-1 rounded">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{event.confirmedCount}/{event.totalCount} confirmed</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleSendReminder(event.id)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Reminder
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                View RSVPs
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCancelEvent(event.id)}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel Event
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 border-t flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium">{event.confirmedCount}</span> players have confirmed
                        </div>
                        <Button size="sm" variant="outline">
                          <Check className="mr-2 h-4 w-4" />
                          Check RSVPs
                        </Button>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Past Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Game</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Result</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-100">
                    {events
                      .filter(event => event.status === "completed" && event.type === "game")
                      .map(event => (
                        <tr key={event.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="font-medium">{event.title}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="text-sm">{event.date}</div>
                            <div className="text-xs text-neutral-500">{event.time}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div className="text-sm">{event.location}</div>
                            <div className="text-xs">
                              {event.isHome ? (
                                <span className="bg-primary/10 text-primary rounded-full text-xs px-2">Home</span>
                              ) : (
                                <span className="bg-neutral-100 text-neutral-600 rounded-full text-xs px-2">Away</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              event.result?.startsWith('W')
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {event.result}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <Button variant="ghost" size="sm">
                              View Stats
                            </Button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Events on {date?.toLocaleDateString()}</h3>
                <div className="p-6 bg-neutral-50 rounded-lg text-center text-neutral-500">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No events scheduled for this date.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setIsAddEventOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Calendar Integration</CardTitle>
              <CardDescription>
                Sync your team schedule with your calendar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="#4285F4">
                    <path d="M21.6 11.22L17 8.16V5c0-.55-.45-1-1-1h-3.35l-1.9-1.47c-.38-.3-.92-.3-1.3 0L7.55 4H4c-.55 0-1 .45-1 1v3.16L2.4 11.22c-.24.19-.4.49-.4.81v10c0 .28.11.53.29.71.18.18.43.29.71.29h18c.28 0 .53-.11.71-.29.18-.18.29-.43.29-.71v-10c0-.32-.16-.62-.4-.81zM16 15c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" />
                  </svg>
                  <div>
                    <div className="font-medium">Google Calendar</div>
                    <div className="text-xs text-neutral-500">Connect and sync events</div>
                  </div>
                </div>
                <Button size="sm">Connect</Button>
              </div>
              
              <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="#00adef">
                    <path d="M21.5 4h-19C1.675 4 1 4.675 1 5.5v14c0 .825.675 1.5 1.5 1.5h19c.825 0 1.5-.675 1.5-1.5v-14c0-.825-.675-1.5-1.5-1.5zm-7 1.5V7h5v5h-5v5H10v-5H5V7h5V5.5h4.5z" />
                  </svg>
                  <div>
                    <div className="font-medium">Outlook</div>
                    <div className="text-xs text-neutral-500">Connect and sync events</div>
                  </div>
                </div>
                <Button size="sm">Connect</Button>
              </div>
              
              <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="#ff3b30">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 15H7v-7h3v7zm5 0h-3v-3h3v3zm0-4h-3v-3h3v3zm4 4h-3v-7h3v7z" />
                  </svg>
                  <div>
                    <div className="font-medium">Apple Calendar</div>
                    <div className="text-xs text-neutral-500">Connect and sync events</div>
                  </div>
                </div>
                <Button size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
