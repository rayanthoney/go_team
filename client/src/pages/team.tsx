import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RosterList } from "@/components/team/roster-list";
import { TeamMessage } from "@/components/team/team-message";
import {
  UserPlus,
  Calendar,
  MessageSquare,
  Mail,
  FileText,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Team() {
  const [activeTab, setActiveTab] = useState("roster");
  const [players, setPlayers] = useState([
    {
      id: "p1",
      name: "James Davis",
      initials: "JD", 
      number: "23",
      position: "Guard",
      email: "james.davis@example.com",
      status: "active" as const,
      rsvpStatus: "confirmed" as const
    },
    {
      id: "p2",
      name: "Mike Thomas",
      initials: "MT",
      number: "11",
      position: "Forward",
      email: "mike.thomas@example.com",
      status: "questionable" as const,
      rsvpStatus: "pending" as const
    },
    {
      id: "p3",
      name: "Kevin Johnson",
      initials: "KJ",
      number: "34",
      position: "Center",
      email: "kevin.johnson@example.com",
      status: "active" as const,
      rsvpStatus: "confirmed" as const
    },
    {
      id: "p4",
      name: "Alex Smith",
      initials: "AS",
      number: "7",
      position: "Guard",
      email: "alex.smith@example.com",
      status: "active" as const,
      rsvpStatus: "declined" as const
    },
    {
      id: "p5",
      name: "Tyler Brown",
      initials: "TB",
      number: "15",
      position: "Forward",
      email: "tyler.brown@example.com",
      status: "injured" as const,
      rsvpStatus: "pending" as const
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: "m1",
      sender: {
        id: "coach1",
        name: "Coach Wilson",
        initials: "CW"
      },
      content: "Great practice today, team! Remember we have a game this Saturday against Eastside Lions.",
      timestamp: "Yesterday at 5:30 PM",
      isCoach: true
    },
    {
      id: "m2",
      sender: {
        id: "p1",
        name: "James Davis",
        initials: "JD"
      },
      content: "Thanks coach! What time should we arrive for warm-ups?",
      timestamp: "Yesterday at 6:05 PM",
      isCoach: false
    },
    {
      id: "m3",
      sender: {
        id: "coach1",
        name: "Coach Wilson",
        initials: "CW"
      },
      content: "Please arrive by 6:00 PM for warm-ups. Game starts at 7:00 PM. Don't forget your home jerseys!",
      timestamp: "Yesterday at 6:12 PM",
      isCoach: true
    }
  ]);

  const { toast } = useToast();

  const handleAddPlayer = (player: Omit<typeof players[0], 'id'>) => {
    setPlayers([...players, { ...player, id: `p${players.length + 1}` }]);
    toast({
      title: "Player added",
      description: `${player.name} has been added to your team.`
    });
  };

  const handleUpdatePlayer = (id: string, playerData: Partial<typeof players[0]>) => {
    setPlayers(players.map(player => 
      player.id === id ? { ...player, ...playerData } : player
    ));
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
    toast({
      title: "Player removed",
      description: "The player has been removed from your team."
    });
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `m${messages.length + 1}`,
      sender: {
        id: "coach1", // Assuming the current user is the coach
        name: "Coach Wilson",
        initials: "CW"
      },
      content,
      timestamp: "Just now",
      isCoach: true
    };
    
    setMessages([...messages, newMessage]);
  };

  const handleSendMessageToSelected = (playerIds: string[]) => {
    const selectedPlayerNames = players
      .filter(player => playerIds.includes(player.id))
      .map(player => player.name)
      .join(", ");
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${selectedPlayerNames}.`
    });
  };

  const handleCreateEvent = () => {
    toast({
      title: "Event created",
      description: "Your team event has been created and notifications sent."
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-neutral-600">Manage your roster, communication, and team events</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="roster">
            <UserPlus className="h-4 w-4 mr-2" />
            Roster
          </TabsTrigger>
          <TabsTrigger value="communication">
            <MessageSquare className="h-4 w-4 mr-2" />
            Communication
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule & RSVP
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="roster">
          <RosterList 
            players={players}
            onAddPlayer={handleAddPlayer}
            onUpdatePlayer={handleUpdatePlayer}
            onDeletePlayer={handleDeletePlayer}
            onSendMessage={handleSendMessageToSelected}
          />
        </TabsContent>
        
        <TabsContent value="communication">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TeamMessage 
                messages={messages}
                onSendMessage={handleSendMessage}
                onCreateEvent={handleCreateEvent}
                userId="coach1" // Assuming the current user is the coach
              />
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Communication Tools</CardTitle>
                  <CardDescription>
                    Connect with your team in multiple ways
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Send Email</h3>
                        <p className="text-sm text-neutral-500">Compose and send email to entire team</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Team Chat</h3>
                        <p className="text-sm text-neutral-500">Message your team in real-time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <FileText className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Announcements</h3>
                        <p className="text-sm text-neutral-500">Post important updates for the team</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Create Message
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Upcoming Games & Events</CardTitle>
                    <Button>
                      <Calendar className="mr-2 h-4 w-4" />
                      Add Event
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Event</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Date & Time</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Location</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-100">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium">Game vs. Eastside Lions</div>
                            <div className="text-xs text-neutral-500">Regular Season</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div>Oct 15, 2023</div>
                            <div className="text-xs">7:00 PM</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div>Central High School</div>
                            <div className="text-xs">Home Game</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                              Confirmed
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("roster")}>
                              Check RSVPs
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium">Team Practice</div>
                            <div className="text-xs text-neutral-500">Weekly Practice</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div>Oct 12, 2023</div>
                            <div className="text-xs">6:00 PM - 8:00 PM</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <div>Central High School</div>
                            <div className="text-xs">Gymnasium</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-center">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                              Upcoming
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <Button variant="ghost" size="sm" onClick={() => setActiveTab("roster")}>
                              Check RSVPs
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Game Attendance</CardTitle>
                  <CardDescription>
                    Check and update RSVPs for upcoming games
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RosterList 
                    players={players}
                    onAddPlayer={handleAddPlayer}
                    onUpdatePlayer={handleUpdatePlayer}
                    onDeletePlayer={handleDeletePlayer}
                    onSendMessage={handleSendMessageToSelected}
                    gameId="game1"
                    isRsvpView
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
