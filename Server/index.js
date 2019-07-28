const express = require('express');
const server = express();
 const bodyParser = require('body-parser');
  const mongoose = require("mongoose");
 const cors=require('cors');
// server.use(bodyParser.urlencoded({ extended: false })) 
server.use(bodyParser.json());
 server.use(cors());
mongoose.connect('mongodb://localhost:27017/todo',{useNewUrlParser:true});
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    name:{type:String,required:true},
    status:{type:Boolean, required:true},
    index:{type:Number, required:true}
});
const List = mongoose.model('list',todoSchema);
server.post("/create",function(req,res){
    console.log(req.body.name);
     
     let list = new List();

     list.name = req.body.name;
     list.status =req.body.status;
    list.index = req.body.index;
    

    list.save();
    res.json(list);
})
server.get("/read",function(req,res){
    List.find({},function(err,docs){
        console.log(docs);
        res.json(docs);
    })
})
server.delete("/delete/:id",function(req,res){
    List.findByIdAndDelete({_id:req.params.id},function(err,docs){
        console.log(docs);
        res.json(docs);
    })
})
server.put("/updateStatus/:id/:status",function(req,res){
    console.log(req.params);
    List.findOneAndUpdate({_id:req.params.id},{$set:{status:req.params.status}},function(err,docs){
        // console.log(docs);
    })
})
// server.put("/up/:index",function(req,res){
//     // List.find({},function(err,docs){
//     //     console.log(docs);
//     //     res.json(docs);
//     // })
// //     res.send(req.params);
// })
server.listen(8080,()=>{
    console.log("Server Started");
})
