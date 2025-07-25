import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";

export const tokenManager = {
  getToken: () => Cookies.get(TOKEN_KEY) || null,

  setToken: (token: string) => {
    // Set cookie with 7 day expiry
    Cookies.set(TOKEN_KEY, token, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  clearToken: () => {
    Cookies.remove(TOKEN_KEY);
  },
};
