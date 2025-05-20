"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Register to Vote</CardTitle>
          <CardDescription className="text-center">
            Create an account to participate in the SK Elections
          </CardDescription>
          <div className="flex justify-between items-center mt-4">
            <div className={`h-1 flex-1 ${step >= 1 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div className="mx-2"></div>
            <div className={`h-1 flex-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
            <div className="mx-2"></div>
            <div className={`h-1 flex-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Juan" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Dela Cruz" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="juan.delacruz@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="09123456789" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input id="birthdate" type="date" required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Address & Voter Information</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Complete Address</Label>
                <Input id="address" placeholder="123 Main St, Barangay San Jose" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City/Municipality</Label>
                  <Input id="city" placeholder="Manila" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input id="province" placeholder="Metro Manila" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="barangay">Barangay</Label>
                <Select>
                  <SelectTrigger id="barangay">
                    <SelectValue placeholder="Select barangay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barangay1">Barangay 1</SelectItem>
                    <SelectItem value="barangay2">Barangay 2</SelectItem>
                    <SelectItem value="barangay3">Barangay 3</SelectItem>
                    <SelectItem value="barangay4">Barangay 4</SelectItem>
                    <SelectItem value="barangay5">Barangay 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="precinct">Precinct Number (if known)</Label>
                <Input id="precinct" placeholder="Optional" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Account Setup</h3>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type</Label>
                <Select>
                  <SelectTrigger id="idType">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National ID</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers">Driver's License</SelectItem>
                    <SelectItem value="postal">Postal ID</SelectItem>
                    <SelectItem value="school">School ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idUpload">Upload ID (Front and Back)</Label>
                <Input id="idUpload" type="file" multiple required />
                <p className="text-xs text-gray-500 mt-1">
                  Please upload clear images of both sides of your ID. Max file size: 5MB each.
                </p>
              </div>
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I confirm that I am a Filipino citizen, 15-30 years old, and eligible to vote in the SK Elections. I
                  agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>
                  .
                </Label>
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
              <Button variant="outline">Cancel</Button>
            </Link>
          )}

          {step < 3 ? (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700">Complete Registration</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
