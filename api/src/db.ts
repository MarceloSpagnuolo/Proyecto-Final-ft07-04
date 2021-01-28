require('dotenv').config();
import mongoose from 'mongoose'
import Insert from '../insert';

const connectDB = async (reset: Boolean) => {
    try {
        const databaseName : any = process.env.MONGODB_URI;
        const con = await mongoose.connect(databaseName, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        family: 4
    })
        console.log(`Database connected : ${con.connection.host}:3001`)
        // Condición que borra la DB e inserta valores por defecto
        if(reset) {
            mongoose.connection.dropDatabase()
            .then((c) => {
                console.log("DB Borrada")
                Insert()
            })
        }


    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB