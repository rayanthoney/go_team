import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Search, Edit, Trash, Mail, Calendar, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
  email: string;
  status: "active" | "injured" | "inactive";
  height?: string;
  weight?: string;
  year?: string;
  rsvpStatus?: "confirmed" | "declined" | "pending";
}

interface RosterListProps {
  players: Player[];
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
  onUpdatePlayer: (id: string, player: Partial<Player>) => void;
  onDeletePlayer: (id: string) => void;
  onSendMessage: (playerIds: string[]) => void;
  gameId?: string;
  isRsvpView?: boolean;
}

export function RosterList({
  players,
  onAddPlayer,
  onUpdatePlayer,
  onDeletePlayer,
  onSendMessage,
  gameId,
  isRsvpView = false,
}: RosterListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    number: "",
    position: "",
    email: "",
    status: "active" as const
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.number.includes(searchTerm)
  );
  
  const togglePlayerSelection = (id: string) => {
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter(playerId => playerId !== id));
    } else {
      setSelectedPlayers([...selectedPlayers, id]);
    }
  };
  
  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.number) return;
    
    onAddPlayer(newPlayer);
    setNewPlayer({
      name: "",
      number: "",
      position: "",
      email: "",
      status: "active"
    });
    setIsAddModalOpen(false);
  };
  
  const updateRsvpStatus = (playerId: string, status: Player['rsvpStatus']) => {
    onUpdatePlayer(playerId, { rsvpStatus: status });
  };
  
  const getStatusColor = (status: Player['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'injured':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'inactive':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };
  
  const getRsvpStatusIcon = (status?: Player['rsvpStatus']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'declined':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
      default:
        return <Calendar className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>{isRsvpView ? 'Game Attendance' : 'Team Roster'}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search players..."
                className="pl-8 w-full sm:w-[240px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Player
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Player</DialogTitle>
                  <DialogDescription>
                    Add a new player to your team roster.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Name</label>
                    <Input
                      className="col-span-3"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                      placeholder="Player name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Number</label>
                    <Input
                      className="col-span-3"
                      value={newPlayer.number}
                      onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
                      placeholder="Jersey number"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Position</label>
                    <Input
                      className="col-span-3"
                      value={newPlayer.position}
                      onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                      placeholder="Position"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Email</label>
                    <Input
                      className="col-span-3"
                      value={newPlayer.email}
                      onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                      placeholder="Email address"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm font-medium">Status</label>
                    <select
                      className="col-span-3 border rounded-md px-3 py-2"
                      value={newPlayer.status}
                      onChange={(e) => setNewPlayer({ ...newPlayer, status: e.target.value as any })}
                    >
                      <option value="active">Active</option>
                      <option value="injured">Injured</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPlayer}>
                    Add Player
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isRsvpView ? (
          <div className="rounded-md border overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-100">
                {filteredPlayers.map((player) => (
                  <tr key={player.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback className="bg-neutral-200 text-xs font-medium">
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-xs text-neutral-500">
                            #{player.number} • {player.position}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        {getRsvpStatusIcon(player.rsvpStatus)}
                        <span className="ml-2 text-sm">
                          {player.rsvpStatus === 'confirmed' ? 'Confirmed' : 
                           player.rsvpStatus === 'declined' ? 'Declined' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => updateRsvpStatus(player.id, 'confirmed')}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => updateRsvpStatus(player.id, 'declined')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Players</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="injured">Injured</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-neutral-300 text-[#FF6B00] mr-2"
                            checked={selectedPlayers.length === filteredPlayers.length}
                            onChange={() => {
                              if (selectedPlayers.length === filteredPlayers.length) {
                                setSelectedPlayers([]);
                              } else {
                                setSelectedPlayers(filteredPlayers.map(p => p.id));
                              }
                            }}
                          />
                          Player
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-100">
                    {filteredPlayers.map((player) => (
                      <tr key={player.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-neutral-300 text-[#FF6B00] mr-2"
                              checked={selectedPlayers.includes(player.id)}
                              onChange={() => togglePlayerSelection(player.id)}
                            />
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarFallback className="bg-neutral-200 text-xs font-medium">
                                {player.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-xs text-neutral-500">
                                #{player.number} • {player.position}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm">{player.email}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <span 
                            className={`inline-flex text-xs px-2 py-1 rounded-full border ${getStatusColor(player.status)}`}
                          >
                            {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => onDeletePlayer(player.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-100">
                    {filteredPlayers
                      .filter(player => player.status === 'active')
                      .map((player) => (
                        <tr key={player.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback className="bg-neutral-200 text-xs font-medium">
                                  {player.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{player.name}</div>
                                <div className="text-xs text-neutral-500">
                                  #{player.number} • {player.position}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm">{player.email}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="injured">
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-100">
                    {filteredPlayers
                      .filter(player => player.status === 'injured')
                      .map((player) => (
                        <tr key={player.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarFallback className="bg-neutral-200 text-xs font-medium">
                                  {player.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{player.name}</div>
                                <div className="text-xs text-neutral-500">
                                  #{player.number} • {player.position}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm">{player.email}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      <CardFooter className={`${selectedPlayers.length > 0 ? 'justify-between' : 'justify-end'}`}>
        {selectedPlayers.length > 0 && (
          <div className="text-sm">
            {selectedPlayers.length} player{selectedPlayers.length !== 1 ? 's' : ''} selected
          </div>
        )}
        
        {selectedPlayers.length > 0 && (
          <Button 
            variant="outline"
            onClick={() => onSendMessage(selectedPlayers)}
          >
            <Mail className="h-4 w-4 mr-2" />
            Message Selected
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
