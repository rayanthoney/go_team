import { useState } from "react";
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  User,
  Lock,
  Bell,
  Video,
  Save,
  Globe,
  Trash2,
  HelpCircle,
  Download,
  Shield,
  LayoutGrid
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [profileData, setProfileData] = useState({
    name: "Coach Wilson",
    email: "coach.wilson@example.com",
    phone: "(555) 123-4567",
    teamName: "Wildcats",
    teamLogo: ""
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    gameReminders: true,
    teamMessages: true,
    statsUpdates: false,
    marketingUpdates: false
  });

  const [streamSettings, setStreamSettings] = useState({
    autoRecord: true,
    highQuality: false,
    autoShare: false,
    privateByDefault: true,
    autoStream: true
  });

  const { toast } = useToast();

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated."
    });
  };

  const handleStreamSettingsUpdate = () => {
    toast({
      title: "Streaming settings saved",
      description: "Your streaming preferences have been updated."
    });
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const handleStreamToggle = (setting: keyof typeof streamSettings) => {
    setStreamSettings({
      ...streamSettings,
      [setting]: !streamSettings[setting]
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-neutral-600">Manage your account and preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="streaming">
            <Video className="h-4 w-4 mr-2" />
            Streaming
          </TabsTrigger>
          <TabsTrigger value="account">
            <Shield className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal and team information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teamName">Team Name</Label>
                          <Input
                            id="teamName"
                            name="teamName"
                            value={profileData.teamName}
                            onChange={handleProfileInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="teamLogo">Team Logo</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-[#FF6B00] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">W</span>
                          </div>
                          <Input
                            id="teamLogo"
                            name="teamLogo"
                            type="file"
                            className="max-w-sm"
                          />
                        </div>
                        <p className="text-xs text-neutral-500 mt-2">
                          Recommended: Square image, at least 256x256 pixels
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleProfileUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Coaching Profile</CardTitle>
                  <CardDescription>
                    Additional coaching information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Coaching Experience</Label>
                    <select 
                      id="experience" 
                      className="w-full border rounded-md px-3 py-2"
                    >
                      <option>Less than 1 year</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option selected>5-10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="certification">Coaching Certification</Label>
                    <select 
                      id="certification" 
                      className="w-full border rounded-md px-3 py-2"
                    >
                      <option>None</option>
                      <option selected>USAB - Bronze</option>
                      <option>USAB - Silver</option>
                      <option>USAB - Gold</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Coaching Philosophy</Label>
                    <textarea 
                      id="bio" 
                      className="w-full border rounded-md px-3 py-2"
                      rows={4}
                      placeholder="Share your coaching philosophy..."
                    >Focus on fundamentals, teamwork, and player development. Building character and basketball IQ is as important as winning games.</textarea>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase">Communication</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-neutral-500">
                      Receive emails about game updates, stats, and team activity
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-neutral-500">
                      Receive notifications on your device
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase">Events & Games</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="gameReminders">Game Reminders</Label>
                    <p className="text-sm text-neutral-500">
                      Receive reminders about upcoming games
                    </p>
                  </div>
                  <Switch
                    id="gameReminders"
                    checked={notificationSettings.gameReminders}
                    onCheckedChange={() => handleNotificationToggle('gameReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="teamMessages">Team Messages</Label>
                    <p className="text-sm text-neutral-500">
                      Get notified when team members send messages
                    </p>
                  </div>
                  <Switch
                    id="teamMessages"
                    checked={notificationSettings.teamMessages}
                    onCheckedChange={() => handleNotificationToggle('teamMessages')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="statsUpdates">Stats Updates</Label>
                    <p className="text-sm text-neutral-500">
                      Receive notifications for new game stats
                    </p>
                  </div>
                  <Switch
                    id="statsUpdates"
                    checked={notificationSettings.statsUpdates}
                    onCheckedChange={() => handleNotificationToggle('statsUpdates')}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase">Marketing</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingUpdates">Marketing Updates</Label>
                    <p className="text-sm text-neutral-500">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <Switch
                    id="marketingUpdates"
                    checked={notificationSettings.marketingUpdates}
                    onCheckedChange={() => handleNotificationToggle('marketingUpdates')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNotificationUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="streaming">
          <Card>
            <CardHeader>
              <CardTitle>Streaming Settings</CardTitle>
              <CardDescription>
                Configure your live streaming preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase">Recording</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoRecord">Auto-Record Streams</Label>
                    <p className="text-sm text-neutral-500">
                      Automatically save all streams for later viewing
                    </p>
                  </div>
                  <Switch
                    id="autoRecord"
                    checked={streamSettings.autoRecord}
                    onCheckedChange={() => handleStreamToggle('autoRecord')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="highQuality">High Quality Recording</Label>
                    <p className="text-sm text-neutral-500">
                      Record in higher quality (uses more storage)
                    </p>
                  </div>
                  <Switch
                    id="highQuality"
                    checked={streamSettings.highQuality}
                    onCheckedChange={() => handleStreamToggle('highQuality')}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase">Sharing</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoShare">Auto-Share with Team</Label>
                    <p className="text-sm text-neutral-500">
                      Automatically share recordings with your team
                    </p>
                  </div>
                  <Switch
                    id="autoShare"
                    checked={streamSettings.autoShare}
                    onCheckedChange={() => handleStreamToggle('autoShare')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="privateByDefault">Private Streams by Default</Label>
                    <p className="text-sm text-neutral-500">
                      Make all streams private unless changed
                    </p>
                  </div>
                  <Switch
                    id="privateByDefault"
                    checked={streamSettings.privateByDefault}
                    onCheckedChange={() => handleStreamToggle('privateByDefault')}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase">AutoStream Technology</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoStream">Enable AutoStream</Label>
                    <p className="text-sm text-neutral-500">
                      Automatically follow the action on the court during live streams
                    </p>
                  </div>
                  <Switch
                    id="autoStream"
                    checked={streamSettings.autoStream}
                    onCheckedChange={() => handleStreamToggle('autoStream')}
                  />
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="streamQuality">Stream Quality</Label>
                  <select 
                    id="streamQuality" 
                    className="w-full mt-1 border rounded-md px-3 py-2"
                  >
                    <option>Auto (Recommended)</option>
                    <option selected>HD (720p)</option>
                    <option>Full HD (1080p)</option>
                    <option>SD (480p)</option>
                  </select>
                  <p className="text-xs text-neutral-500 mt-1">
                    Higher quality uses more bandwidth and requires better internet connection
                  </p>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="defaultLatency">Default Latency Mode</Label>
                  <select 
                    id="defaultLatency" 
                    className="w-full mt-1 border rounded-md px-3 py-2"
                  >
                    <option>Normal (15-30 seconds, recommended)</option>
                    <option selected>Low Latency (5-10 seconds)</option>
                    <option>Ultra Low Latency (1-3 seconds, experimental)</option>
                  </select>
                  <p className="text-xs text-neutral-500 mt-1">
                    Lower latency may affect stream stability and quality
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleStreamSettingsUpdate}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4 mt-6">
                    <h3 className="text-sm font-medium text-neutral-500 uppercase mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-neutral-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Set Up</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Current Plan: Free</h3>
                      <Button className="bg-[#FF6B00] hover:bg-orange-700">
                        Upgrade
                      </Button>
                    </div>
                    <p className="text-sm text-neutral-500">
                      You're currently on the Free plan. Upgrade to unlock premium features like full game videos, advanced stats, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Download className="h-5 w-5 mr-3 text-neutral-500" />
                      <div>
                        <div className="font-medium">Download My Data</div>
                        <div className="text-xs text-neutral-500">Get a copy of your data</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                  
                  <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <LayoutGrid className="h-5 w-5 mr-3 text-neutral-500" />
                      <div>
                        <div className="font-medium">Customize Dashboard</div>
                        <div className="text-xs text-neutral-500">Personalize your interface</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Customize</Button>
                  </div>
                  
                  <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 mr-3 text-neutral-500" />
                      <div>
                        <div className="font-medium">Language & Region</div>
                        <div className="text-xs text-neutral-500">Change app language</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  
                  <div className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-3 text-neutral-500" />
                      <div>
                        <div className="font-medium">Help & Support</div>
                        <div className="text-xs text-neutral-500">Get assistance</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Contact</Button>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
