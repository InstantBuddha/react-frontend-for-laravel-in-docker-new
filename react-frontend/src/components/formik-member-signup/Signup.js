import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  FTextInput,
  FCheckbox,
  SIGN_UP_FORM_ITEMS,
  VALIDATION_MESSAGES,
} from "../../utils/FormStuff";
import "../../styles/formik-styles.css";
import { useNavigate } from "react-router-dom";
import { postMembersRegistration } from "../../services/ApiServices";

export default function Signup() {
  const fInitValues = SIGN_UP_FORM_ITEMS.reduce((result, obj) => {
    return { ...result, [obj.itemName]: obj.initialValue };
  }, {});

  const fValidationSchema = SIGN_UP_FORM_ITEMS.reduce((result, item) => {
    if (item.inputType === "text") {
      let schema = Yup.string()
        .max(item.max, VALIDATION_MESSAGES.max)
        .min(item.min, VALIDATION_MESSAGES.min)
        .matches(item.regExp, item.regExpWarning);

      if (item.required) {
        schema = schema.required(VALIDATION_MESSAGES.required);
      }

      return {
        ...result,
        [item.itemName]: schema,
      };
    }
    if (item.inputType === "email") {
      return {
        ...result,
        [item.itemName]: Yup.string()
          .email(item.regExpWarning)
          .required(VALIDATION_MESSAGES.required),
      };
    }
    if (item.inputType === "checkbox") {
      let schema = Yup.boolean();

      if (item.required) {
        schema = schema
          .required(VALIDATION_MESSAGES.required)
          .oneOf([true], item.requiredWarning);
      }

      return { ...result, [item.itemName]: schema };
    }
    return {}; //just to get rid of the warning message
  }, {});

  const formInputs = SIGN_UP_FORM_ITEMS.map((item) => {
    if (item.inputType === "text") {
      return (
        <FTextInput
          key={item.itemName}
          label={item.label}
          name={item.itemName}
          type="text"
        />
      );
    }

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

    if (item.inputType === "checkbox") {
      return (
        <FCheckbox key={item.itemName} name={item.itemName}>
          {item.label}
        </FCheckbox>
      );
    }

    return <></>;
  });

  const navigate = useNavigate();

  const handleSubmit = async (credentials, setSubmitting) => {
    const sanitizedValues = Object.fromEntries(
      Object.entries(credentials).filter(([key, value]) => value !== "")
    );

    try {
      await postMembersRegistration(sanitizedValues);
      setSubmitting(false);
      navigate("/success");
    } catch (error) {
      setSubmitting(false);
      if (error.response.status) {
        navigate(`/failure/${error.response.status}`);
        return;
      }
      navigate(`/failure/${"Unkown_error"}`);
    }
  };

  return (
    <div className="form-page-container">
      <h1>Jelentkezz!</h1>
      <Formik
        initialValues={fInitValues}
        validationSchema={Yup.object(fValidationSchema)}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        <Form>
          {formInputs}
          <button type="submit">Jelentkezés elküldése</button>
        </Form>
      </Formik>
    </div>
  );
}
