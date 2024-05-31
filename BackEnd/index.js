import express, { request, response } from "express";
import cors from "cors"; //Asegurate de haberlo descargado en el proyecto
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./Routes/BooksRoutes.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow all Origins with deafult of cors(*)
app.use(cors());

//Option 2: Allow custom origins
/*
app.use(
    cors({
        origin: 'http://localhost:5555',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('This is a Book-store developed with MERN');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });          
    })
    .catch((error)=>{
        console.log(error);
    })