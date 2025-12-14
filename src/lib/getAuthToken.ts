import { decrypt } from "@/lib/session";

export const getAuthToken = () => {
  if (typeof document === "undefined") return null;

  const encryptedToken = document.cookie
    .split("; ")
    .find(row => row.startsWith("authToken="))
    ?.split("=")[1];

  if (!encryptedToken) return null;

  try {
    return decrypt(encryptedToken);
  } catch {
    return null;
  }
};
