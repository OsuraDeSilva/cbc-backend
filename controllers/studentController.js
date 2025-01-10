import Student from "../models/student.js"

export function getStudent(req,res){

        Student.find().then(

            (studentlist)=>{

                res.json({
                    list : studentlist
                })

            }
        )
}

export function createStudent(req,res){

    const student = new Student(req.body) 

    student.save().then(()=>{
        res.json({
            message: "student created"
        })
    }).catch(()=>{
        res.json({
            message: "student not created"
        })
    })

} 

export function deleteStudent(req,res){
    Student.deleteOne({name : req.body.name}).then(
        ()=>{
            res.json(
                {
                    message : "Student deleted successfully"
                }
                
            )
        }
    )
}