import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticationStatus,
  setToken,
  setUserName,
} from "../redux/slice/userSlice";
import { API_BASE_URL } from "../services/ApiServices";
import HelmetMetaData from "./HelmetMetaData";

export default function BasicCorsTest() {
  const corsTestOnly = () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost/api",
      //withCredentials: true,  // not needed, furthermore it should be FALSE!!! maybe only with https
    });

    axiosInstance
      .post("/corstest")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const ping = () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost/api",
      //withCredentials: true,  // not needed, furthermore it should be FALSE!!! maybe only with https
    });

    axiosInstance
      .get("/ping")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const dispatch = useDispatch();
  const TEST_USER_CREDENTIALS = {
    email: "testerone@example.com",
    password: "testPassword",
  };

  async function authLogin(credentials) {
    const apiUrl = `${API_BASE_URL}/auth/login`;

    return axios.post(apiUrl, credentials);
  }

  const handleSubmit = async (credentials) => {
    try {
      const response = await authLogin(credentials);
      //console.log(response);
      dispatch(setAuthenticationStatus(true));
      dispatch(setUserName(credentials.email));
      dispatch(setToken(response.data.token));
      console.log(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const token = useSelector((state) => state.user.token);

  async function logUserOut(token) {
    const apiUrl = `${API_BASE_URL}/auth/logout`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("token: ", token);
    return axios.post(apiUrl, null, config);
  }

  const logOut = async () => {
    await logUserOut(token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status) {
          console.log(error.response.status);
          return;
        }
        console.log("Unknown error");
      });
  };

  const uniqueHelmetMetaData = {
    title: "React Frontend for Laravel in Docker New | Basic CORS Test",
    description: "This is a basic CORS test",
    type: "webapp",
  };

  return (
    <div>
      <HelmetMetaData {...uniqueHelmetMetaData} />
      <h1>BasicCorsTest</h1>
      <button type="button" className="btn btn-primary" onClick={corsTestOnly}>
        CORS test only
      </button>

      <button type="button" className="btn btn-primary" onClick={ping}>
        Ping
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          handleSubmit(TEST_USER_CREDENTIALS);
        }}
      >
        Test login
      </button>
      <button type="button" className="btn btn-primary" onClick={logOut}>
        Log out
      </button>
    </div>
  );
}
