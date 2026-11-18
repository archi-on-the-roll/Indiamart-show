const AUTH_KEY = "bagstore_user";

export function login(username: string): void {
  localStorage.setItem(AUTH_KEY, username);
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getUser(): string | null {
  return localStorage.getItem(AUTH_KEY);
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}
