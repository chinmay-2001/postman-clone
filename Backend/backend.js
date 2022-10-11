const express =require('express')
const axios =require("axios")
const cors=require("cors")

const app=express()
app.use(cors())

const redis=require('redis')
// const redisClient =redis.createClient()

let func=async () => {
    redisClient=redis.createClient();
    redisClient.on("error",(error)=>console.error(`Error:${error}`));
    await redisClient.connect();
};
func();
app.get("/photo",async (req,res)=>{
    
    redisClient.get('photo',async (error,photo)=>{
        if(error) console.error(error)
        if(photo!=null){
            return res.json(JSON.parse(photo));
        }
        else{
            const {data}=await axios.get(
                "https://fakestoreapi.com/products",
            )
            console.log(data)
            redisClient.setex("photo",DEFAULT_EXPIRATION,JSON.stringify(data))
        }
        res.json(data)
    })

        // const {data}=await axios.get(
        //     "https://fakestoreapi.com/products",
        // )
        // console.log(data)
        // res.json(data)

    
})

app.listen(3000)

