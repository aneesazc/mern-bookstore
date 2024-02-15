import express from "express"
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { config } from "dotenv";
config();

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

const port = process.env.PORT || 5555;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("App connected to database")
        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })