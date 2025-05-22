"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function VotingPage() {
  const [selectedCandidates, setSelectedCandidates] = useState({
    chairperson: "",
    kagawad: [] as string[],
  })
  const [step, setStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [voteSubmitted, setVoteSubmitted] = useState(false)

  const handleChairpersonSelect = (value: string) => {
    setSelectedCandidates({
      ...selectedCandidates,
      chairperson: value,
    })
  }

  const handleKagawadSelect = (value: string) => {
    const currentSelections = [...selectedCandidates.kagawad]

    if (currentSelections.includes(value)) {
      // Remove if already selected
      setSelectedCandidates({
        ...selectedCandidates,
        kagawad: currentSelections.filter((id) => id !== value),
      })
    } else if (currentSelections.length < 7) {
      // Add if less than 7 selections
      setSelectedCandidates({
        ...selectedCandidates,
        kagawad: [...currentSelections, value],
      })
    }
  }

  const isKagawadSelected = (value: string) => {
    return selectedCandidates.kagawad.includes(value)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const openConfirmation = () => {
    setShowConfirmation(true)
  }

  const submitVote = () => {
    // Here you would normally send the vote to the server
    setVoteSubmitted(true)
    setShowConfirmation(false)
  }

  if (voteSubmitted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-center">Vote Successfully Cast!</CardTitle>
            <CardDescription className="text-center">
              Thank you for participating in the Sangguniang Kabataan elections.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              Your vote has been securely recorded. A confirmation has been sent to your registered email address.
            </p>
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle>Receipt Number</AlertTitle>
              <AlertDescription className="font-mono">
                SK-2025-
                {Math.floor(Math.random() * 1000000)
                  .toString()
                  .padStart(6, "0")}
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4">
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
            <div>
              <p className="text-sm font-medium">Voter: Juan Dela Cruz</p>
              <p className="text-xs text-gray-500">Barangay San Jose, Manila</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Official Ballot</CardTitle>
              <Badge variant="outline" className="bg-blue-50">
                SK Elections 2025
              </Badge>
            </div>
            <CardDescription>Select your candidates for the Sangguniang Kabataan positions</CardDescription>
            <div className="flex justify-between items-center mt-4">
              <div className={`h-2 flex-1 ${step >= 1 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div className="mx-2"></div>
              <div className={`h-2 flex-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
              <div className="mx-2"></div>
              <div className={`h-2 flex-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-900 mb-2">SK Chairperson</h3>
                  <p className="text-sm text-gray-600 mb-4">Select ONE (1) candidate</p>

                  <RadioGroup value={selectedCandidates.chairperson} onValueChange={handleChairpersonSelect}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                        <RadioGroupItem value="maria-santos" id="maria-santos" />
                        <Label htmlFor="maria-santos" className="flex flex-1 items-center gap-4 cursor-pointer">
                          <img
                            src="/placeholder.svg?height=50&width=50"
                            alt="Maria Santos"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">Maria Santos</p>
                            <p className="text-sm text-gray-500">Kabataan Party</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                        <RadioGroupItem value="juan-reyes" id="juan-reyes" />
                        <Label htmlFor="juan-reyes" className="flex flex-1 items-center gap-4 cursor-pointer">
                          <img
                            src="/placeholder.svg?height=50&width=50"
                            alt="Juan Reyes"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">Juan Reyes</p>
                            <p className="text-sm text-gray-500">Bagong Kabataan</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                        <RadioGroupItem value="ana-lim" id="ana-lim" />
                        <Label htmlFor="ana-lim" className="flex flex-1 items-center gap-4 cursor-pointer">
                          <img
                            src="/placeholder.svg?height=50&width=50"
                            alt="Ana Lim"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">Ana Lim</p>
                            <p className="text-sm text-gray-500">Progresibong Kabataan</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-900 mb-2">SK Kagawad</h3>
                  <p className="text-sm text-gray-600 mb-2">Select up to SEVEN (7) candidates</p>
                  <p className="text-sm font-medium text-blue-600 mb-4">
                    Selected: {selectedCandidates.kagawad.length}/7
                  </p>

                  <div className="space-y-3">
                    {[
                      { id: "carlo-mendoza", name: "Carlo Mendoza", party: "Kabataan Party" },
                      { id: "bianca-tan", name: "Bianca Tan", party: "Bagong Kabataan" },
                      { id: "miguel-garcia", name: "Miguel Garcia", party: "Progresibong Kabataan" },
                      { id: "sophia-cruz", name: "Sophia Cruz", party: "Kabataan Party" },
                      { id: "gabriel-santos", name: "Gabriel Santos", party: "Bagong Kabataan" },
                      { id: "isabella-reyes", name: "Isabella Reyes", party: "Progresibong Kabataan" },
                      { id: "rafael-lim", name: "Rafael Lim", party: "Kabataan Party" },
                      { id: "andrea-gonzales", name: "Andrea Gonzales", party: "Bagong Kabataan" },
                      { id: "marco-tan", name: "Marco Tan", party: "Progresibong Kabataan" },
                      { id: "patricia-mendoza", name: "Patricia Mendoza", party: "Kabataan Party" },
                    ].map((candidate) => (
                      <div
                        key={candidate.id}
                        className={`flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 ${
                          isKagawadSelected(candidate.id) ? "border-blue-500 bg-blue-50" : ""
                        }`}
                        onClick={() => handleKagawadSelect(candidate.id)}
                      >
                        <Checkbox
                          id={candidate.id}
                          checked={isKagawadSelected(candidate.id)}
                          disabled={selectedCandidates.kagawad.length >= 7 && !isKagawadSelected(candidate.id)}
                        />
                        <Label htmlFor={candidate.id} className="flex flex-1 items-center gap-4 cursor-pointer">
                          <img
                            src="/placeholder.svg?height=50&width=50"
                            alt={candidate.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-gray-500">{candidate.party}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-900 mb-4">Review Your Selections</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">SK Chairperson</h4>
                      {selectedCandidates.chairperson ? (
                        <div className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                          <img
                            src="/placeholder.svg?height=50&width=50"
                            alt="Selected Chairperson"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">
                              {selectedCandidates.chairperson === "maria-santos" && "Maria Santos"}
                              {selectedCandidates.chairperson === "juan-reyes" && "Juan Reyes"}
                              {selectedCandidates.chairperson === "ana-lim" && "Ana Lim"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedCandidates.chairperson === "maria-santos" && "Kabataan Party"}
                              {selectedCandidates.chairperson === "juan-reyes" && "Bagong Kabataan"}
                              {selectedCandidates.chairperson === "ana-lim" && "Progresibong Kabataan"}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>No selection</AlertTitle>
                          <AlertDescription>You have not selected a candidate for SK Chairperson.</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">SK Kagawad ({selectedCandidates.kagawad.length}/7)</h4>
                      {selectedCandidates.kagawad.length > 0 ? (
                        <div className="space-y-2">
                          {selectedCandidates.kagawad.map((id) => {
                            const candidateInfo: { name: string; party: string } = {
                              "carlo-mendoza": { name: "Carlo Mendoza", party: "Kabataan Party" },
                              "bianca-tan": { name: "Bianca Tan", party: "Bagong Kabataan" },
                              "miguel-garcia": { name: "Miguel Garcia", party: "Progresibong Kabataan" },
                              "sophia-cruz": { name: "Sophia Cruz", party: "Kabataan Party" },
                              "gabriel-santos": { name: "Gabriel Santos", party: "Bagong Kabataan" },
                              "isabella-reyes": { name: "Isabella Reyes", party: "Progresibong Kabataan" },
                              "rafael-lim": { name: "Rafael Lim", party: "Kabataan Party" },
                              "andrea-gonzales": { name: "Andrea Gonzales", party: "Bagong Kabataan" },
                              "marco-tan": { name: "Marco Tan", party: "Progresibong Kabataan" },
                              "patricia-mendoza": { name: "Patricia Mendoza", party: "Kabataan Party" },
                            }[id as keyof {
                              "carlo-mendoza": { name: string; party: string };
                              "bianca-tan": { name: string; party: string };
                              "miguel-garcia": { name: string; party: string };
                              "sophia-cruz": { name: string; party: string };
                              "gabriel-santos": { name: string; party: string };
                              "isabella-reyes": { name: string; party: string };
                              "rafael-lim": { name: string; party: string };
                              "andrea-gonzales": { name: string; party: string };
                              "marco-tan": { name: string; party: string };
                              "patricia-mendoza": { name: string; party: string };
                            }] || { name: "Unknown", party: "Unknown" }

                            return (
                              <div key={id} className="flex items-center gap-3 p-2 border rounded-lg bg-white">
                                <img
                                  src="/placeholder.svg?height=40&width=40"
                                  alt="Selected Kagawad"
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                                <div>
                                  <p className="font-medium">{candidateInfo?.name}</p>
                                  <p className="text-xs text-gray-500">{candidateInfo?.party}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>No selection</AlertTitle>
                          <AlertDescription>You have not selected any candidates for SK Kagawad.</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <Link href="/">
                <Button variant="outline">Exit</Button>
              </Link>
            )}

            {step < 3 ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={nextStep}
                disabled={step === 1 && !selectedCandidates.chairperson}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={openConfirmation}
                disabled={!selectedCandidates.chairperson && selectedCandidates.kagawad.length === 0}
              >
                Submit Ballot
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Once submitted, your vote cannot be changed. Please review your selections carefully.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                By clicking "Confirm", you are casting your official vote for the SK Elections 2025.
              </AlertDescription>
            </Alert>
            <p className="text-sm text-gray-600">
              Your vote is confidential and secure. A receipt will be sent to your registered email address.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Go Back
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={submitVote}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
