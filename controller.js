const ScemaModel = require('./model')


exports.add =  (req,res)=>{

  const {color, Size, price, lifeStyle, EMI} = req.body;
  const img = "public/"+req.file.filename;

    const new_model = new ScemaModel({img: img, color:color, Size:Size, price:price, lifeStyle:lifeStyle, EMI:EMI }) 
    console.log(new_model)

    new_model.save((error, data) => {
     if (data) {  
       res.status(200).send({message:"uploaded"})
     } 
     else {
       console.log("Something wrong")	
       res.send({ error: error })
     }
   }) 

   
}
