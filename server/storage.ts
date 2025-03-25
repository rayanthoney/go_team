import { 
  users, teams, players, games, statistics, gameStatistics, events, 
  messages, highlights, subscriptions, type User, type InsertUser,
  type Team, type InsertTeam, type Player, type InsertPlayer,
  type Game, type InsertGame, type Statistics, type InsertStatistics,
  type GameStatistics, type InsertGameStatistics, type Event, type InsertEvent,
  type Message, type InsertMessage, type Highlight, type InsertHighlight,
  type Subscription, type InsertSubscription
} from "@shared/schema";

// Modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Team methods
  getAllTeams(): Promise<Team[]>;
  getTeamById(id: string): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: string, team: Partial<Team>): Promise<Team | undefined>;
  
  // Player methods
  getPlayersByTeamId(teamId: string): Promise<Player[]>;
  getPlayerById(id: string): Promise<Player | undefined>;
  addPlayerToTeam(teamId: string, player: InsertPlayer): Promise<Player>;
  updatePlayer(id: string, player: Partial<Player>): Promise<Player | undefined>;
  deletePlayer(id: string): Promise<boolean>;
  
  // Game methods
  getAllGames(): Promise<Game[]>;
  getGameById(id: string): Promise<Game | undefined>;
  getGamesByTeamId(teamId: string): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  updateGame(id: string, game: Partial<Game>): Promise<Game | undefined>;
  updateGameScore(id: string, homeScore: number, awayScore: number): Promise<Game | undefined>;
  updateGameStats(id: string, stats: Partial<GameStatistics>): Promise<GameStatistics | undefined>;
  updateGameStreamStatus(id: string, status: 'live' | 'ended'): Promise<Game | undefined>;
  
  // Statistics methods
  getGameStatistics(gameId: string): Promise<GameStatistics | undefined>;
  createGameStatistics(gameId: string, stats: InsertGameStatistics): Promise<GameStatistics>;
  updateGameStatistics(gameId: string, stats: Partial<GameStatistics>): Promise<GameStatistics | undefined>;
  getPlayerStatistics(playerId: string): Promise<Statistics[]>;
  
  // Team communication methods
  getTeamMessages(teamId: string): Promise<Message[]>;
  addTeamMessage(teamId: string, message: InsertMessage): Promise<Message>;
  
  // Team events/schedule methods
  getTeamEvents(teamId: string): Promise<Event[]>;
  addTeamEvent(teamId: string, event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<Event>): Promise<Event | undefined>;
  
  // Highlight methods
  getGameHighlights(gameId: string): Promise<Highlight[]>;
  addGameHighlight(gameId: string, highlight: InsertHighlight): Promise<Highlight>;
  
  // Subscription methods
  getSubscriptionPlans(): Promise<Subscription[]>;
  getUserSubscription(userId: string): Promise<Subscription | undefined>;
  updateUserSubscription(userId: string, subscription: InsertSubscription): Promise<Subscription>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private teams: Map<string, Team>;
  private players: Map<string, Player>;
  private games: Map<string, Game>;
  private statistics: Map<string, Statistics>;
  private gameStatistics: Map<string, GameStatistics>;
  private events: Map<string, Event>;
  private messages: Map<string, Message>;
  private highlights: Map<string, Highlight>;
  private subscriptions: Map<string, Subscription>;

  constructor() {
    this.users = new Map();
    this.teams = new Map();
    this.players = new Map();
    this.games = new Map();
    this.statistics = new Map();
    this.gameStatistics = new Map();
    this.events = new Map();
    this.messages = new Map();
    this.highlights = new Map();
    this.subscriptions = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add a sample team
    const wildcatsTeam: Team = {
      id: "team1",
      name: "Wildcats",
      coachId: "user1",
      createdAt: new Date().toISOString(),
      logoUrl: null,
      season: "2023-2024"
    };
    this.teams.set(wildcatsTeam.id, wildcatsTeam);
    
    // Add a sample coach user
    const coachUser: User = {
      id: "user1",
      username: "coach",
      password: "password", // In real app this would be hashed
      email: "coach@example.com",
      name: "Coach Wilson",
      role: "coach",
      teamId: "team1",
      subscriptionTier: "free"
    };
    this.users.set(coachUser.id, coachUser);

    // Sample players
    const players: Player[] = [
      {
        id: "player1",
        name: "James Davis",
        number: "23",
        position: "Guard",
        teamId: "team1",
        status: "active",
        email: "james.davis@example.com"
      },
      {
        id: "player2",
        name: "Mike Thomas",
        number: "11",
        position: "Forward",
        teamId: "team1",
        status: "questionable",
        email: "mike.thomas@example.com"
      },
      {
        id: "player3",
        name: "Kevin Johnson",
        number: "34",
        position: "Center",
        teamId: "team1",
        status: "active",
        email: "kevin.johnson@example.com"
      }
    ];
    
    players.forEach(player => {
      this.players.set(player.id, player);
    });

    // Sample games
    const games: Game[] = [
      {
        id: "game1",
        teamId: "team1",
        opponent: "Eastside Lions",
        date: "2023-10-08T19:00:00Z",
        location: "Central High School",
        isHome: true,
        result: "W",
        status: "completed",
        homeScore: 78,
        awayScore: 65,
        streamUrl: null,
        streamStatus: "ended"
      },
      {
        id: "game2",
        teamId: "team1",
        opponent: "South Hoops",
        date: "2023-10-01T18:30:00Z",
        location: "South Hoops Arena",
        isHome: false,
        result: "L",
        status: "completed",
        homeScore: 62,
        awayScore: 68,
        streamUrl: null,
        streamStatus: "ended"
      },
      {
        id: "game3",
        teamId: "team1",
        opponent: "Eastside Lions",
        date: "2023-10-15T19:00:00Z",
        location: "Central High School",
        isHome: true,
        result: null,
        status: "upcoming",
        homeScore: 0,
        awayScore: 0,
        streamUrl: null,
        streamStatus: "not_started"
      }
    ];
    
    games.forEach(game => {
      this.games.set(game.id, game);
    });

    // Sample game statistics
    const gameStats: GameStatistics[] = [
      {
        id: "gamestats1",
        gameId: "game1",
        teamId: "team1",
        teamPoints: 78,
        opponentPoints: 65,
        fieldGoalsMade: 30,
        fieldGoalsAttempted: 65,
        threePointsMade: 8,
        threePointsAttempted: 22,
        freeThrowsMade: 10,
        freeThrowsAttempted: 15,
        rebounds: 42,
        assists: 21,
        steals: 8,
        blocks: 5,
        turnovers: 10,
        fouls: 16
      },
      {
        id: "gamestats2",
        gameId: "game2",
        teamId: "team1",
        teamPoints: 62,
        opponentPoints: 68,
        fieldGoalsMade: 24,
        fieldGoalsAttempted: 62,
        threePointsMade: 6,
        threePointsAttempted: 24,
        freeThrowsMade: 8,
        freeThrowsAttempted: 12,
        rebounds: 35,
        assists: 14,
        steals: 6,
        blocks: 3,
        turnovers: 14,
        fouls: 18
      }
    ];
    
    gameStats.forEach(stats => {
      this.gameStatistics.set(stats.id, stats);
    });

    // Sample player statistics
    const playerStats: Statistics[] = [
      {
        id: "stats1",
        playerId: "player1",
        gameId: "game1",
        points: 14,
        rebounds: 8,
        assists: 5,
        steals: 2,
        blocks: 1,
        turnovers: 2,
        fouls: 3,
        minutes: 32,
        fieldGoalsMade: 6,
        fieldGoalsAttempted: 12,
        threePointsMade: 2,
        threePointsAttempted: 5,
        freeThrowsMade: 0,
        freeThrowsAttempted: 0
      },
      {
        id: "stats2",
        playerId: "player1",
        gameId: "game2",
        points: 11,
        rebounds: 5,
        assists: 3,
        steals: 1,
        blocks: 0,
        turnovers: 3,
        fouls: 4,
        minutes: 28,
        fieldGoalsMade: 4,
        fieldGoalsAttempted: 10,
        threePointsMade: 1,
        threePointsAttempted: 4,
        freeThrowsMade: 2,
        freeThrowsAttempted: 2
      }
    ];
    
    playerStats.forEach(stats => {
      this.statistics.set(stats.id, stats);
    });

    // Sample team events
    const events: Event[] = [
      {
        id: "event1",
        teamId: "team1",
        title: "Game vs. Eastside Lions",
        type: "game",
        date: "2023-10-15T19:00:00Z",
        location: "Central High School",
        description: "Home game against Eastside Lions",
        gameId: "game3"
      },
      {
        id: "event2",
        teamId: "team1",
        title: "Team Practice",
        type: "practice",
        date: "2023-10-12T18:00:00Z",
        location: "Central High School Gymnasium",
        description: "Regular weekly practice",
        gameId: null
      }
    ];
    
    events.forEach(event => {
      this.events.set(event.id, event);
    });

    // Sample team messages
    const messages: Message[] = [
      {
        id: "message1",
        teamId: "team1",
        senderId: "user1",
        content: "Great practice today, team! Remember we have a game this Saturday against Eastside Lions.",
        timestamp: "2023-10-10T17:30:00Z",
        senderName: "Coach Wilson",
        isCoach: true
      },
      {
        id: "message2",
        teamId: "team1",
        senderId: "player1",
        content: "Thanks coach! What time should we arrive for warm-ups?",
        timestamp: "2023-10-10T18:05:00Z",
        senderName: "James Davis",
        isCoach: false
      },
      {
        id: "message3",
        teamId: "team1",
        senderId: "user1",
        content: "Please arrive by 6:00 PM for warm-ups. Game starts at 7:00 PM. Don't forget your home jerseys!",
        timestamp: "2023-10-10T18:12:00Z",
        senderName: "Coach Wilson",
        isCoach: true
      }
    ];
    
    messages.forEach(message => {
      this.messages.set(message.id, message);
    });

    // Sample game highlights
    const highlights: Highlight[] = [
      {
        id: "highlight1",
        gameId: "game1",
        playerId: "player1",
        title: "Amazing three-pointer",
        timestamp: 1235,
        type: "score",
        url: null,
        thumbnailUrl: null,
        description: "James Davis hits a deep three with 2 seconds left on the shot clock."
      },
      {
        id: "highlight2",
        gameId: "game1",
        playerId: "player3",
        title: "Huge block by Johnson",
        timestamp: 2450,
        type: "block",
        url: null,
        thumbnailUrl: null,
        description: "Kevin Johnson with a massive block on a dunk attempt."
      }
    ];
    
    highlights.forEach(highlight => {
      this.highlights.set(highlight.id, highlight);
    });

    // Sample subscription plans
    const subscriptions: Subscription[] = [
      {
        id: "free",
        name: "Free Plan",
        price: 0,
        features: ["Live streaming", "Team scheduling", "Team messaging", "Basic statistics"],
        description: "Basic features for all users",
        billingPeriod: "month"
      },
      {
        id: "plus",
        name: "Plus Plan",
        price: 29.99,
        features: ["Live streaming", "Team scheduling", "Team messaging", "Basic statistics", "Box scores", "Live play-by-plays", "Game recap stories", "Live game alerts"],
        description: "Essential tools for serious teams",
        billingPeriod: "year"
      },
      {
        id: "premium",
        name: "Premium Plan",
        price: 89.99,
        features: ["Live streaming", "Team scheduling", "Team messaging", "Basic statistics", "Box scores", "Live play-by-plays", "Game recap stories", "Live game alerts", "Full event videos", "Highlight clipping", "Season stats", "Spray charts", "Shareable athlete profiles"],
        description: "Complete suite for advanced teams",
        billingPeriod: "year"
      }
    ];
    
    subscriptions.forEach(subscription => {
      this.subscriptions.set(subscription.id, subscription);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = `user${this.users.size + 1}`;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Team methods
  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeamById(id: string): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const id = `team${this.teams.size + 1}`;
    const newTeam: Team = { 
      ...team, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.teams.set(id, newTeam);
    return newTeam;
  }

  async updateTeam(id: string, teamData: Partial<Team>): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;
    
    const updatedTeam = { ...team, ...teamData };
    this.teams.set(id, updatedTeam);
    return updatedTeam;
  }

  // Player methods
  async getPlayersByTeamId(teamId: string): Promise<Player[]> {
    return Array.from(this.players.values()).filter(
      (player) => player.teamId === teamId
    );
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async addPlayerToTeam(teamId: string, player: InsertPlayer): Promise<Player> {
    const id = `player${this.players.size + 1}`;
    const newPlayer: Player = { ...player, id, teamId };
    this.players.set(id, newPlayer);
    return newPlayer;
  }

  async updatePlayer(id: string, playerData: Partial<Player>): Promise<Player | undefined> {
    const player = this.players.get(id);
    if (!player) return undefined;
    
    const updatedPlayer = { ...player, ...playerData };
    this.players.set(id, updatedPlayer);
    return updatedPlayer;
  }

  async deletePlayer(id: string): Promise<boolean> {
    return this.players.delete(id);
  }

  // Game methods
  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGameById(id: string): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async getGamesByTeamId(teamId: string): Promise<Game[]> {
    return Array.from(this.games.values()).filter(
      (game) => game.teamId === teamId
    );
  }

  async createGame(game: InsertGame): Promise<Game> {
    const id = `game${this.games.size + 1}`;
    const newGame: Game = { 
      ...game, 
      id,
      homeScore: 0,
      awayScore: 0,
      streamStatus: "not_started"
    };
    this.games.set(id, newGame);
    return newGame;
  }

  async updateGame(id: string, gameData: Partial<Game>): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    
    const updatedGame = { ...game, ...gameData };
    this.games.set(id, updatedGame);
    return updatedGame;
  }

  async updateGameScore(id: string, homeScore: number, awayScore: number): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    
    const updatedGame = { 
      ...game, 
      homeScore, 
      awayScore,
      result: homeScore > awayScore ? "W" : homeScore < awayScore ? "L" : null
    };
    this.games.set(id, updatedGame);
    return updatedGame;
  }

  async updateGameStats(id: string, stats: Partial<GameStatistics>): Promise<GameStatistics | undefined> {
    const gameStats = Array.from(this.gameStatistics.values()).find(
      gs => gs.gameId === id
    );
    
    if (!gameStats) return undefined;
    
    const updatedStats = { ...gameStats, ...stats };
    this.gameStatistics.set(gameStats.id, updatedStats);
    return updatedStats;
  }

  async updateGameStreamStatus(id: string, status: 'live' | 'ended'): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    
    const updatedGame = { ...game, streamStatus: status };
    this.games.set(id, updatedGame);
    return updatedGame;
  }

  // Statistics methods
  async getGameStatistics(gameId: string): Promise<GameStatistics | undefined> {
    return Array.from(this.gameStatistics.values()).find(
      (stats) => stats.gameId === gameId
    );
  }

  async createGameStatistics(gameId: string, stats: InsertGameStatistics): Promise<GameStatistics> {
    const id = `gamestats${this.gameStatistics.size + 1}`;
    const newStats: GameStatistics = { ...stats, id, gameId };
    this.gameStatistics.set(id, newStats);
    return newStats;
  }

  async updateGameStatistics(gameId: string, statsData: Partial<GameStatistics>): Promise<GameStatistics | undefined> {
    const stats = Array.from(this.gameStatistics.values()).find(
      (s) => s.gameId === gameId
    );
    if (!stats) return undefined;
    
    const updatedStats = { ...stats, ...statsData };
    this.gameStatistics.set(stats.id, updatedStats);
    return updatedStats;
  }

  async getPlayerStatistics(playerId: string): Promise<Statistics[]> {
    return Array.from(this.statistics.values()).filter(
      (stats) => stats.playerId === playerId
    );
  }

  // Team communication methods
  async getTeamMessages(teamId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((message) => message.teamId === teamId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async addTeamMessage(teamId: string, message: InsertMessage): Promise<Message> {
    const id = `message${this.messages.size + 1}`;
    const newMessage: Message = { 
      ...message, 
      id, 
      teamId,
      timestamp: new Date().toISOString() 
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  // Team events/schedule methods
  async getTeamEvents(teamId: string): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter((event) => event.teamId === teamId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async addTeamEvent(teamId: string, event: InsertEvent): Promise<Event> {
    const id = `event${this.events.size + 1}`;
    const newEvent: Event = { ...event, id, teamId };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(id: string, eventData: Partial<Event>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...eventData };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  // Highlight methods
  async getGameHighlights(gameId: string): Promise<Highlight[]> {
    return Array.from(this.highlights.values())
      .filter((highlight) => highlight.gameId === gameId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  async addGameHighlight(gameId: string, highlight: InsertHighlight): Promise<Highlight> {
    const id = `highlight${this.highlights.size + 1}`;
    const newHighlight: Highlight = { ...highlight, id, gameId };
    this.highlights.set(id, newHighlight);
    return newHighlight;
  }

  // Subscription methods
  async getSubscriptionPlans(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }

  async getUserSubscription(userId: string): Promise<Subscription | undefined> {
    const user = this.users.get(userId);
    if (!user) return undefined;
    
    return this.subscriptions.get(user.subscriptionTier);
  }

  async updateUserSubscription(userId: string, subscription: InsertSubscription): Promise<Subscription> {
    const user = this.users.get(userId);
    if (user) {
      user.subscriptionTier = subscription.id;
      this.users.set(userId, user);
    }
    
    return this.subscriptions.get(subscription.id) as Subscription;
  }
}

export const storage = new MemStorage();
