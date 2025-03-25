import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("fan"),
  teamId: text("team_id"),
  subscriptionTier: text("subscription_tier").notNull().default("free"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Team schema
export const teams = pgTable("teams", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  coachId: text("coach_id").notNull(),
  createdAt: text("created_at"),
  logoUrl: text("logo_url"),
  season: text("season"),
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true
});

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;

// Player schema
export const players = pgTable("players", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  number: text("number").notNull(),
  position: text("position").notNull(),
  teamId: text("team_id").notNull(),
  status: text("status").notNull().default("active"),
  email: text("email"),
  height: text("height"),
  weight: text("weight"),
  year: text("year"),
  avatarUrl: text("avatar_url"),
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;

// Game schema
export const games = pgTable("games", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull(),
  opponent: text("opponent").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  isHome: boolean("is_home").notNull(),
  result: text("result"),
  status: text("status").notNull().default("upcoming"),
  homeScore: integer("home_score").default(0),
  awayScore: integer("away_score").default(0),
  streamUrl: text("stream_url"),
  streamStatus: text("stream_status").notNull().default("not_started"),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
  homeScore: true,
  awayScore: true,
  streamStatus: true
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

// Statistics schema (individual player stats)
export const statistics = pgTable("statistics", {
  id: text("id").primaryKey(),
  playerId: text("player_id").notNull(),
  gameId: text("game_id").notNull(),
  points: integer("points").notNull().default(0),
  rebounds: integer("rebounds").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  steals: integer("steals").notNull().default(0),
  blocks: integer("blocks").notNull().default(0),
  turnovers: integer("turnovers").notNull().default(0),
  fouls: integer("fouls").notNull().default(0),
  minutes: integer("minutes").notNull().default(0),
  fieldGoalsMade: integer("field_goals_made").notNull().default(0),
  fieldGoalsAttempted: integer("field_goals_attempted").notNull().default(0),
  threePointsMade: integer("three_points_made").notNull().default(0),
  threePointsAttempted: integer("three_points_attempted").notNull().default(0),
  freeThrowsMade: integer("free_throws_made").notNull().default(0),
  freeThrowsAttempted: integer("free_throws_attempted").notNull().default(0),
});

export const insertStatisticsSchema = createInsertSchema(statistics).omit({
  id: true
});

export type InsertStatistics = z.infer<typeof insertStatisticsSchema>;
export type Statistics = typeof statistics.$inferSelect;

// Game Statistics schema (team stats for a game)
export const gameStatistics = pgTable("game_statistics", {
  id: text("id").primaryKey(),
  gameId: text("game_id").notNull(),
  teamId: text("team_id").notNull(),
  teamPoints: integer("team_points").notNull().default(0),
  opponentPoints: integer("opponent_points").notNull().default(0),
  fieldGoalsMade: integer("field_goals_made").notNull().default(0),
  fieldGoalsAttempted: integer("field_goals_attempted").notNull().default(0),
  threePointsMade: integer("three_points_made").notNull().default(0),
  threePointsAttempted: integer("three_points_attempted").notNull().default(0),
  freeThrowsMade: integer("free_throws_made").notNull().default(0),
  freeThrowsAttempted: integer("free_throws_attempted").notNull().default(0),
  rebounds: integer("rebounds").notNull().default(0),
  assists: integer("assists").notNull().default(0),
  steals: integer("steals").notNull().default(0),
  blocks: integer("blocks").notNull().default(0),
  turnovers: integer("turnovers").notNull().default(0),
  fouls: integer("fouls").notNull().default(0),
});

export const insertGameStatisticsSchema = createInsertSchema(gameStatistics).omit({
  id: true
});

export type InsertGameStatistics = z.infer<typeof insertGameStatisticsSchema>;
export type GameStatistics = typeof gameStatistics.$inferSelect;

// Event schema (for team schedule)
export const events = pgTable("events", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  gameId: text("game_id"),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Message schema (for team communication)
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull(),
  senderId: text("sender_id").notNull(),
  content: text("content").notNull(),
  timestamp: text("timestamp").notNull(),
  senderName: text("sender_name").notNull(),
  isCoach: boolean("is_coach").notNull().default(false),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Highlight schema (for game highlights)
export const highlights = pgTable("highlights", {
  id: text("id").primaryKey(),
  gameId: text("game_id").notNull(),
  playerId: text("player_id"),
  title: text("title").notNull(),
  timestamp: integer("timestamp").notNull(),
  type: text("type").notNull(),
  url: text("url"),
  thumbnailUrl: text("thumbnail_url"),
  description: text("description"),
});

export const insertHighlightSchema = createInsertSchema(highlights).omit({
  id: true
});

export type InsertHighlight = z.infer<typeof insertHighlightSchema>;
export type Highlight = typeof highlights.$inferSelect;

// Subscription schema
export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  features: text("features").array().notNull(),
  description: text("description").notNull(),
  billingPeriod: text("billing_period").notNull(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true
});

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
