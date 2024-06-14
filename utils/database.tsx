import mongoose from 'mongoose'

let isConnected = false
const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : ''

const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if(isConnected) {
        console.log('MongoDB is already connected.')
    } else {
        try {
            await mongoose.connect(
                uri,
                { 
                    dbName: 'share_prompt',
                }
            )
            isConnected = true;
            console.log('MongoDB connected.')
        } catch (error) {
            console.log(error);
        }
    }


}

export default connectToDB
