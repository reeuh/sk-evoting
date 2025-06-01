"use client";

import { useEffect, useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Candidate {
  id: string;
  name: string;
  position: string;
  photo: string;
  bio: string;
  createdAt: string;
}

export default function CandidatesPage() {
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
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-600"
              >
                <path d="m9 12 2 2 4-4" />
                <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
                <path d="M22 19H2" />
              </svg>
              <span className="text-xl font-bold text-blue-600">SK E-Voting</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-900 md:text-4xl">Candidates</h1>
          <p className="mt-4 text-lg text-gray-600">
            Meet the candidates running for the Sangguniang Kabataan positions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="overflow-hidden">
              <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
                <img
                  src={candidate.photo || "/placeholder.svg"}
                  alt={candidate.name}
                  className="object-cover"
                  width={150}
                  height={150}
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{candidate.name}</CardTitle>
                    <CardDescription>{candidate.position}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Bio:</h4>
                  <p className="text-sm text-gray-600">{candidate.bio}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/candidates/${candidate.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-blue-200">© 2025 SK E-Voting System. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-4">
              <Link href="/about" className="text-blue-200 hover:text-white text-sm">
                About
              </Link>
              <Link href="/privacy" className="text-blue-200 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-200 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-blue-200 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
