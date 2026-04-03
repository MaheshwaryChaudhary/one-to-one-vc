import { Link } from "react-router-dom";
import { useState } from "react";
import { Terminal, Plus, Clock, Calendar, ArrowRight, User, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockSessions = [
  {
    id: "1",
    title: "React Hooks Deep Dive",
    mentor: "Sarah Chen",
    student: "Alex Rivera",
    date: "Today, 3:00 PM",
    status: "live" as const,
    language: "TypeScript",
  },
  {
    id: "2",
    title: "Python Data Structures",
    mentor: "James Liu",
    student: "Maria Santos",
    date: "Tomorrow, 10:00 AM",
    status: "upcoming" as const,
    language: "Python",
  },
  {
    id: "3",
    title: "CSS Grid & Flexbox",
    mentor: "Sarah Chen",
    student: "Alex Rivera",
    date: "Apr 1, 2:00 PM",
    status: "completed" as const,
    language: "CSS",
  },
  {
    id: "4",
    title: "Node.js REST APIs",
    mentor: "James Liu",
    student: "Maria Santos",
    date: "Mar 30, 11:00 AM",
    status: "completed" as const,
    language: "JavaScript",
  },
];

const Dashboard = () => {
  const [role, setRole] = useState<"mentor" | "student">("mentor");

  const statusColor = (s: string) => {
    if (s === "live") return "bg-primary/20 text-primary border-primary/30";
    if (s === "upcoming") return "bg-info/20 text-info border-info/30";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-mono font-bold text-lg text-foreground">CodeMentor</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRole("mentor")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                role === "mentor" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-3 w-3" /> Mentor
            </button>
            <button
              onClick={() => setRole("student")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                role === "student" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="h-3 w-3" /> Student
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {role === "mentor" ? "Sarah" : "Alex"}
              </h1>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                {role === "mentor" ? "3 sessions this week" : "2 sessions scheduled"}
              </p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs">
              <Plus className="h-4 w-4 mr-1" /> New Session
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Sessions", value: "24", icon: Calendar },
              { label: "Hours Logged", value: "36h", icon: Clock },
              { label: role === "mentor" ? "Students" : "Mentors", value: role === "mentor" ? "5" : "2", icon: User },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-mono">{stat.label}</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Sessions */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Sessions</h2>
          <div className="space-y-3">
            {mockSessions.map((session, i) => (
              <Link
                key={session.id}
                to={`/session/${session.id}`}
                className="glass rounded-lg p-4 flex items-center justify-between hover:border-primary/30 transition-colors group block animate-fade-in"
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center">
                    <span className="font-mono text-xs text-primary">{session.language.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{session.title}</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {role === "mentor" ? session.student : session.mentor} · {session.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`text-xs font-mono ${statusColor(session.status)}`}>
                    {session.status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow mr-1.5" />}
                    {session.status}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
