"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Candidate {
  id: string;
  name: string;
  position: string;
}

export default function DeleteCandidatePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  const fetchCandidate = async () => {
    try {
      const response = await fetch(`/api/candidates/${id}`);
      const data = await response.json();
      if (data.success) {
        setCandidate(data.candidate);
      } else {
        setError("Failed to fetch candidate");
      }
    } catch (err) {
      console.error("Error fetching candidate:", err);
      setError("An error occurred while fetching the candidate");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        router.push("/admin/dashboard/candidates");
      } else {
        setError(data.message || "Failed to delete candidate");
      }
    } catch (err) {
      console.error("Error deleting candidate:", err);
      setError("An error occurred while deleting the candidate");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Candidate not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Delete Candidate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete {candidate.name} ({candidate.position})? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/dashboard/candidates")}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 