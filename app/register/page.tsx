"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type Role } from "@/lib/roles";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { PasswordInput } from "@/components/ui/password-input";

type RegistrationStatus = "pending" | "verifying" | "verified" | "rejected";

export default function RegisterPage() {
  const router = useRouter();
  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>("pending");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [barangay, setBarangay] = useState("");
  const [barangayError, setBarangayError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [idType, setIdType] = useState("");
  const [idTypeError, setIdTypeError] = useState("");
  const [idFiles, setIdFiles] = useState<FileList | null>(null);
  const [idFilesError, setIdFilesError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const philippinePhoneNumberRegex = /^(?:\+63|0)9\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i;

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please use a valid Gmail or Yahoo email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhoneNumber = (phone: string) => {
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!philippinePhoneNumberRegex.test(phone)) {
      setPhoneError(
        "Please enter a valid Philippine phone number (e.g., 09123456789 or +639123456789)"
      );
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateBirthDate = (date: string) => {
    if (!date) {
      setBirthDateError("Date of birth is required");
      return false;
    }

    const age = calculateAge(date);
    if (age < 15) {
      setBirthDateError("You must be at least 15 years old to register");
      return false;
    }
    if (age > 30) {
      setBirthDateError("You must be under 31 years old to register");
      return false;
    }

    const birthDate = new Date(date);
    if (birthDate > new Date()) {
      setBirthDateError("Date of birth cannot be in the future");
      return false;
    }

    setBirthDateError("");
    return true;
  };

  const validateAddress = (address: string) => {
    if (!address) {
      setAddressError("Complete address is required");
      return false;
    }
    if (address.length < 10) {
      setAddressError("Please enter a more detailed address");
      return false;
    }
    setAddressError("");
    return true;
  };

  const validateCity = (city: string) => {
    if (!city) {
      setCityError("City/Municipality is required");
      return false;
    }
    if (city.length < 3) {
      setCityError("Please enter a valid city/municipality name");
      return false;
    }
    setCityError("");
    return true;
  };

  const validateProvince = (province: string) => {
    if (!province) {
      setProvinceError("Province is required");
      return false;
    }
    if (province.length < 3) {
      setProvinceError("Please enter a valid province name");
      return false;
    }
    setProvinceError("");
    return true;
  };

  const validateBarangay = (barangay: string) => {
    if (!barangay) {
      setBarangayError("Please select your barangay");
      return false;
    }
    setBarangayError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    if (!/[!@#$%^&_]/.test(password)) {
      setPasswordError(
        "Password must contain at least one special character (!@#$%^&*)"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (confirmPwd: string) => {
    if (!confirmPwd) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    }
    if (confirmPwd !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateIdType = (type: string) => {
    if (!type) {
      setIdTypeError("Please select an ID type");
      return false;
    }
    setIdTypeError("");
    return true;
  };

  const validateIdFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      setIdFilesError("Please upload both front and back images of your ID");
      return false;
    }
    if (files.length !== 2) {
      setIdFilesError("Please upload exactly 2 images (front and back of ID)");
      return false;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setIdFilesError("Please upload only image files");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setIdFilesError("Each file must be less than 5MB");
        return false;
      }
    }
    setIdFilesError("");
    return true;
  };

  const validateTerms = (accepted: boolean) => {
    if (!accepted) {
      setTermsError("You must accept the terms to continue");
      return false;
    }
    setTermsError("");
    return true;
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate email, phone number, and birth date before proceeding
      const isEmailValid = validateEmail(email);
      const isPhoneValid = validatePhoneNumber(phoneNumber);
      const isBirthDateValid = validateBirthDate(birthDate);
      if (!isEmailValid || !isPhoneValid || !isBirthDateValid) {
        return;
      }
    } else if (step === 2) {
      // Validate address and voter information before proceeding
      const isAddressValid = validateAddress(address);
      const isCityValid = validateCity(city);
      const isProvinceValid = validateProvince(province);
      const isBarangayValid = validateBarangay(barangay);

      if (
        !isAddressValid ||
        !isCityValid ||
        !isProvinceValid ||
        !isBarangayValid
      ) {
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    // Subscribe to WebSocket for real-time updates
    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "verification_update" &&
        data.userId === localStorage.getItem("temp_user_id")
      ) {
        setRegistrationStatus(data.status);
        setVerificationMessage(data.message);

        if (data.status === "verified") {
          toast.success("Registration Verified!", {
            description:
              "Your registration has been verified. You can now proceed to vote.",
          });
          router.push("/voter/dashboard");
        } else if (data.status === "rejected") {
          toast.error("Registration Rejected", {
            description:
              data.message ||
              "Please contact the election officer for more information.",
          });
        }
      }
    };

    return () => ws.close();
  }, [router]);

  const handleSubmit = async () => {
    // Validate all fields in step 3
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isIdTypeValid = validateIdType(idType);
    const areIdFilesValid = validateIdFiles(idFiles);
    const areTermsAccepted = validateTerms(termsAccepted);

    if (
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isIdTypeValid ||
      !areIdFilesValid ||
      !areTermsAccepted
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setRegistrationStatus("verifying");

    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("birthDate", birthDate);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("province", province);
      formData.append("barangay", barangay);
      formData.append("idType", idType);
      formData.append("role", "voter"); // Default role for new registrations

      if (idFiles) {
        formData.append("idFront", idFiles[0]);
        formData.append("idBack", idFiles[1]);
      }

      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Store temporary user ID for WebSocket updates
        localStorage.setItem("temp_user_id", data.user.id);

        // Show verification pending message
        setRegistrationStatus("verifying");
        setVerificationMessage(
          "Your registration is being reviewed by an election officer. This may take a few minutes."
        );

        toast.info("Registration Submitted", {
          description:
            "Please wait while an election officer verifies your information.",
        });
      } else {
        setSubmitError(
          data.message || "Registration failed. Please try again."
        );
        setRegistrationStatus("pending");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError(
        "An error occurred during registration. Please try again."
      );
      setRegistrationStatus("pending");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (voterData: any) => {
    const response = await fetch("/api/voters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(voterData),
    });
    // handle response, errors, etc.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Register to Vote
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to participate in the SK Elections
          </CardDescription>

          {/* Registration Status Indicator */}
          {registrationStatus !== "pending" && (
            <div className="mt-4 p-4 rounded-lg border">
              <div className="flex items-center space-x-2">
                {registrationStatus === "verifying" && (
                  <>
                    <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
                    <span className="font-medium">
                      Verification in Progress
                    </span>
                  </>
                )}
                {registrationStatus === "verified" && (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Registration Verified</span>
                  </>
                )}
                {registrationStatus === "rejected" && (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Registration Rejected</span>
                  </>
                )}
              </div>
              {verificationMessage && (
                <p className="mt-2 text-sm text-gray-600">
                  {verificationMessage}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <div
              className={`h-1 flex-1 ${
                step >= 1 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div className="mx-2"></div>
            <div
              className={`h-1 flex-1 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div className="mx-2"></div>
            <div
              className={`h-1 flex-1 ${
                step >= 3 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Dela Cruz"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan.delacruz@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  required
                />
                {emailError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{emailError}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="09123456789"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (phoneError) validatePhoneNumber(e.target.value);
                  }}
                  required
                />
                {phoneError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{phoneError}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <Input
                  id="birthdate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    if (birthDateError) validateBirthDate(e.target.value);
                  }}
                  required
                />
                {birthDateError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{birthDateError}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium text-lg">
                Address & Voter Information
              </h3>
              <div className="space-y-2">
                <Label htmlFor="address">Complete Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, Barangay San Jose"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError) validateAddress(e.target.value);
                  }}
                  required
                />
                {addressError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{addressError}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City/Municipality</Label>
                  <Input
                    id="city"
                    placeholder="Manila"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (cityError) validateCity(e.target.value);
                    }}
                    required
                  />
                  {cityError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertDescription>{cityError}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    placeholder="Metro Manila"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      if (provinceError) validateProvince(e.target.value);
                    }}
                    required
                  />
                  {provinceError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertDescription>{provinceError}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="barangay">Barangay</Label>
                <Select
                  value={barangay}
                  onValueChange={(value) => {
                    setBarangay(value);
                    if (barangayError) validateBarangay(value);
                  }}
                >
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
                {barangayError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{barangayError}</AlertDescription>
                  </Alert>
                )}
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
                <PasswordInput
                  id="password"
                  value={password}
                  error={passwordError}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                    if (confirmPassword)
                      validateConfirmPassword(confirmPassword);
                  }}
                  required
                />
                {passwordError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  value={confirmPassword}
                  error={confirmPasswordError}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError)
                      validateConfirmPassword(e.target.value);
                  }}
                  required
                />
                {confirmPasswordError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{confirmPasswordError}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type</Label>
                <Select
                  value={idType}
                  onValueChange={(value) => {
                    setIdType(value);
                    if (idTypeError) validateIdType(value);
                  }}
                >
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
                {idTypeError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{idTypeError}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="idUpload">Upload ID (Front and Back)</Label>
                <Input
                  id="idUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    setIdFiles(e.target.files);
                    if (idFilesError) validateIdFiles(e.target.files);
                  }}
                  required
                />
                {idFilesError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{idFilesError}</AlertDescription>
                  </Alert>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Please upload clear images of both sides of your ID. Max file
                  size: 5MB each.
                </p>
              </div>
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => {
                    setTermsAccepted(checked as boolean);
                    if (termsError) validateTerms(checked as boolean);
                  }}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I confirm that I am a Filipino citizen, 15-30 years old, and
                  eligible to vote in the SK Elections. I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>
              {termsError && (
                <Alert variant="destructive">
                  <AlertDescription>{termsError}</AlertDescription>
                </Alert>
              )}
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
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={nextStep}
            >
              Next
            </Button>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
