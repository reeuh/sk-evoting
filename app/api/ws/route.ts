import { WebSocketServer, WebSocket } from 'ws';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const wss = new WebSocketServer({ port: 3001 });

// Store connected clients
const clients = new Map<string, WebSocket>();

type WebSocketMessage = {
  type: 'register' | 'verification_update' | 'new_registration';
  userId: string;
  status?: 'pending' | 'verifying' | 'verified' | 'rejected';
  message?: string;
  timestamp?: string;
};

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', async (message: Buffer) => {
    try {
      const data = JSON.parse(message.toString()) as WebSocketMessage;
      
      // Handle different message types
      switch (data.type) {
        case 'register':
          // Store client connection with user ID
          clients.set(data.userId, ws);
          
          // Notify election officers of new registration
          broadcastToOfficers({
            type: 'new_registration',
            userId: data.userId,
            timestamp: new Date().toISOString()
          });
          break;

        case 'verification_update':
          if (!data.userId || !data.status) return;
          
          // Update user verification status
          await prisma.user.update({
            where: { id: data.userId },
            data: { 
              verificationStatus: data.status,
              verificationMessage: data.message || null
            }
          });

          // Notify the user of verification status
          const userWs = clients.get(data.userId);
          if (userWs) {
            userWs.send(JSON.stringify({
              type: 'verification_update',
              status: data.status,
              message: data.message
            }));
          }
          break;
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    // Remove client from map
    for (const [userId, client] of clients.entries()) {
      if (client === ws) {
        clients.delete(userId);
        break;
      }
    }
  });
});

// Helper function to broadcast to all election officers
function broadcastToOfficers(message: WebSocketMessage) {
  const messageStr = JSON.stringify(message);
  for (const [userId, client] of clients.entries()) {
    // Only send to election officers
    if (userId.startsWith('officer_')) {
      client.send(messageStr);
    }
  }
}

export async function GET() {
  return NextResponse.json({ status: 'WebSocket server is running' });
} 