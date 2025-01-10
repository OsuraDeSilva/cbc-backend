import express from "express";
import { getStudent , createStudent, deleteStudent } from "../controllers/studentController.js";
const studentRoutes = express.Router();

studentRoutes.get("/",getStudent)

studentRoutes.post("/",createStudent) 

studentRoutes.delete("/",deleteStudent)

export default studentRoutes;