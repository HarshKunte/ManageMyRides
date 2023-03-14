import mongoose from 'mongoose'
import app from './app.js'
import config from './config/index.js'

(async() => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB is connected");

        app.on('error',(err)=>{
            console.log("Error: ",err);
            throw err
        })

        app.listen(config.PORT, ()=>{
            console.log(`Listening on port ${config.PORT}`);
        })
    } catch (error) {
        console.log("ERROR",error);
    }
})()