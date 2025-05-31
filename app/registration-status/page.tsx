"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";

type VerificationStatus = 'pending' | 'verifying' | 'verified' | 'rejected';

export default function RegistrationStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      router.push('/register');
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/verifications/${userId}`);
        const data = await response.json();

        if (data.success) {
          setStatus(data.status);
          setMessage(data.message || '');
          
          if (data.status === 'verified') {
            toast.success("Registration Verified!", {
              description: "Your registration has been verified. You can now proceed to vote.",
            });
            // Redirect to dashboard after a short delay
            setTimeout(() => router.push('/voter/dashboard'), 2000);
          } else if (data.status === 'rejected') {
            toast.error("Registration Rejected", {
              description: data.message || "Please contact the election officer for more information.",
            });
          }
        } else {
          setStatus('pending');
          setMessage('Unable to fetch verification status. Please try again later.');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
        setStatus('pending');
        setMessage('An error occurred while checking your verification status.');
      } finally {
        setLoading(false);
      }
    };

    // Initial check
    checkStatus();

    // Poll for updates every 30 seconds
    const interval = setInterval(checkStatus, 30000);

    return () => clearInterval(interval);
  }, [userId, router]);

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Registration Status
          </CardTitle>
          <CardDescription className="text-center">
            Your registration is being processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="mt-4 text-gray-600">Checking status...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center space-x-2">
                {status === 'verifying' && (
                  <>
                    <Clock className="h-8 w-8 text-yellow-500 animate-spin" />
                    <span className="text-lg font-medium">Verification in Progress</span>
                  </>
                )}
                {status === 'verified' && (
                  <>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <span className="text-lg font-medium">Registration Verified</span>
                  </>
                )}
                {status === 'rejected' && (
                  <>
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <span className="text-lg font-medium">Registration Rejected</span>
                  </>
                )}
              </div>

              {message && (
                <p className="text-center text-gray-600">{message}</p>
              )}

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  Return Home
                </Button>
                {status === 'rejected' && (
                  <Button
                    onClick={() => router.push('/register')}
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 