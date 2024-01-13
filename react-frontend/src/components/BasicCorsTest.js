import React from "react";
import axios from "axios";

export default function BasicCorsTest() {
  /*const axiosInstance = axios.create({
    baseURL: "http://localhost/api",
  });
  axiosInstance
    .post("/corstest")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/

  const TEST_PERSON = {
    name: "Test Joe Two",
    email: "test1@jggg.kss",
    phone_number: "0036123456789",
    zipcode: "1123",
    city: "Budipest",
    address: "11 Something street",
    comment:
      "Lorem ipsum something longgggggggggggggggggggggggggggggggggggggggggggggggg",
    mailing_list: "0",
  };

  const axiosInstance = axios.create({
    baseURL: "http://localhost/api",
  });

  axiosInstance
    .post("/corstest"/*, TEST_PERSON*/)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  return <div>BasicCorsTest</div>;
}
