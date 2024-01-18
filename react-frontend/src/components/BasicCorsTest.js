import React from "react";
import axios from "axios";

export default function BasicCorsTest() {

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
  return <div>BasicCorsTest</div>;
}
