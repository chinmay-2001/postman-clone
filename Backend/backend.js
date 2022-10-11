const express =require('express')
const axios =require("axios")
const cors=require("cors")

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(cors())

const redis=require('redis')
// const redisClient =redis.createClient()
let redisClient;
(async () => {
    redisClient=redis.createClient();
    redisClient.on("error",(error)=>console.error(`Error:${error}`));
    await redisClient.connect();
    console.log("inside func")
})();
const DEFAULT_EXPIRATION=3600
// func();
app.get("/photo",async (req,res)=>{
    console.log("there")
    // const {data} =await axios.get(
    //     "https://fakestoreapi.com/products"
    // )
    // redisClient.SETEX("photo",DEFAULT_EXPIRATION,JSON.stringify(data))
    // redisClient.get('photo',async (error,photo)=>{
    //     console.log("inside redisclient")
    //     if(error) console.error(error)
    //     if(photo!=null){
    //         return res.json(JSON.parse(photo));
    //     }
    //     else{
    //         const {data}=await axios.get(
    //             "https://fakestoreapi.com/products",
    //         )
    //         console.log(data)
    //         redisClient.SETEX("photo",DEFAULT_EXPIRATION,JSON.stringify(data))
    //     }
    //     console.log("reach");
    //     res.json(data)
    // })
    const data=await redisClient.get('photo');
    if(data!=null){
        console.log("data there")
        return res.json(JSON.parse(data));
    }
    else{
        console.log("data not there")
        const {data}=await axios.get(
                    "https://fakestoreapi.com/products",
                )
                console.log(data)
                redisClient.SETEX("photo",DEFAULT_EXPIRATION,JSON.stringify(data))
        
        res.json(data);
    }

})

app.listen(3002)

