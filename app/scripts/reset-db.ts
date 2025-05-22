/**
 * Script to reset the database and re-seed it
 * Usage: npx ts-node scripts/reset-db.ts
 */

import { PrismaClient } from "@prisma/client"
import { execSync } from "child_process"
import { red, green, yellow, blue } from "colorette"

const prisma = new PrismaClient()

async function resetDb() {
  try {
    console.log(yellow("⚠️ WARNING: This will reset the entire database and reseed it."))
    console.log(yellow("All existing data will be lost."))

    // Add a small delay to give time to Ctrl+C if needed
    console.log(blue("Starting in 5 seconds... Press Ctrl+C to cancel."))
    await new Promise((resolve) => setTimeout(resolve, 5000))

    console.log(blue("🗑️ Resetting database..."))

    // Reset the database schema
    await prisma.$executeRawUnsafe("DROP SCHEMA public CASCADE")
    await prisma.$executeRawUnsafe("CREATE SCHEMA public")
    await prisma.$executeRawUnsafe("GRANT ALL ON SCHEMA public TO postgres")
    await prisma.$executeRawUnsafe("GRANT ALL ON SCHEMA public TO public")

    console.log(blue("🔄 Pushing schema..."))
    execSync("npx prisma db push", { stdio: "inherit" })

    console.log(blue("🌱 Seeding database..."))
    execSync("npx prisma db seed", { stdio: "inherit" })

    console.log(green("✅ Database has been reset and seeded successfully!"))
  } catch (error) {
    console.error(red("❌ Error resetting database:"))
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

resetDb()
