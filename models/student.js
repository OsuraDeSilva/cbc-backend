import mongoose from "mongoose";

const studentschema = mongoose.Schema({
 name : String,
 age : Number,
 gender : String    
});
    
const Student = mongoose.model("student",studentschema);

export default Student;
