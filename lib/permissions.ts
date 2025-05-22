import { prisma } from "@/lib/db"

// Define the permission types
export type Permission =
  // Voter permissions
  | "view:candidates"
  | "view:election_info"
  | "cast:vote"
  | "view:personal_vote_receipt"
  | "view:public_results"
  | "update:personal_profile"

  // Candidate permissions
  | "manage:own_profile"
  | "view:voter_statistics"

  // Administrator permissions
  | "manage:all_users"
  | "manage:all_candidates"
  | "manage:election_settings"
  | "view:all_voter_data"
  | "generate:reports"
  | "manage:system_settings"
  | "view:audit_logs"
  | "manage:announcements"

  // Election Officer permissions
  | "verify:voters"
  | "manage:voting_period"
  | "view:live_statistics"
  | "resolve:voter_issues"
  | "generate:voter_lists"
  | "manage:polling_stations"

  // Auditor permissions
  | "view:audit_logs"
  | "view:vote_counts"
  | "view:system_logs"
  | "generate:audit_reports"
  | "verify:vote_integrity"

// Define the role types
export type Role = "voter" | "candidate" | "administrator" | "election_officer" | "auditor"

// Function to check if a user has a specific permission
export async function userHasPermission(userId: string, permission: Permission): Promise<boolean> {
  const count = await prisma.user.count({
    where: {
      id: userId,
      userRoles: {
        some: {
          role: {
            rolePermissions: {
              some: {
                permission: {
                  name: permission,
                },
              },
            },
          },
        },
      },
    },
  })

  return count > 0
}

// Function to get all permissions for a user
export async function getUserPermissions(userId: string): Promise<Permission[]> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userRoles: {
        select: {
          role: {
            select: {
              rolePermissions: {
                select: {
                  permission: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  if (!user) return []

  const permissions = new Set<Permission>()

  user.userRoles.forEach((userRole) => {
    userRole.role.rolePermissions.forEach((rolePermission) => {
      permissions.add(rolePermission.permission.name as Permission)
    })
  })

  return Array.from(permissions)
}

// Function to get all roles for a user
export async function getUserRoles(userId: string): Promise<Role[]> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userRoles: {
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!user) return []

  return user.userRoles.map((userRole) => userRole.role.name as Role)
}

// Function to log an action in the audit log
export async function logAudit(action: string, details?: string, userId?: string, req?: Request): Promise<void> {
  try {
    let ipAddress: string | undefined
    let userAgent: string | undefined

    if (req) {
      ipAddress = req.headers.get("x-forwarded-for")?.toString() || req.headers.get("x-real-ip")?.toString()
      userAgent = req.headers.get("user-agent")?.toString()
    }

    await prisma.auditLog.create({
      data: {
        action,
        details,
        userId,
        ipAddress,
        userAgent,
      },
    })
  } catch (error) {
    console.error("Failed to log audit:", error)
  }
}
