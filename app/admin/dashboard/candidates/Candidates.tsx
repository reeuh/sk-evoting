import React from "react";
import useSWR from "swr";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Candidates() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR("/api/candidates", fetcher, { refreshInterval: 5000 });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this candidate?")) return;

    try {
      const response = await fetch(`/api/candidates/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        mutate(); // Refresh the candidates list
      } else {
        alert(data.message || "Failed to delete candidate");
      }
    } catch (err) {
      console.error("Error deleting candidate:", err);
      alert("An error occurred while deleting the candidate");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Management</CardTitle>
        <CardDescription>Manage candidate profiles and information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/admin/dashboard/candidates/add")}>
            <UserCheck className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </div>
        {isLoading && <p>Loading candidates...</p>}
        {error && <p className="text-red-500">Failed to load candidates.</p>}
        {data?.candidates && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.candidates.map((candidate: any) => (
              <Card key={candidate.id} className="border shadow-sm">
                <CardContent className="flex flex-col items-center p-4">
                  <img
                    src={candidate.photo || "/placeholder.svg?height=150&width=150"}
                    alt={candidate.name}
                    className="w-24 h-24 object-cover rounded-full mb-2 border"
                  />
                  <h3 className="font-semibold text-lg text-center">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 text-center">{candidate.position}</p>
                  {candidate.bio && <p className="text-xs text-gray-500 mt-2 text-center line-clamp-2">{candidate.bio}</p>}
                  <div className="flex gap-2 mt-4">
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
                      onClick={() => handleDelete(candidate.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {!isLoading && data?.candidates && data.candidates.length === 0 && (
          <p className="text-gray-500 text-center mt-4">No candidates found.</p>
        )}
      </CardContent>
    </Card>
  );
} 