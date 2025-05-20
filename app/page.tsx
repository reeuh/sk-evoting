import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-5">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-blue-900 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-blue-600">
              About
            </Link>
            <Link href="/candidates" className="text-sm font-medium text-gray-500 hover:text-blue-600">
              Candidates
            </Link>
            <Link href="/results" className="text-sm font-medium text-gray-500 hover:text-blue-600">
              Results
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="hidden md:flex">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">Register to Vote</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 items-center py-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tight text-blue-900 md:text-5xl lg:text-6xl">
              Sangguniang Kabataan <span className="text-blue-600">E-Voting System</span>
            </h1>
            <p className="text-lg text-gray-600 md:text-xl">
              A secure and transparent platform for the youth to elect their leaders. Exercise your right to vote and
              shape the future of your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Register Now
                </Button>
              </Link>
              <Link href="/candidates">
                <Button size="lg" variant="outline">
                  View Candidates
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/sk.svg"
              alt="Voting illustration"
              className="rounded-lg shadow-lg"
              width={400}
              height={400}
            />
          </div>
        </section>

        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple steps to cast your vote in the SK elections</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create an account with your valid ID and voter information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Complete the registration process by providing your personal details and verifying your identity as an
                  eligible SK voter.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <CardTitle>Choose Candidates</CardTitle>
                <CardDescription>Review candidate profiles and make your selection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse through the list of candidates, read their platforms, and select the leaders who align with
                  your vision for the community.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <CardTitle>Submit Your Vote</CardTitle>
                <CardDescription>Securely cast your ballot and receive confirmation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Submit your vote securely through our encrypted system. You'll receive a confirmation receipt as proof
                  of your participation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-blue-50 rounded-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">Election Schedule</h2>
            <p className="mt-4 text-lg text-gray-600">Mark your calendar for these important dates</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Registration</CardTitle>
                <CardDescription>June 1-15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Register online or at designated registration centers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verification</CardTitle>
                <CardDescription>June 16-20, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Verification of voter eligibility and credentials</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Voting Period</CardTitle>
                <CardDescription>July 1-3, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Cast your vote online from 7:00 AM to 7:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>July 5, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Official announcement of election results</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 px-10 text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-4">SK E-Voting</h3>
              <p className="text-blue-200">
                A secure and transparent electronic voting system for Sangguniang Kabataan elections.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-blue-200 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/candidates" className="text-blue-200 hover:text-white">
                    Candidates
                  </Link>
                </li>
                <li>
                  <Link href="/results" className="text-blue-200 hover:text-white">
                    Results
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-blue-200 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-blue-200">
                For assistance, please contact the SK Election Support Team:
                <br />
                Email: support@skevoting.ph
                <br />
                Hotline: (02) 8-123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>© 2025 SK E-Voting System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
