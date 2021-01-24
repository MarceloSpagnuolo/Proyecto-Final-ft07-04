import server from "./src/app"
import connectDB from './src/db'



server.listen(3001, () => {
  //Genera la conexión en el puerto establecida en db.ts
  connectDB();
})


