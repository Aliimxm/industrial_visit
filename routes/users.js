const express=require("express");
const route = express.Router();
const userService=require("../services/users");
route.get("/",async (req,res,next)=>
{
    let data = await userService.getUsers();
    res.json(data);
});

module.exports=route;