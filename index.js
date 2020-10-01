const express = require('express')
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const shortid= require('shortid');
const { add } = require('./controller');
const ScemaModel= require('./model')

mongoose.connect('mongodb+srv://rohit:Rohit@123@pandey.265oq.mongodb.net/ecommers?retryWrites=true&w=majority',
{ useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}).then(()=>{console.warn("db connected");});

const app = express();
app.use(express.json())
app.use(cors())

app.use('/public/',express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(path.dirname(__dirname),'/backend/uploads'))
    },
    filename: function(req,file,cb){
        cb(null, shortid.generate() +"_"+file.originalname)
    }
})

const upload = multer({storage})

app.post('/add', upload.single('img') , add)

app.get('/getdata/:data',(req,res)=>{  
    var color = ["Red", "Green", "Blue"]
    var Size = ["S","L","M","XL","XL"]
    const obj =JSON.parse(req.params.data)
    if(obj.color.length>0){
        color = obj.color;
    }
    if(obj.Size.length>0){
          Size = obj.Size;
    }
    if(res){
         ScemaModel.find({color:color, Size:Size    , price:{$lte:obj.price}}, (err,response)=>{
            if(response){
                res.send(response);
            } 
        })
    }
})

app.listen(process.env.PORT || 2000, ()=>{
    console.log("server is runnning on port "+ 2000)
})
