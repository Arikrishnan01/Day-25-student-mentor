import  mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/**
 * CONNECT WITH THE DATABASE
 */
async function connectdb(){
     await mongoose.connect(
        "mongodb+srv://ari:hF8kQAGMFbfCKr7D@cluster0.4hkvjxy.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true}
    )
    console.log("DB CONNECTED");
}

export default connectdb; 