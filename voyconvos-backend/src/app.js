import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//routes
import userRoutes from "./routes/user-routes.js"
import loginRoutes from "./routes/login-routes.js"
const app = express();

//settings
app.set("port", 4000);


//middleware(funcion intermedia entre una peticion y respuesta)
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
//routes globales
app.use("/api/users", userRoutes);
app.use("/api/admin", loginRoutes);

export default app;
