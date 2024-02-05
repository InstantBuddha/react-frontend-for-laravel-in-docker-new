import axios from "axios";

export const API_BASE_URL = "http://localhost/api";

export const AXIOS_CREATE_CONFIG = {
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const mainAxiosInstance = axios.create(AXIOS_CREATE_CONFIG);

export async function getWithBearerToken(token) {
  const apiUrl = `${API_BASE_URL}/members`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get(apiUrl, config);
}

export async function authLogin(credentials) {
  const apiUrl = `${API_BASE_URL}/auth/login`;

  return mainAxiosInstance.post(apiUrl, credentials);
}

export async function logUserOut(token) {
  const apiUrl = `${API_BASE_URL}/auth/logout`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return mainAxiosInstance.post(apiUrl, null, config);
}

export async function postMembersRegistration(sanitizedValues) {
  const apiUrl = `${API_BASE_URL}/register-new-member`;

  return mainAxiosInstance.post(apiUrl, sanitizedValues);
}
