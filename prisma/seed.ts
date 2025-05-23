import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clean up existing data
  await prisma.vote.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.candidate.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.role.deleteMany({});

  // Create permissions
  const permissions = [
    { name: "view:dashboard" },
    { name: "create:vote" },
    { name: "view:results" },
    { name: "manage:users" },
    { name: "manage:roles" },
    { name: "manage:permissions" },
    { name: "view:audit_logs" },
    { name: "generate:reports" },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: {
        name: permission.name,
      },
    });
  }

  // Create roles with their permissions
  const roles = [
    {
      name: "voter",
      permissions: ["view:dashboard", "create:vote", "view:results"],
    },
    {
      name: "candidate",
      permissions: ["view:dashboard", "view:results"],
    },
    {
      name: "administrator",
      permissions: [
        "view:dashboard",
        "manage:users",
        "manage:roles",
        "manage:permissions",
        "view:results",
        "generate:reports",
      ],
    },
    {
      name: "election_officer",
      permissions: [
        "view:dashboard",
        "manage:users",
        "view:results",
        "generate:reports",
      ],
    },
    {
      name: "auditor",
      permissions: [
        "view:dashboard",
        "view:audit_logs",
        "view:results",
        "generate:reports",
      ],
    },
  ];

  for (const role of roles) {
    const rolePermissions = await prisma.permission.findMany({
      where: {
        name: {
          in: role.permissions,
        },
      },
    });

    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        permissions: {
          connect: rolePermissions.map((p) => ({ id: p.id })),
        },
      },
      create: {
        name: role.name,
        permissions: {
          connect: rolePermissions.map((p) => ({ id: p.id })),
        },
      },
    });
  }

  // Create users with their roles
  const users = [
    {
      email: "voter@example.com",
      name: "Juan Dela Cruz",
      password: "password123",
      roles: ["voter"],
      barangay: "San Jose",
      city: "Manila",
    },
    {
      email: "candidate@example.com",
      name: "Maria Santos",
      password: "password123",
      roles: ["voter", "candidate"],
      barangay: "San Jose",
      city: "Manila",
    },
    {
      email: "admin@example.com",
      name: "Admin User",
      password: "password123",
      roles: ["administrator"],
      barangay: "San Jose",
      city: "Manila",
    },
    {
      email: "officer@example.com",
      name: "Election Officer",
      password: "password123",
      roles: ["election_officer"],
      barangay: "San Jose",
      city: "Manila",
    },
    {
      email: "auditor@example.com",
      name: "System Auditor",
      password: "password123",
      roles: ["auditor"],
      barangay: "San Jose",
      city: "Manila",
    },
  ];

  for (const user of users) {
    const hashedPassword = await hash(user.password, 10);
    const userRoles = await prisma.role.findMany({
      where: {
        name: {
          in: user.roles,
        },
      },
    });

    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        hashedPassword,
        barangay: user.barangay,
        city: user.city,
        roles: {
          connect: userRoles.map((r) => ({ id: r.id })),
        },
      },
    });

    // Create candidate profile for user with candidate role
    if (user.roles.includes("candidate")) {
      await prisma.candidate.create({
        data: {
          name: user.name,
          position: "Kagawad",
          photo: "/placeholder.svg?height=150&width=150",
          bio: "Education and Youth Development",
        },
      });
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
