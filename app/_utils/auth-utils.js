// Get the authentication token from localStorage
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

// Clear the authentication token (for logout)
export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
};
