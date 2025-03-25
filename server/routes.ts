import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer } from "ws";
import WebSocket from "ws";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Setup WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Broadcast to all connected clients
  const broadcast = (message: any) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  };

  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Handle different message types
        if (data.type === 'scoreboard_update') {
          await storage.updateGameScore(data.gameId, data.homeScore, data.awayScore);
          broadcast({
            type: 'scoreboard_update',
            gameId: data.gameId,
            homeScore: data.homeScore,
            awayScore: data.awayScore
          });
        } else if (data.type === 'game_stat_update') {
          await storage.updateGameStats(data.gameId, data.stats);
          broadcast({
            type: 'game_stat_update',
            gameId: data.gameId,
            stats: data.stats
          });
        } else if (data.type === 'stream_started') {
          await storage.updateGameStreamStatus(data.gameId, 'live');
          broadcast({
            type: 'stream_status',
            gameId: data.gameId,
            status: 'live'
          });
        } else if (data.type === 'stream_ended') {
          await storage.updateGameStreamStatus(data.gameId, 'ended');
          broadcast({
            type: 'stream_status',
            gameId: data.gameId,
            status: 'ended'
          });
        } else if (data.type === 'new_message') {
          const message = await storage.addTeamMessage(data.teamId, data.message);
          broadcast({
            type: 'new_message',
            teamId: data.teamId,
            message
          });
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // API Routes
  app.get('/api/games', async (req, res) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch games' });
    }
  });

  app.get('/api/games/:id', async (req, res) => {
    try {
      const game = await storage.getGameById(req.params.id);
      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch game' });
    }
  });

  app.post('/api/games', async (req, res) => {
    try {
      const newGame = await storage.createGame(req.body);
      res.status(201).json(newGame);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create game' });
    }
  });

  app.put('/api/games/:id', async (req, res) => {
    try {
      const updatedGame = await storage.updateGame(req.params.id, req.body);
      if (!updatedGame) {
        return res.status(404).json({ error: 'Game not found' });
      }
      res.json(updatedGame);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update game' });
    }
  });

  app.get('/api/teams', async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch teams' });
    }
  });

  app.get('/api/teams/:id', async (req, res) => {
    try {
      const team = await storage.getTeamById(req.params.id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch team' });
    }
  });

  app.post('/api/teams', async (req, res) => {
    try {
      const newTeam = await storage.createTeam(req.body);
      res.status(201).json(newTeam);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create team' });
    }
  });

  app.get('/api/teams/:id/players', async (req, res) => {
    try {
      const players = await storage.getPlayersByTeamId(req.params.id);
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch players' });
    }
  });

  app.post('/api/teams/:id/players', async (req, res) => {
    try {
      const newPlayer = await storage.addPlayerToTeam(req.params.id, req.body);
      res.status(201).json(newPlayer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add player' });
    }
  });

  app.put('/api/players/:id', async (req, res) => {
    try {
      const updatedPlayer = await storage.updatePlayer(req.params.id, req.body);
      if (!updatedPlayer) {
        return res.status(404).json({ error: 'Player not found' });
      }
      res.json(updatedPlayer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update player' });
    }
  });

  app.delete('/api/players/:id', async (req, res) => {
    try {
      const success = await storage.deletePlayer(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Player not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete player' });
    }
  });

  app.get('/api/games/:id/statistics', async (req, res) => {
    try {
      const stats = await storage.getGameStatistics(req.params.id);
      if (!stats) {
        return res.status(404).json({ error: 'Game statistics not found' });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch game statistics' });
    }
  });

  app.post('/api/games/:id/statistics', async (req, res) => {
    try {
      const newStats = await storage.createGameStatistics(req.params.id, req.body);
      res.status(201).json(newStats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create game statistics' });
    }
  });

  app.put('/api/games/:id/statistics', async (req, res) => {
    try {
      const updatedStats = await storage.updateGameStatistics(req.params.id, req.body);
      if (!updatedStats) {
        return res.status(404).json({ error: 'Game statistics not found' });
      }
      res.json(updatedStats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update game statistics' });
    }
  });

  app.get('/api/players/:id/statistics', async (req, res) => {
    try {
      const stats = await storage.getPlayerStatistics(req.params.id);
      if (!stats) {
        return res.status(404).json({ error: 'Player statistics not found' });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch player statistics' });
    }
  });

  app.get('/api/teams/:id/messages', async (req, res) => {
    try {
      const messages = await storage.getTeamMessages(req.params.id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch team messages' });
    }
  });

  app.post('/api/teams/:id/messages', async (req, res) => {
    try {
      const newMessage = await storage.addTeamMessage(req.params.id, req.body);
      
      // Broadcast the new message to all connected clients
      broadcast({
        type: 'new_message',
        teamId: req.params.id,
        message: newMessage
      });
      
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add team message' });
    }
  });

  app.get('/api/teams/:id/events', async (req, res) => {
    try {
      const events = await storage.getTeamEvents(req.params.id);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch team events' });
    }
  });

  app.post('/api/teams/:id/events', async (req, res) => {
    try {
      const newEvent = await storage.addTeamEvent(req.params.id, req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add team event' });
    }
  });

  app.put('/api/events/:id', async (req, res) => {
    try {
      const updatedEvent = await storage.updateEvent(req.params.id, req.body);
      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update event' });
    }
  });

  app.get('/api/games/:id/highlights', async (req, res) => {
    try {
      const highlights = await storage.getGameHighlights(req.params.id);
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch highlights' });
    }
  });

  app.post('/api/games/:id/highlights', async (req, res) => {
    try {
      const newHighlight = await storage.addGameHighlight(req.params.id, req.body);
      res.status(201).json(newHighlight);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add highlight' });
    }
  });

  app.get('/api/subscriptions/plans', async (req, res) => {
    try {
      const plans = await storage.getSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subscription plans' });
    }
  });

  app.get('/api/users/:id/subscription', async (req, res) => {
    try {
      const subscription = await storage.getUserSubscription(req.params.id);
      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user subscription' });
    }
  });

  app.post('/api/users/:id/subscription', async (req, res) => {
    try {
      const newSubscription = await storage.updateUserSubscription(req.params.id, req.body);
      res.status(201).json(newSubscription);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update subscription' });
    }
  });

  return httpServer;
}
