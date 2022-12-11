const express =  require("express");
const Employees = require("../models/employeesModels")
const router = express.Router();

router.get("/employees", (req,res)=>{
    try{
      Employees.find((err, data)=>{
            if(err){
                return res.status(400).send({message: "Error While Retriving Employess"})
            }
            res.status(200).send(data)
      })
    }catch(err){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }

})
router.post("/employees", (req,res)=>{
    
    try{
        const payload = req.body;
        const newEmployess = new Employees(payload);
        newEmployess.save((err, data)=>{
            if (err){
                return res.status(400).send({message:"Error while adding new employee"})
            }
            res.status(200).send({employeeId: data._id, message:"Employee has been added successfully"})
        })

    }catch(err){
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
})
router.put("/employees/:empID", (req,res)=>{
    
})
router.delete("/employees/:empID", (req,res)=>{
    
})


module.exports = router;