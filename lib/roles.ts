// Define the base permission types
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

// Map roles to their permissions
export const rolePermissions: Record<Role, Permission[]> = {
  voter: [
    "view:candidates",
    "view:election_info",
    "cast:vote",
    "view:personal_vote_receipt",
    "view:public_results",
    "update:personal_profile",
  ],

  candidate: [
    "view:candidates",
    "view:election_info",
    "cast:vote",
    "view:personal_vote_receipt",
    "view:public_results",
    "update:personal_profile",
    "manage:own_profile",
    "view:voter_statistics",
  ],

  administrator: [
    "view:candidates",
    "view:election_info",
    "view:public_results",
    "manage:all_users",
    "manage:all_candidates",
    "manage:election_settings",
    "view:all_voter_data",
    "generate:reports",
    "manage:system_settings",
    "view:audit_logs",
    "manage:announcements",
  ],

  election_officer: [
    "view:candidates",
    "view:election_info",
    "view:public_results",
    "verify:voters",
    "manage:voting_period",
    "view:live_statistics",
    "resolve:voter_issues",
    "generate:voter_lists",
    "manage:polling_stations",
    "view:audit_logs",
  ],

  auditor: [
    "view:candidates",
    "view:election_info",
    "view:public_results",
    "view:audit_logs",
    "view:vote_counts",
    "view:system_logs",
    "generate:audit_reports",
    "verify:vote_integrity",
  ],
}

// Helper function to check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role].includes(permission)
}

// Helper function to check if a user has a specific permission
export function userHasPermission(userRoles: Role[], permission: Permission): boolean {
  return userRoles.some((role) => hasPermission(role, permission))
}
