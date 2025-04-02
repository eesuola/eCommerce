import express from 'express';


const routes = express.Router();


import { registration} from '../controller/authentication.js';


routes.post("/register", registration);
// routes.post("/login", login);


export default routes;