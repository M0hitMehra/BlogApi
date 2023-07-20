import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//routes
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
app.use("/api/v1", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send(`
    <div>
    <h1>SIte is working click <a href=${process.env.FRONTEND_URL} >here</a> to visit website </h1>
    <div style="font-family: Arial, sans-serif;">
    <h1>API Routes</h1>
    <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/category/create-category" style="color: blue; text-decoration: none;">POST /category/create-category</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/category/update-category" style="color: blue; text-decoration: none;">PUT /category/update-category</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/category/get-categories" style="color: blue; text-decoration: none;">GET /category/get-categories</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/category/delete-category/:name" style="color: blue; text-decoration: none;">DELETE /category/delete-category/:name</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/blogs/create-blog" style="color: blue; text-decoration: none;">POST /blogs/create-blog</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/blogs/update-blog/:_id" style="color: blue; text-decoration: none;">PUT /blogs/update-blog/:_id</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/blogs/delete-blog/:_id" style="color: blue; text-decoration: none;">DELETE /blogs/delete-blog/:_id</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/blogs/get-blogs" style="color: blue; text-decoration: none;">GET /blogs/get-blogs</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/blogs/get-blog/:_id" style="color: blue; text-decoration: none;">GET /blogs/get-blog/:_id</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/register" style="color: blue; text-decoration: none;">POST /register</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/login" style="color: blue; text-decoration: none;">POST /login</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/logout" style="color: blue; text-decoration: none;">GET /logout</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/forgot-password" style="color: blue; text-decoration: none;">POST /forgot-password</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/reset-password/:token" style="color: blue; text-decoration: none;">POST /reset-password/:token</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/profile/update" style="color: blue; text-decoration: none;">POST /profile/update</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/admin/users" style="color: blue; text-decoration: none;">GET /admin/users</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/admin/change-role" style="color: blue; text-decoration: none;">POST /admin/change-role</a></li>
        <li style="margin-bottom: 10px;"><a href="https://blogapp-knhn.onrender.com/api/v1/admin/user/:_id" style="color: blue; text-decoration: none;">GET /admin/user/:_id</a></li>
    </ul>
</div>

</div>


    `);
});

export default app;
