import { NextResponse } from "next/server"

// This would be connected to a database in a real application
export async function GET() {
  // Mock data for election results
  const results = {
    totalVotes: 2975,
    voterTurnout: 75.3,
    status: "Official",
    certificationDate: "2025-07-05T14:30:00Z",
    chairperson: [
      { id: 1, name: "Maria Santos", party: "Kabataan Party", votes: 1245, percentage: 42, elected: true },
      { id: 2, name: "Juan Reyes", party: "Bagong Kabataan", votes: 987, percentage: 33, elected: false },
      { id: 3, name: "Ana Lim", party: "Progresibong Kabataan", votes: 743, percentage: 25, elected: false },
    ],
    kagawad: [
      { id: 4, name: "Carlo Mendoza", party: "Kabataan Party", votes: 1356, percentage: 15, elected: true },
      { id: 5, name: "Bianca Tan", party: "Bagong Kabataan", votes: 1289, percentage: 14, elected: true },
      { id: 6, name: "Miguel Garcia", party: "Progresibong Kabataan", votes: 1187, percentage: 13, elected: true },
      { id: 7, name: "Sophia Cruz", party: "Kabataan Party", votes: 1102, percentage: 12, elected: true },
      { id: 8, name: "Gabriel Santos", party: "Bagong Kabataan", votes: 1045, percentage: 11, elected: true },
      { id: 9, name: "Isabella Reyes", party: "Progresibong Kabataan", votes: 967, percentage: 10, elected: true },
      { id: 10, name: "Rafael Lim", party: "Kabataan Party", votes: 912, percentage: 10, elected: true },
      { id: 11, name: "Andrea Gonzales", party: "Bagong Kabataan", votes: 856, percentage: 9, elected: false },
      { id: 12, name: "Marco Tan", party: "Progresibong Kabataan", votes: 789, percentage: 8, elected: false },
      { id: 13, name: "Patricia Mendoza", party: "Kabataan Party", votes: 723, percentage: 8, elected: false },
    ],
  }

  return NextResponse.json(results)
}
