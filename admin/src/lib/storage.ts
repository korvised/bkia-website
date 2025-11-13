const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const REMEMBER_ME = 'remember_me';

class StorageService {
  private rememberMe: boolean = false;

  constructor() {
    const remember = this.getLocalStorage(REMEMBER_ME);
    this.rememberMe = remember === 'true';
  }

  // Session storage helpers
  private getSessionStorage(key: string) {
    return sessionStorage.getItem(key);
  }

  private setSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  private removeSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  // Local storage helpers
  private getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  private setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  // Remember me
  setRememberMe(remember: boolean) {
    this.rememberMe = remember;
    this.setLocalStorage(REMEMBER_ME, remember.toString());
  }

  // Token storage
  storeTokens(token: string) {
    if (this.rememberMe) {
      this.setLocalStorage(ACCESS_TOKEN, token);
      this.setLocalStorage(REFRESH_TOKEN, token);
    } else {
      this.setSessionStorage(ACCESS_TOKEN, token);
      this.setSessionStorage(REFRESH_TOKEN, token);
    }
  }

  getTokens(): { accessToken: string | null; refreshToken: string | null } {
    const get = this.rememberMe
      ? this.getLocalStorage.bind(this)
      : this.getSessionStorage.bind(this);
    return {
      accessToken: get(ACCESS_TOKEN),
      refreshToken: get(REFRESH_TOKEN)
    };
  }

  removeTokens() {
    this.removeSessionStorage(ACCESS_TOKEN);
    this.removeSessionStorage(REFRESH_TOKEN);
    this.removeLocalStorage(ACCESS_TOKEN);
    this.removeLocalStorage(REFRESH_TOKEN);
    this.removeLocalStorage(REMEMBER_ME);
    this.rememberMe = false;
  }
}

export const storage = new StorageService();
