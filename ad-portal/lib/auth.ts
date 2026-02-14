export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isAuthenticated") === "true";
};

export const getUserEmail = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("userEmail");
};

export const logout = (): void => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userEmail");
};
