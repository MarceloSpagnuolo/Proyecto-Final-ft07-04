
import mongoose from 'mongoose'
import Insert from '../insert';

const connectDB = async (reset: Boolean) => {
    try {
        //database Name
        const databaseName='development';
        const con = await mongoose.connect(`mongodb://localhost/${databaseName}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        family: 4
    })
        console.log(`Database connected : ${con.connection.host}:3001`)
        if(reset) {
            mongoose.connection.dropDatabase()
            .then((c) => {
                console.log("borré la DB")
                Insert()
            })
        }


    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB