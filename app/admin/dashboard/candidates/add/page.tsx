"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-routes";

// Define types for form state and errors
interface CandidateForm {
  name: string;
  position: string;
  photo: File | null;
  bio: string;
}
interface CandidateFormErrors {
  name?: string;
  position?: string;
  photo?: string;
  bio?: string;
}

export default function AddCandidatePage() {
  const router = useRouter();
  const [form, setForm] = useState<CandidateForm>({
    name: "",
    position: "",
    photo: null,
    bio: "",
  });
  const [errors, setErrors] = useState<CandidateFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const validate = () => {
    const newErrors: CandidateFormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.position.trim()) newErrors.position = "Position is required.";
    if (!form.photo) newErrors.photo = "Photo is required.";
    if (!form.bio.trim()) newErrors.bio = "Biography is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          setErrors((prev) => ({ ...prev, photo: "Invalid file type. Please upload an image." }));
          setForm((prev) => ({ ...prev, photo: null }));
          setPhotoPreview(null);
          return;
        }
        setForm((prev) => ({ ...prev, photo: file }));
        setErrors((prev) => ({ ...prev, photo: undefined }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setForm((prev) => ({ ...prev, photo: null }));
        setPhotoPreview(null);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setErrorMsg("");
    if (!validate()) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("position", form.position);
      formData.append("bio", form.bio);
      if (form.photo) {
        formData.append("photo", form.photo);
      }

      const response = await fetch("/api/candidates", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Candidate added successfully!");
        setForm({ name: "", position: "", photo: null, bio: "" });
        setPhotoPreview(null);
        
        // Redirect to candidate list after a short delay
        setTimeout(() => {
          router.push("/admin/dashboard/candidates");
        }, 1000);
      } else {
        setErrorMsg(data.message || "Failed to add candidate. Please try again.");
      }
    } catch (err) {
      console.error("Error adding candidate:", err);
      setErrorMsg("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute requiredPermission="manage:all_candidates">
      <div className="flex justify-center items-center min-h-[80vh] p-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Add Candidate</CardTitle>
            <CardDescription>Fill out the form to add a new candidate.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitting}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                  required
                  autoComplete="name"
                />
                {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <select
                  id="position"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  disabled={submitting}
                  aria-invalid={!!errors.position}
                  aria-describedby="position-error"
                  required
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Position</option>
                  <option value="Chairperson">Chairperson</option>
                  <option value="Kagawad">Kagawad</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                </select>
                {errors.position && <p id="position-error" className="text-red-500 text-sm mt-1">{errors.position}</p>}
              </div>
              <div>
                <Label htmlFor="photo">Photo</Label>
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={submitting}
                  aria-invalid={!!errors.photo}
                  aria-describedby="photo-error"
                  required
                />
                {photoPreview && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={photoPreview}
                      alt="Candidate Preview"
                      className="max-h-40 rounded shadow border object-contain"
                    />
                  </div>
                )}
                {errors.photo && <p id="photo-error" className="text-red-500 text-sm mt-1">{errors.photo}</p>}
              </div>
              <div>
                <Label htmlFor="bio">Biography</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  disabled={submitting}
                  aria-invalid={!!errors.bio}
                  aria-describedby="bio-error"
                  required
                  rows={4}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.bio && <p id="bio-error" className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>
              <div className="flex justify-between items-center gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                  {submitting ? "Adding..." : "Add Candidate"}
                </Button>
              </div>
              {success && <p className="text-green-600 text-center mt-2">{success}</p>}
              {errorMsg && <p className="text-red-600 text-center mt-2">{errorMsg}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 