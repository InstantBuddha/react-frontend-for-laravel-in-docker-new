import axios from "axios";

export const AXIOS_CREATE_CONFIG = {
  baseURL: "http://localhost/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function getWithBearerToken(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get("http://localhost/api/members", config);
}
