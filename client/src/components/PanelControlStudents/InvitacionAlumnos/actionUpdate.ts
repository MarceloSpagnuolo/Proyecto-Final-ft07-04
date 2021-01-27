import axios from 'axios';
const URL: string = 'http://localhost:3001';

export const uploadAction = async (invitation: any) => {
  //el HTML requerido para generar la funcionalidad de Multer es incompatible con la sintaxis jsx
  //por eso se genera un Form por una funcionan, se agrega una propiedad con value y por header le asignamos el tipo
  // de upload que va a ejecutar, en este caso multiples archivos

  const fd = new FormData();
  fd.append('file', invitation.file[0]);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  var name = invitation.file[0].name; //busco el nombre del archivo con su extencion
  var path = `ArchivosMulter\\${name}`;//agrego la ruta real de donde se guarda el archivo;
  const invitacionModif = {
    ...invitation,           //modifico la invitacion para pasar la ruta donde se guardo el archivo
    file: path
  }
  try {
    await axios.post(`${URL}/multer/subirArchivo`, fd, config); //envio el archivo(SOLO) a guardarse en el back(api)
    return invitacionModif; //devuelvo la invitacion modificada con la ruta del archivo para usar en la action
  } catch (err) {
    console.log(err);
  }
}

