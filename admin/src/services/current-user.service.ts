import type { ICurrentUser, IUser, IEmployee } from "@/types";

export class CurrentUserService {
  private currentUser: ICurrentUser | null;

  constructor(currentUser: ICurrentUser | null = null) {
    this.currentUser = currentUser;
  }

  // --------------------------------------------------------
  // Core
  // --------------------------------------------------------
  getUser(): IUser | null {
    return this.currentUser?.user ?? null;
  }

  getEmployee(): IEmployee | null {
    return this.currentUser?.employee ?? null;
  }

  // --------------------------------------------------------
  // Helpers
  // --------------------------------------------------------

  /** Full name from employee */
  getFullName(): string | null {
    const emp = this.getEmployee();
    if (!emp) return null;

    const full = `${emp.firstName ?? ""} ${emp.lastName ?? ""}`.trim();
    return full.length > 0 ? full : null;
  }

  /** First name only */
  getFirstName(): string | null {
    return this.getEmployee()?.firstName ?? null;
  }

  /** Last name only */
  getLastName(): string | null {
    return this.getEmployee()?.lastName ?? null;
  }

  getEmployeeId(): string | null {
    return this.getEmployee()?.id ?? null;
  }

  getEmail(): string | null {
    return this.getUser()?.email ?? null;
  }

  /** Get profile image URL */
  getProfileImageUrl(): string | null {
    return this.getEmployee()?.profileUrl ?? null;
  }

  /**
   * Display name priority:
   * 1) Full Name
   * 2) Employee ID
   * 3) Email
   */
  getDisplayName(): string {
    return (
      this.getFullName() ?? this.getEmployeeId() ?? this.getEmail() ?? "User"
    );
  }

  /**
   * Get user initials for avatar
   */
  getInitials(): string {
    const fullName = this.getFullName();
    if (fullName) {
      const names = fullName.split(" ");
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return fullName.substring(0, 2).toUpperCase();
    }

    const displayName = this.getDisplayName();
    return displayName.substring(0, 2).toUpperCase();
  }

  /**
   * Check if user has a profile image
   */
  hasProfileImage(): boolean {
    return this.getProfileImageUrl() !== null;
  }
}
