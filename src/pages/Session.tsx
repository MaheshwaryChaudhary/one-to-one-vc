import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Terminal, Video, VideoOff, Mic, MicOff, Monitor,
  Send, Code2, ChevronLeft, Settings, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockCode = `// Collaborative session - React Hooks
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage example
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      // Fetch search results
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};`;

const mockChat = [
  { sender: "Sarah (Mentor)", text: "Let's look at how useDebounce works", time: "3:02 PM", isMentor: true },
  { sender: "Alex (Student)", text: "Why do we need the cleanup function?", time: "3:03 PM", isMentor: false },
  { sender: "Sarah (Mentor)", text: "Great question! Without it, the timeout would still fire even after a new keystroke", time: "3:04 PM", isMentor: true },
  { sender: "System", text: "Screen sharing started", time: "3:05 PM", isSystem: true },
  { sender: "Alex (Student)", text: "That makes sense! So it prevents stale updates", time: "3:06 PM", isMentor: false },
];

const Session = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [language, setLanguage] = useState("typescript");

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-mono text-sm text-foreground">React Hooks Deep Dive</span>
          <Badge variant="outline" className="text-xs font-mono bg-primary/20 text-primary border-primary/30">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow mr-1.5" />
            Live
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono text-muted-foreground">
            <Users className="h-3 w-3 mr-1" /> 2 online
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Code editor */}
        <div className="flex-1 flex flex-col border-r border-border">
          {/* Editor toolbar */}
          <div className="h-10 border-b border-border flex items-center px-4 gap-3 shrink-0">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">session.tsx</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="ml-auto text-xs font-mono bg-secondary text-secondary-foreground border border-border rounded px-2 py-1"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            <div className="flex">
              {/* Line numbers */}
              <div className="pr-4 text-right select-none shrink-0">
                {mockCode.split("\n").map((_, i) => (
                  <div key={i} className="text-muted-foreground/40 text-xs leading-6">{i + 1}</div>
                ))}
              </div>
              {/* Code content */}
              <pre className="flex-1 text-foreground/90 leading-6 text-xs">
                <code>{mockCode}</code>
              </pre>
            </div>
            {/* Simulated cursor */}
            <div className="mt-2 flex items-center gap-2">
              <div className="w-0.5 h-4 bg-accent animate-pulse-glow" />
              <span className="text-xs text-accent font-mono">Sarah's cursor</span>
            </div>
          </div>
        </div>

        {/* Right: Video + Chat */}
        <div className="w-80 flex flex-col shrink-0">
          {/* Video section */}
          <div className="p-3 border-b border-border space-y-2 shrink-0">
            {/* Mentor video */}
            <div className="aspect-video bg-secondary rounded-md relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-mono text-primary text-sm font-bold">SC</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="text-xs font-mono text-foreground/80 bg-background/60 backdrop-blur px-1.5 py-0.5 rounded">
                  Sarah (Mentor)
                </span>
              </div>
            </div>
            {/* Student video */}
            <div className="aspect-video bg-secondary rounded-md relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-mono text-accent text-sm font-bold">AR</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="text-xs font-mono text-foreground/80 bg-background/60 backdrop-blur px-1.5 py-0.5 rounded">
                  Alex (Student)
                </span>
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${micOn ? "text-foreground" : "text-destructive bg-destructive/10"}`}
                onClick={() => setMicOn(!micOn)}
              >
                {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full ${videoOn ? "text-foreground" : "text-destructive bg-destructive/10"}`}
                onClick={() => setVideoOn(!videoOn)}
              >
                {videoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-foreground">
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 font-mono text-xs"
              >
                Leave
              </Button>
            </div>
          </div>

          {/* Chat section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-border shrink-0">
              <span className="text-xs font-mono text-muted-foreground">Session Chat</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {mockChat.map((msg, i) => (
                <div key={i} className={`animate-fade-in ${msg.isSystem ? "text-center" : ""}`} style={{ animationDelay: `${0.05 * i}s` }}>
                  {msg.isSystem ? (
                    <span className="text-xs font-mono text-muted-foreground/60 bg-secondary/50 px-2 py-0.5 rounded">
                      {msg.text}
                    </span>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-mono font-medium ${msg.isMentor ? "text-primary" : "text-accent"}`}>
                          {msg.sender}
                        </span>
                        <span className="text-xs text-muted-foreground/40">{msg.time}</span>
                      </div>
                      <p className="text-sm text-foreground/80">{msg.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Message input */}
            <div className="p-3 border-t border-border shrink-0">
              <div className="flex items-center gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary text-foreground text-sm px-3 py-2 rounded-md border border-border placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
                <Button size="icon" className="h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
