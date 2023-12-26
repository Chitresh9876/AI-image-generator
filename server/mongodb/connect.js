import mongoose from 'mongoose'

const connectDB = (url) => {
    mongoose.set('strictQuery', true); //For search Functionality

    mongoose.connect(url)
    .then(()=>{ console.log('MongoDB is connected')})
    .catch((err)=>{ console.log(err)});

}

export default connectDB;