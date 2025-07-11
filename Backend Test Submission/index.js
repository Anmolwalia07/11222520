import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import shorturlRoutes from "./routes/shortUrl.js";
import cors from "cors"
connectDB();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/",(req,res)=>{
  res.json({message:"Hello"})
})

app.use(cors({
  origin:"*"
}))
app.use(express.json());
app.use("/", shorturlRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
