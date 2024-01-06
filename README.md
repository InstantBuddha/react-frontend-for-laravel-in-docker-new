# react-frontend-for-laravel-in-docker-new
The Dockerized frontend to work with the APIs of my laravel in docker new repository

- [react-frontend-for-laravel-in-docker-new](#react-frontend-for-laravel-in-docker-new)
  - [First run](#first-run)
  - [Add necessary libraries](#add-necessary-libraries)
    - [React-bootstrap](#react-bootstrap)
    - [Formik + yup](#formik--yup)


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
```

### React-bootstrap

include in the src/index.js or App.js file

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Formik + yup

Data sanitization needed to be added to ensure empty strings are added as null
The formik styles needed to be imported separately, css should be modified so that it will be less ugly in the future.

**Formik regular expressions need to be cleaned**




