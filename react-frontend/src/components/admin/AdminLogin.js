import React, { useState } from "react";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FTextInput,
  CustomPasswordInput,
  ADMIN_LOG_IN_FORM_ITEMS,
  VALIDATION_MESSAGES,
} from "../../utils/FormStuff";
import "../../styles/formik-styles.css";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [errorCodeToDisplay, setErrorCodeToDisplay] = useState("Unkown error");

  const fInitValues = ADMIN_LOG_IN_FORM_ITEMS.reduce((result, obj) => {
    return { ...result, [obj.itemName]: obj.initialValue };
  }, {});

  const fValidationSchema = ADMIN_LOG_IN_FORM_ITEMS.reduce((result, item) => {
    if (item.inputType === "email") {
      return {
        ...result,
        [item.itemName]: Yup.string()
          .email(item.regExpWarning)
          .required(VALIDATION_MESSAGES.required),
      };
    }
    if (item.inputType === "password") {
      return {
        ...result,
        [item.itemName]: Yup.string()
          .required(VALIDATION_MESSAGES.required)
          .max(item.max, VALIDATION_MESSAGES.max)
          .min(item.min, VALIDATION_MESSAGES.min)
          .matches(item.regExp, item.regExpWarning),
      };
    }
    return {}; //just to get rid of the warning message
  }, {});

  const formInputs = ADMIN_LOG_IN_FORM_ITEMS.map((item) => {
    if (item.inputType === "email") {
      return (
        <FTextInput
          key={item.itemName}
          label={item.label}
          name={item.itemName}
          type="email"
        />
      );
    }

    if (item.inputType === "password") {
      return (
        <CustomPasswordInput
          key={item.itemName}
          label={item.label}
          name={item.itemName}
          type="text"
        />
      );
    }

    return <></>;
  });

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost/api",
    //withCredentials: true, // Allow sending cookies when making requests
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const handleSubmit = async (credentials, setSubmitting) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      sessionStorage.setItem("token", response.data.authorization.token);
      setSubmitting(false);
      navigate("/view-members");
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        setErrorCodeToDisplay(error.response.status);
      }
      navigate(`/failure/${errorCodeToDisplay}`);
    }
  };

  return (
    <div className="form-page-container">
      <h1>Admin Login</h1>
      <Formik
        initialValues={fInitValues}
        validationSchema={Yup.object(fValidationSchema)}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        <Form>
          {formInputs}
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
export default AdminLogin;
