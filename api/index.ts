import server from "./src/app";
import connectDB from "./src/db";
import Insert from "./insert";

server.listen(3001, () => {
  //Genera la conexión en el puerto establecida en db.ts
  // Se le pasa un parámetro como true o false. Si es true, borra la DB e inserta una nueva.
  // Si es false, no hace nada, sólo se conecta.
  connectDB(true);
});
