// src/utils/auth.js

// Get the auth token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Save the token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Remove the token
export const removeToken = () => {
  localStorage.removeItem("token");
};

// ✅ Save user info
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// ✅ Get user info
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ Logout utility
export const logout = () => {
  removeToken();
  localStorage.removeItem("user");
};
