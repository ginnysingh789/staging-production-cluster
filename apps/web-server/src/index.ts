import { WebSocketServer } from "ws";
import { client } from "@repo/db/client"

const server = new WebSocketServer({
    port: 3001
});

server.on("connection", async (socket) => {
    try {
        await client.user.create({
            data: {
                username: Math.random().toString(),
                password: Math.random().toString()
            }
        });
        socket.send("Hi there you are connected to the server");
    } catch (error) {
        console.error("Database error:", error);
        socket.send("Connection established but database error occurred");
    }
});

console.log("WebSocket server running on port 3001");