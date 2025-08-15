import express from "express";
import { v2 as cloudinary } from 'cloudinary';
import uptl from "./uploadfiles/upld.js";
import multer from "multer";
import upload from "./middleware/upload.js";
import cors from "cors";
import dotenv from "dotenv";

const app= express();
app.use(cors());
dotenv.config();

    cloudinary.config({ 
        cloud_name: process.env.ClOUD_NAME, 
        api_key: process.env.CLOUD_API, 
        api_secret: process.env.CLOUD_SEC_KEY
    });


    app.post("/upload", upload.single("file"), async(req, res) => {
     try {
        const result =await uptl(req.file.path);
        if(!result)
            throw new Error("Upload fail!")
        res.send({url:result.url});
     } catch (error) {
        console.log("this is :",error);
        res.send({error:error.message});
     }
});

app.listen(3000,()=>{
    console.log("running at",3000);
})
