"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  position: string;
  photo: string;
  bio: string;
  createdAt: string;
}

export default function CandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch("/api/candidates");
      const data = await response.json();
      if (data.success) {
        setCandidates(data.candidates);
      } else {
        setError("Failed to fetch candidates");
      }
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError("An error occurred while fetching candidates");
    } finally {
      setLoading(false);
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <Button onClick={() => router.push("/admin/dashboard/candidates/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Candidate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={candidate.photo}
                  alt={candidate.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <CardTitle className="text-xl">{candidate.name}</CardTitle>
              <p className="text-gray-600">{candidate.position}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">{candidate.bio}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/dashboard/candidates/edit/${candidate.id}`)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => router.push(`/admin/dashboard/candidates/delete/${candidate.id}`)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 