import express from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware to parse the body of the request
app.use(express.json());

//Middleware to allow CORS
// Options 1: Allow all origins with deafult of cors(*)
app.use(cors());
// Options 2: Allow only specific origins or custom orgins
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET, POST, PUT, DELETE"],
//     allowedHeaders: ["Content-Type"],
// }));    

app.get("/", (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome")
})

app.use("/books", booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database")
        app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })