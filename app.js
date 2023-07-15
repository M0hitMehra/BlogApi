import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'DELETE']
}))


//routes
import userRoutes from "./routes/userRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
app.use("/api/v1" , userRoutes)
app.use("/api/v1/blogs" , blogRoutes)
app.use("/api/v1/category" , categoryRoutes)

export default app;
