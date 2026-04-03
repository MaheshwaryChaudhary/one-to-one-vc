import { Link } from "react-router-dom";
import { Code2, Video, MessageSquare, Users, ArrowRight, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Code2,
    title: "Shared Code Editor",
    description: "Real-time collaborative coding with cursor sync, syntax highlighting, and multi-language support.",
  },
  {
    icon: Video,
    title: "Video Conferencing",
    description: "Crystal-clear 1-on-1 video calls with screen sharing and camera controls.",
  },
  {
    icon: MessageSquare,
    title: "Session Chat",
    description: "In-session messaging with code snippet support and system notifications.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Distinct mentor and student experiences tailored to each role's needs.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-mono font-bold text-lg text-foreground">CodeMentor</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(160_84%_50%/0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(265_80%_65%/0.06),transparent_60%)]" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 mb-8 animate-fade-in">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">Real-time collaboration</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Code together.
            <br />
            <span className="gradient-text">Learn faster.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            1-on-1 mentorship sessions with shared code editing, video calls, and real-time chat — all in one place.
          </p>
          
          <div className="flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono glow-primary">
                Start a Session <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/session/demo">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-mono">
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Terminal preview */}
          <div className="mt-16 max-w-2xl mx-auto glass rounded-lg overflow-hidden animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="text-xs font-mono text-muted-foreground ml-2">session.ts</span>
            </div>
            <div className="p-6 font-mono text-sm text-left">
              <div className="text-muted-foreground">
                <span className="text-accent">const</span> <span className="text-info">session</span> = <span className="text-accent">await</span> createSession({"{"}
              </div>
              <div className="pl-4 text-muted-foreground">
                mentor: <span className="text-primary">"@sarah_dev"</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                student: <span className="text-primary">"@alex_learns"</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                features: [<span className="text-primary">"code"</span>, <span className="text-primary">"video"</span>, <span className="text-primary">"chat"</span>]
              </div>
              <div className="text-muted-foreground">{"}"});</div>
              <div className="mt-2">
                <span className="text-muted-foreground">// </span>
                <span className="text-primary animate-pulse-glow">▊</span>
                <span className="text-muted-foreground"> Session is live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything you need to <span className="gradient-text">mentor & learn</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
            Built for developers, by developers. Every feature designed for productive 1-on-1 sessions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass rounded-lg p-6 hover:border-primary/30 transition-colors group animate-fade-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <f.icon className="h-8 w-8 text-primary mb-4 group-hover:text-accent transition-colors" />
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">CodeMentor</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">Built for devs</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
