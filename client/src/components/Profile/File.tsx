import React ,{useState,useEffect,createRef} from "react";
import "./file.css";
import Swal from "sweetalert2";
import clienteAxios from '../../config/axios';
 
interface FileProps {
    idUser:string,
    img:string,
}



export const File: React.FC<FileProps> = ({idUser,img}) => {

    
    const [ImgUrl, setImgUrl] = useState('')
   
    const input = React.useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        setImgUrl(img)
        
        
    }, [img])


   //manejador de imagen obtenida en el input
   const imageHandler = async (e:any)=>{
    
    const file = await obtenerFileImg(e);
    let reader = new FileReader();
    if(file){
    reader.onload = (e)=>{
        if(reader.readyState === 2){
            const stringImg=  reader.result as string;
            setImgUrl(stringImg)
            Swal.fire({
                title: 'Quieres asignar esta foto como imagen de perfil?',
                imageUrl: stringImg,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cambiar imagen!'
            }).then((result) => {
                if (result.isConfirmed) {
                    saveProfileImg(stringImg)

                  Swal.fire(
                    'Imagen de perfil actualizada correctamente!',
                  )
                }else{
                    if (input.current) {
                        input.current.value='';
                    }
                    setImgUrl(img);
                }
            })
        }
    }
    reader.readAsDataURL(file)
    }


    const saveProfileImg = async (img:any)=> {
        try {
           
           const data = {img,id:idUser}
           const res= await  clienteAxios.put('users/update/img_profile', data);
           
           
        } catch (error) {
           console.log(error)

        }
    }

        
    }
    const obtenerFileImg = async (e:any)=>{

        return e.target.files[0]
    }

    return (
    <div className="contentFile">
        <div className="profile-images-card">
            <div className="profile-images">
             
                    <img src={ImgUrl} id="upload-img"/>

             
                
            </div>
            <div className="custom-file">
                <label htmlFor="fileupload" >Cambiar Imagen de Perfil</label>
                <input type="file" id="fileupload" name="img" onChange={imageHandler} accept="image/x-png,image/jpeg,image/jpg"  ref={input}/>
            </div>
        </div>
    </div>
    )
}


