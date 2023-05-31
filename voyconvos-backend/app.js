import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//routes
import userRoutes from "./routes/userRoutes.js";
const app = express();

//settings
app.set("port", 3306);


//middleware(funcion intermedia entre una peticion y respuesta)
app.use(morgan("dev"));
app.use(express.json());
//app.use(cors());
app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));
//routes
app.use("/api/users", userRoutes);

export default app;
