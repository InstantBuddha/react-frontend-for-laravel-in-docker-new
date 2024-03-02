# react-frontend-for-laravel-in-docker-new
The Dockerized frontend to work with the APIs of my laravel in docker new repository

- [react-frontend-for-laravel-in-docker-new](#react-frontend-for-laravel-in-docker-new)
  - [First run](#first-run)
  - [Add necessary libraries](#add-necessary-libraries)
    - [React-bootstrap](#react-bootstrap)
    - [Formik + yup](#formik--yup)
    - [Redux and protected routes](#redux-and-protected-routes)
      - [Learn Redux](#learn-redux)
      - [Add Redux Persist](#add-redux-persist)
    - [Environment variables](#environment-variables)
  - [React Helmet](#react-helmet)


## First run

You can use the docker compose up command from the root directory, or the following command from the /react-frontend folder.

```docker run -it --rm --name laravel-in-docker-new-react-frontend-1 -p 3000:3000 -v $(pwd):/react-frontend -w /react-frontend node:14-alpine sh -c "npm install && npm start"```

## Add necessary libraries

sh in:

```
docker exec -it laravel-in-docker-new-react-frontend-1 sh
```

Then, add React Router, React Bootstrap, Axios, Formik + Yup
```
npm i react-router-dom
npm install react-bootstrap bootstrap
npm install axios
npm install formik --save
npm install yup --save
npm install redux react-redux
npm install @reduxjs/toolkit
```
Redux thunk did not seem to have been installed with reduc rtk
### React-bootstrap

include in the src/index.js or App.js file

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Formik + yup

Data sanitization needed to be added to ensure empty strings are added as null
The formik styles needed to be imported separately, css should be modified so that it will be less ugly in the future.

### Redux and protected routes

Originally I used SessionStorage for the token. Now I switched to the Redux state, but kept the original code for SessionStorage if I might want to use that later:

In AdminLogin:
```js
const handleSubmit = async (credentials, setSubmitting) => {
    try {
      const response = await authLogin(axiosInstance, credentials);
      dispatch(setAuthenticationStatus(true));
      dispatch(setUserName(credentials.email));
      dispatch(setToken(response.data.authorization.token))
      sessionStorage.setItem("token", response.data.authorization.token); //if I might want to use it instead of Redux
      setSubmitting(false);
      navigate("/view-members");
    }
    //...
}
```

In viewMembers:
```js
const fetchData = async () => {
    const token = sessionStorage.getItem("token");  //if I might want to use it instead of Redux
    await getWithBearerToken(token)
      .then((response) => {
        setMemberArr(response.data.data);
        setIsgetSuccessful(true);
        setIsDataDownloaded(true);
      })
}
```

#### Learn Redux

In the end, I used this:
https://react-redux.js.org/tutorials/quick-start

useful as well:
https://www.taniarascia.com/redux-react-guide/
https://dev.to/collins87mbathi/reactjs-protected-route-m3j

To read later for RDK:

https://redux-toolkit.js.org/introduction/getting-started


#### Add Redux Persist

This does not work:
https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/


### Environment variables

using this:

https://create-react-app.dev/docs/adding-custom-environment-variables/


## React Helmet

Install it:

``` bash
docker exec -it laravel-in-docker-new-react-frontend-1 sh
npm i react-helmet-async
```

In App.js, everything needs to be wrapped inside HelmetProvider

``` javascript
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./components/Home";
import ViewMembers from "./components/admin/ViewMembers";
import Signup from "./components/formik-member-signup/Signup";
import Success from "./components/formik-member-signup/Success";
import Failure from "./components/formik-member-signup/Failure";
import AdminLogin from "./components/admin/AdminLogin";
import BasicCorsTest from "./components/BasicCorsTest";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {  
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route
              path="/view-members"
              element={
                <ProtectedRoute>
                  <ViewMembers />
                </ProtectedRoute>
              }
            />
            <Route path="/member-registration" element={<Signup />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure/:errorCode" element={<Failure />} />
            <Route path="/cors-test" element={<BasicCorsTest />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
```

After that, a HelmetMetaData.js can be created

``` javascript
import React from "react";
import { Helmet } from "react-helmet-async";

export default function HelmetMetaData({ title, description, type}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}

```

And it can be added to every component, for example to Home.js:

``` javascript
import React from "react";
import { Link } from "react-router-dom";
import HelmetMetaData from "./HelmetMetaData";

function Home() {
  const uniqueHelmetMetaData = {
    title: "React Frontend for Laravel in Docker New | Home Page",
    description: "This is the home page",
    type: "webapp",
  };

  return (
    <div>
      <HelmetMetaData {...uniqueHelmetMetaData} />
      <h1>This is Home</h1>

      <Link to="/login">
        <button type="button" className="btn btn-primary">
          Go to Admin User Login
        </button>
      </Link>
      <Link to="/member-registration">
        <button type="button" className="btn btn-primary">
          Go to new Member Registration Form
        </button>
      </Link>
      <Link to="/cors-test">
        <button type="button" className="btn btn-primary">
          Go to Basic CORS test
        </button>
      </Link>
    </div>
  );
}
export default Home;

```

**Formik regular expressions need to be cleaned**
**FORMIK ZIPCODE NEEDS TO BE MODIFIED TO zipcode NO CAMELCASE!!!!**



