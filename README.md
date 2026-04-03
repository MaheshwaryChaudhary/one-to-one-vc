🛠️ Core Technical Pillars
1. Real-Time Signaling & State
The project uses Socket.io to manage the "live" state of a session. It handles user presence, chat messages, and the coordination required to start a video call.

Bi-directional Communication: Low-latency updates for code changes.

Session Management: Uses a Map() object on the server to track active sessions and participant roles.

2. WebRTC Video & Audio
To keep costs low and performance high, video data is sent Peer-to-Peer (P2P).

Signaling: The Node.js server acts as the intermediary to swap "SDP" (Session Description Protocol) offers.

Media Streams: Direct browser-to-browser transmission of MediaStream objects.

3. Collaborative Code Editor
Integrated with the Monaco Editor (the engine behind VS Code), allowing both users to write and debug code simultaneously.

Event-Driven Sync: Every keystroke emits a code-update event.

Syntax Highlighting: Supports multiple languages including JavaScript, TypeScript, and Python.

📦 Key Features
⚡ Instant Room Creation: Generate unique session IDs for private mentorship.

🎥 HD Video Calling: Toggle camera/mic and handle screen sharing.

💬 Integrated Chat: Side-panel for text communication during the call.

🔐 Firebase Security: Firestore rules ensure only the authorized mentor and student can access session data.

🎨 Modern UI: Built with Tailwind CSS, Shadcn UI, and Framer Motion for smooth transitions.

💻 Technical Implementation
Server-Side (Socket logic)
This snippet shows how the server coordinates the "Join" event for a session:

TypeScript
// server.ts logic
io.on("connection", (socket) => {
  socket.on("join-session", ({ sessionId, userId, role }) => {
    socket.join(sessionId);
    
    // Initialize session store if new
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, { code: "", users: new Map() });
    }
    
    const session = sessions.get(sessionId);
    session.users.set(userId, { id: userId, role, socketId: socket.id });

    // Notify others in the room
    io.to(sessionId).emit("user-list-update", Array.from(session.users.values()));
  });
});
Client-Side (WebRTC Signaling)
The frontend handles the "Signal" event to establish the video connection:

TypeScript
// VideoCall.tsx snippet
socket.on("signal", async ({ signal, from }) => {
  if (signal.type === 'offer') {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("signal", { sessionId, signal: answer, to: from });
  }
});
🚀 Getting Started
1. Environment Setup
Create a .env file in the root:

Code snippet
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
NODE_ENV=development
2. Installation & Run
PowerShell
# Install dependencies
npm install

# Build the frontend
npm run build

# Start the development server (Windows PowerShell)
$env:NODE_ENV="development"; tsx server.ts
📂 Project Structure
/src/components: UI components like VideoCall.tsx and Editor.tsx.

/server.ts: The Express + Socket.io backend.

/firebase.ts: Authentication and Firestore configuration.

/dist: Production-ready static files after running npm run build.
