import { useField } from "formik";

const STANDARD_REGEX_ERROR_MSG = `A mező kitöltése nem megfelelő. Lehet nem megengedett speciális karaktereket használtál?`;

const REGEX_NO_ANGLE_BRACKETS = /^(?!.*(?:<|>|&lt;|&gt;)).*$/;

export const SIGN_UP_FORM_ITEMS = [
  {
    itemName: "name",
    inputType: "text",
    initialValue: "",
    label: "Név",
    placeholder: "Pl: John Doe",
    max: 30,
    min: 8,
    regExp: REGEX_NO_ANGLE_BRACKETS,
    regExpWarning: STANDARD_REGEX_ERROR_MSG,
    required: true,
  },
  {
    itemName: "email",
    inputType: "email",
    initialValue: "",
    label: "Email",
    placeholder: "Pl: john.doe@example.com",
    min: 8,
    //regExp: /^[a-zA-Z0-9_!#&+.-]{3,32}@[a-zA-Z0-9.-]{3,32}\.[a-zA-Z]{2,6}$/,
    regExpWarning: STANDARD_REGEX_ERROR_MSG,
    required: true,
  },
  {
    itemName: "phone_number",
    inputType: "text",
    initialValue: "",
    label: "Mobil",
    placeholder: "Pl: 0036301234567",
    max: 20,
    min: 7,
    regExp: /^\d{7,20}$/,
    regExpWarning: `A mező kitöltése nem megfelelő. Csak számokat használj, szóköz és más karakterek nélkül!`,
    required: true,
  },
  {
    itemName: "zipcode",
    inputType: "text",
    initialValue: "",
    label: "Irányítószám",
    placeholder: "Pl: 1234",
    max: 15,
    min: 4,
    regExp: /^[A-Za-z0-9 -]{4,15}$/,
    regExpWarning: STANDARD_REGEX_ERROR_MSG,
    required: false,
  },
  {
    itemName: "city",
    inputType: "text",
    initialValue: "",
    label: "Település",
    placeholder: "Pl: Budapest",
    max: 40,
    min: 2,
    regExp: /^[\p{L}'\-.\s]{2,20}$/u,
    regExpWarning: STANDARD_REGEX_ERROR_MSG,
    required: false,
  },
  {
    itemName: "address",
    inputType: "text",
    initialValue: "",
    label: "Cím",
    placeholder: "Pl: Fő utca 1. I. em. 3.",
    max: 40,
    min: 5,
    regExp: /^(?=.*\p{L})[a-zA-Z0-9\p{L}.,/'\-\s]{5,40}$/u,
    regExpWarning: STANDARD_REGEX_ERROR_MSG,
    required: false,
  },
  {
    itemName: "comment",
    inputType: "text",
    initialValue: "",
    label: "Megjegyzés",
    placeholder: "",
    max: 100,
    min: 5,
    regExp: /^[0-9\p{L}.,:!?\s]{5,100}$/u,
    regExpWarning: STANDARD_REGEX_ERROR_MSG,
    required: false,
  },
  {
    itemName: "consent",
    inputType: "checkbox",
    initialValue: false,
    label: `Adatkezelési hozzájárulás: „Tudomásul veszem, hogy a OurOrganization a beiratkozást követően, felhasználja itt közölt adataimat.”`,
    required: true,
    requiredWarning: `Az adatkezelési hozzájárulás elfogadása kötelező.`,
  },
  {
    itemName: "is_subscribed_to_mailing_list",
    inputType: "checkbox",
    initialValue: false,
    label: `Igényt tartok arra, hogy a OurOrganization részemre tájékoztató hírlevelet küldjön az általam megadott email címre.`,
    required: false,
  },
];

export const ADMIN_LOG_IN_FORM_ITEMS = [
  {
    itemName: "email",
    inputType: "email",
    initialValue: "",
    label: "Email",
    regExp: /^[a-zA-Z0-9_!#&+.-]{3,32}@[a-zA-Z0-9.-]{3,32}\.[a-zA-Z]{2,6}$/,
    regExpWarning: STANDARD_REGEX_ERROR_MSG,
    required: true,
  },
  {
    itemName: "password",
    inputType: "password",
    initialValue: "",
    label: "Password",
    max: 16,
    min: 6,
    regExp: /\S/,
    regExpWarning: `A mező kitöltése nem megfelelő.`,
    required: true,
  },
];

export const VALIDATION_MESSAGES = {
  max: `Meghaladtad a beírható karakterek maximum mennyiségét.`,
  min: `Nem írtál be elegendő karaktert.`,
  required: `A mező kitöltése kötelező!`,
};

export const FTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const CustomPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} type="password" />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const FCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
