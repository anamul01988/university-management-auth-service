import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";



async function boostrap() {
   try {
    await mongoose.connect(config.database_url as string);
    console.log("mongoose connected");
    app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`)
      })
   } catch (error) {
     console.log(error);
   }

 
}
boostrap()