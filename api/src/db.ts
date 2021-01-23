
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        //database Name
        const databaseName='development';
        const con = await mongoose.connect(`mongodb://localhost/${databaseName}`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
        console.log(`Database connected : ${con.connection.host}:3001`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB