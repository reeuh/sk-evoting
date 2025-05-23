import React from "react";
import useSWR from "swr";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Candidates() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR("/api/candidates", fetcher, { refreshInterval: 5000 });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Management</CardTitle>
        <CardDescription>Manage candidate profiles and information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/admin/dashboard/candidates/add") }>
            <UserCheck className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </div>
        {isLoading && <p>Loading candidates...</p>}
        {error && <p className="text-red-500">Failed to load candidates.</p>}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(data).flat().map((candidate: any) => (
              <Card key={candidate.id} className="border shadow-sm">
                <CardContent className="flex flex-col items-center p-4">
                  <img
                    src={candidate.image || "/placeholder.svg?height=150&width=150"}
                    alt={candidate.name}
                    className="w-24 h-24 object-cover rounded-full mb-2 border"
                  />
                  <h3 className="font-semibold text-lg text-center">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 text-center">{candidate.position}</p>
                  {candidate.bio && <p className="text-xs text-gray-500 mt-2 text-center">{candidate.bio}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {!isLoading && data && Object.values(data).flat().length === 0 && (
          <p className="text-gray-500 text-center mt-4">No candidates found.</p>
        )}
      </CardContent>
    </Card>
  );
} 