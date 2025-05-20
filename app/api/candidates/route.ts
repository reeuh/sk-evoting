import { NextResponse } from "next/server"

// This would be connected to a database in a real application
export async function GET() {
  // Mock data for candidates
  const candidates = {
    chairperson: [
      {
        id: 1,
        name: "Maria Santos",
        position: "SK Chairperson",
        party: "Kabataan Party",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Youth empowerment, education, and community development",
        achievements: ["Student Council President", "Youth Leadership Award", "Community Service Volunteer"],
      },
      {
        id: 2,
        name: "Juan Reyes",
        position: "SK Chairperson",
        party: "Bagong Kabataan",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Sports development, anti-drug campaign, and environmental protection",
        achievements: ["Varsity Team Captain", "Environmental Advocate", "Peer Counselor"],
      },
      {
        id: 3,
        name: "Ana Lim",
        position: "SK Chairperson",
        party: "Progresibong Kabataan",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Digital literacy, mental health awareness, and youth entrepreneurship",
        achievements: ["Tech Club Founder", "Mental Health Advocate", "Young Entrepreneur"],
      },
    ],
    kagawad: [
      {
        id: 4,
        name: "Carlo Mendoza",
        position: "SK Kagawad",
        party: "Kabataan Party",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Sports programs and youth health initiatives",
        achievements: ["Basketball Team Captain", "Health Volunteer", "Youth Leader"],
      },
      {
        id: 5,
        name: "Bianca Tan",
        position: "SK Kagawad",
        party: "Bagong Kabataan",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Arts and culture programs for youth",
        achievements: ["Arts Club President", "Cultural Ambassador", "Community Theater Director"],
      },
      {
        id: 6,
        name: "Miguel Garcia",
        position: "SK Kagawad",
        party: "Progresibong Kabataan",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Educational support and scholarship programs",
        achievements: ["Honor Student", "Peer Tutor", "Scholarship Foundation Volunteer"],
      },
      {
        id: 7,
        name: "Sophia Cruz",
        position: "SK Kagawad",
        party: "Kabataan Party",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Youth mental health and wellness programs",
        achievements: ["Psychology Student", "Peer Counselor", "Mental Health Advocate"],
      },
      {
        id: 8,
        name: "Gabriel Santos",
        position: "SK Kagawad",
        party: "Bagong Kabataan",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Technology and digital skills training",
        achievements: ["Computer Science Student", "Coding Camp Organizer", "Tech Volunteer"],
      },
      {
        id: 9,
        name: "Isabella Reyes",
        position: "SK Kagawad",
        party: "Progresibong Kabataan",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Environmental conservation and sustainability",
        achievements: ["Environmental Science Student", "Tree Planting Organizer", "Climate Advocate"],
      },
      {
        id: 10,
        name: "Rafael Lim",
        position: "SK Kagawad",
        party: "Kabataan Party",
        image: "/placeholder.svg?height=150&width=150",
        platform: "Community service and volunteerism",
        achievements: ["Red Cross Volunteer", "Community Outreach Coordinator", "Youth Service Award"],
      },
    ],
  }

  return NextResponse.json(candidates)
}
