"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type VerificationRequest = {
  id: string;
  name: string;
  email: string;
  age: number;
  barangay: string;
  city: string;
  idType: string;
  idFront: string;
  idBack: string;
  status: 'pending' | 'verifying' | 'verified' | 'rejected';
  createdAt: string;
};

export default function VerificationsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Connect to WebSocket
    const websocket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');
    
    websocket.onopen = () => {
      // Identify as election officer
      websocket.send(JSON.stringify({
        type: 'register',
        userId: `officer_${Date.now()}`
      }));
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_registration') {
        // Fetch updated verification requests
        fetchVerificationRequests();
      }
    };

    setWs(websocket);

    // Initial fetch
    fetchVerificationRequests();

    return () => {
      websocket.close();
    };
  }, []);

  const fetchVerificationRequests = async () => {
    try {
      const response = await fetch('/api/verifications');
      const data = await response.json();
      setRequests(data.requests);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
      toast.error("Error", {
        description: "Failed to fetch verification requests",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (requestId: string, status: 'verified' | 'rejected', message?: string) => {
    if (!ws) return;

    try {
      ws.send(JSON.stringify({
        type: 'verification_update',
        userId: requestId,
        status,
        message
      }));

      // Update local state
      setRequests(requests.map(req => 
        req.id === requestId 
          ? { ...req, status }
          : req
      ));

      toast.success(status === 'verified' ? "Verification Approved" : "Verification Rejected", {
        description: `User has been ${status}`,
      });
    } catch (error) {
      console.error('Error updating verification status:', error);
      toast.error("Error", {
        description: "Failed to update verification status",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Verification Requests</h1>
      
      <div className="grid gap-6">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{request.name}</CardTitle>
                  <CardDescription>{request.email}</CardDescription>
                </div>
                <Badge variant={
                  request.status === 'verified' ? 'success' :
                  request.status === 'rejected' ? 'destructive' :
                  'default'
                }>
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Age:</strong> {request.age}</p>
                  <p><strong>Barangay:</strong> {request.barangay}</p>
                  <p><strong>City:</strong> {request.city}</p>
                  <p><strong>ID Type:</strong> {request.idType}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">ID Front</p>
                    <img 
                      src={request.idFront} 
                      alt="ID Front" 
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium mb-2">ID Back</p>
                    <img 
                      src={request.idBack} 
                      alt="ID Back" 
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={() => handleVerification(request.id, 'verified')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleVerification(request.id, 'rejected', 'ID verification failed')}
                    variant="destructive"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {requests.length === 0 && (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-gray-500">No pending verification requests</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 