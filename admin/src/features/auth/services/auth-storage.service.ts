import type { RememberedUserData } from "@/features/auth/types";

const STORAGE_KEY = "bkia_web_admin_remembered_user";
const EXPIRY_DAYS = 30;

class AuthStorageService {
  /**
   * Save user data to localStorage
   */
  saveUser(userData: RememberedUserData): boolean {
    try {
      if (!userData.user || !userData.user.email) {
        return false;
      }

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + EXPIRY_DAYS);

      const dataToStore = {
        userData,
        expiresAt: expirationDate.toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      return true;
    } catch (error) {
      console.error("Failed to save user data:", error);
      return false;
    }
  }

  /**
   * Get user data from localStorage
   */
  getUser(): RememberedUserData | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const { userData, expiresAt } = JSON.parse(stored);

      // Check if expired
      if (new Date() > new Date(expiresAt)) {
        this.clearUser();
        return null;
      }

      // Validate required fields
      if (!userData.user || !userData.user.email) {
        this.clearUser();
        return null;
      }

      return userData;
    } catch (error) {
      console.error("Failed to get user data:", error);
      this.clearUser();
      return null;
    }
  }

  /**
   * Clear user data
   */
  clearUser(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear user data:", error);
    }
  }

  /**
   * Check if user exists
   */
  hasUser(): boolean {
    return this.getUser() !== null;
  }
}

export const authStorageService = new AuthStorageService();
