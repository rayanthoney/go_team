import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import LiveStream from "@/pages/livestream";
import FilmRoom from "@/pages/film-room";
import Stats from "@/pages/stats";
import Team from "@/pages/team";
import Schedule from "@/pages/schedule";
import Settings from "@/pages/settings";
import Subscription from "@/pages/subscription";
import AppShell from "@/components/layout/app-shell";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/stream" component={LiveStream} />
      <Route path="/film-room" component={FilmRoom} />
      <Route path="/stats" component={Stats} />
      <Route path="/team" component={Team} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/settings" component={Settings} />
      <Route path="/subscription" component={Subscription} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Router />
      </AppShell>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
