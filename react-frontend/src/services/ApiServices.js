import axios from "axios";

export const API_BASE_URL = "http://localhost/api";

export const AXIOS_CREATE_CONFIG = {
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function getWithBearerToken(token) {
  const apiUrl = `${API_BASE_URL}/members`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get(apiUrl, config);
}

export async function authLogin(axiosInstance, credentials) {
  const apiUrl = `${API_BASE_URL}/auth/login`;

  return axiosInstance.post(apiUrl, credentials);
}

export async function postMembersRegistration(axiosInstance, sanitizedValues) {
  const apiUrl = `${API_BASE_URL}/members`;

  return axiosInstance.post(apiUrl, sanitizedValues);
}
