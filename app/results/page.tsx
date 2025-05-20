import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function ResultsPage() {
  const chairpersonResults = [
    { id: 1, name: "Maria Santos", party: "Kabataan Party", votes: 1245, percentage: 42 },
    { id: 2, name: "Juan Reyes", party: "Bagong Kabataan", votes: 987, percentage: 33 },
    { id: 3, name: "Ana Lim", party: "Progresibong Kabataan", votes: 743, percentage: 25 },
  ]

  const kagawadResults = [
    { id: 1, name: "Carlo Mendoza", party: "Kabataan Party", votes: 1356, percentage: 15, elected: true },
    { id: 2, name: "Bianca Tan", party: "Bagong Kabataan", votes: 1289, percentage: 14, elected: true },
    { id: 3, name: "Miguel Garcia", party: "Progresibong Kabataan", votes: 1187, percentage: 13, elected: true },
    { id: 4, name: "Sophia Cruz", party: "Kabataan Party", votes: 1102, percentage: 12, elected: true },
    { id: 5, name: "Gabriel Santos", party: "Bagong Kabataan", votes: 1045, percentage: 11, elected: true },
    { id: 6, name: "Isabella Reyes", party: "Progresibong Kabataan", votes: 967, percentage: 10, elected: true },
    { id: 7, name: "Rafael Lim", party: "Kabataan Party", votes: 912, percentage: 10, elected: true },
    { id: 8, name: "Andrea Gonzales", party: "Bagong Kabataan", votes: 856, percentage: 9, elected: false },
    { id: 9, name: "Marco Tan", party: "Progresibong Kabataan", votes: 789, percentage: 8, elected: false },
    { id: 10, name: "Patricia Mendoza", party: "Kabataan Party", votes: 723, percentage: 8, elected: false },
  ]

  const totalVotes = chairpersonResults.reduce((sum, candidate) => sum + candidate.votes, 0)
  const voterTurnout = 75.3 // percentage

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
                <Button variant="outline" className="hidden md:flex">
                  Log in
                </Button>
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
          <h1 className="text-3xl font-bold text-blue-900 md:text-4xl">Election Results</h1>
          <p className="mt-4 text-lg text-gray-600">Official results of the Sangguniang Kabataan Elections 2025</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Votes Cast</CardTitle>
              <CardDescription>Number of ballots submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{totalVotes.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voter Turnout</CardTitle>
              <CardDescription>Percentage of registered voters who participated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{voterTurnout}%</div>
              <Progress value={voterTurnout} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Election Status</CardTitle>
              <CardDescription>Current status of the election</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1 text-sm">
                Official Results
              </Badge>
              <p className="text-sm mt-2 text-gray-600">Results certified on July 5, 2025</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chairperson" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chairperson">SK Chairperson</TabsTrigger>
            <TabsTrigger value="kagawad">SK Kagawad</TabsTrigger>
          </TabsList>

          <TabsContent value="chairperson" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>SK Chairperson Results</CardTitle>
                <CardDescription>The candidate with the highest number of votes wins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {chairpersonResults.map((candidate, index) => (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-gray-500">{candidate.party}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{candidate.votes.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{candidate.percentage}%</p>
                        </div>
                      </div>
                      <Progress value={candidate.percentage} className="h-2" />
                      {index === 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Elected</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kagawad" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>SK Kagawad Results</CardTitle>
                <CardDescription>Top 7 candidates with the highest votes are elected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kagawadResults.map((candidate, index) => (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              candidate.elected ? "bg-green-100 text-green-800" : "bg-gray-100"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-gray-500">{candidate.party}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{candidate.votes.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{candidate.percentage}%</p>
                        </div>
                      </div>
                      <Progress value={candidate.percentage} className="h-2" />
                      {candidate.elected && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Elected</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
