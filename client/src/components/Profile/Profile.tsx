import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {updatePassword,getUsereEdit,updateUser} from 'Store/Actions/Users'; 
import {Modal} from "./modal";
import "./Profile.css";


interface Inputs {
    id?:string,
    firstname?: string,
    lastname?:string,
    email?:string,
    cohorte?:string,
    standup?:string,
    password?:string,
    newPassword?:string,
    confirmPassword?:string
}

export interface IdUserProfileParams {
    id: string;
}
 
const Profile = (): JSX.Element => {
    const [inputs, setInputs] = useState<Inputs>({});
    const [inputDisabled, setinputDisabled] = useState(true)
    const getProfile: any =  useSelector( (state: any) => state.Users.user);
    const {firstname,lastname,email,cohorte,standup,password,newPassword,confirmPassword}=inputs;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [editOtherProfile, seteditOtherProfile] = useState(false)
    //mandar llamar las action de producto action
    const updatePass = async (data:any) => dispatch(updatePassword(data));
    const getUser = async (id:string) => dispatch(getUsereEdit(id));
    const modifyUser = async (data:any) => dispatch(updateUser(data));
    const userToEdit =  useSelector( (state: any) => state.Users.userToEdit);

    var useraeditar:any = {}
    if (userToEdit)  useraeditar = userToEdit;

    //conseguir el id que viene por la url
    const { id } = useParams<IdUserProfileParams>();

    useEffect(()=>{
        console.log(getProfile)
        if(id === 'miPerfil' ){
           
            //obtener el perfil del usuario logueado
            const perfil=async () =>{
                if( Object.keys(getProfile).length !== 0){ 
                    if(typeof getProfile.cohorte !== 'undefined') {var cohorte:any = getProfile.cohorte.Nombre;}
                    if(typeof getProfile.standup !== 'undefined'){var standup:any = getProfile.standup.Grupo;}
                    await setInputs({
                        id:getProfile._id,
                        firstname:getProfile.name.firstname,    
                        lastname:getProfile.name.lastname,
                        email:getProfile.email,
                        cohorte,
                        standup 
                    })
                    //habilitar edicion de todos los campos solo para el admin
                    if(getProfile.role === 'admin'){
                        setinputDisabled(false)
                    }
                }
            }
            perfil()
        }else{
            //admin puede obtener perfil de otro usuario para editarlo
            if(getProfile.role=== 'admin' ){
                setinputDisabled(false)
                const profileOtherUser=async ()=>{
                    getUserEdit()
                    console.log(userToEdit)

                    if( Object.keys(userToEdit).length !== 0){ 
                        const {_id,name,email,cohorte,standup}=userToEdit;
                        if(typeof userToEdit.cohorte !== 'undefined') var cohorteNombre=cohorte.Nombre;
                        if(typeof userToEdit.standup !== 'undefined') var standupNombre=standup.Grupo;
                        setInputs({
                            id: _id,
                            firstname:name.firstname,    
                            lastname:name.lastname,
                            email,
                            cohorte:cohorteNombre,
                            standup:standupNombre
                        })
                    }
                }
                profileOtherUser()
            }
        }
         //eslint-disable-next-line
    },[getProfile,userToEdit,id])

    const getUserEdit=async()=>{
        if(!editOtherProfile)await getUser(id)
        seteditOtherProfile(true);
    }
    
    //manejar values de inputs
    const handleInputChange = (e:any)=> {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const openModal= (e:any)=>{
        e.preventDefault()
        setShowModal(prev => !prev) ;
    }

    const submitUpdatePassword=(e:any)=>{
        e.preventDefault();
        const {password,newPassword,confirmPassword}=inputs;
        //validar que no hayan campos vacios
        if(!password || !newPassword || !confirmPassword ){
            console.log('Todos los campos son obligatorios')
            return
        }
        //newpassword minimo de 8 caracteres
        if(newPassword.length <8 || confirmPassword.length < 8){
            console.log('La contraseña nueva y confirmar contraseña nueva deben ser de minimo 8 caracteres')
            return
        }
        //verfiicar los dos passwords sean iguales
        if(newPassword !== confirmPassword){
            console.log('Nueva contraseña y confirmar contraseña no son iguales')
            return
        }
        //si no hay errores
        const data={
            password,
            newPassword,
            confirmPassword
        }
        updatePass(data);

    }

    const submitUpdateData=(e:any)=>{
        e.preventDefault();
        const {id,email,firstname, lastname}=inputs;
        
        //si no hay errores
         const data ={
            id,
            email,
            name:{
                firstname,
                lastname
            }
        } 
        console.log(data)
        modifyUser(data);

    }
    



    return (
        <div className="divsitoProfileCard">
           <h1>Mi perfil</h1>
            <form className="formLogin" onSubmit={submitUpdateData}>
                <div className="LoginDiv-Campos">
                    <label className="nameInput" htmlFor="email">Nombre</label><br></br>
                    <input autoFocus={true} size={40}  value={firstname || ''} type="text" id="firstname" name="firstname" className="LoginDivInput-Campos" onChange={handleInputChange} disabled = {(inputDisabled) ? true : false}/>
                </div>
                <div className="LoginDiv-Campos">
                    <label className="nameInput" htmlFor="email">Apellido</label><br></br>
                    <input autoFocus={true} size={40} value={lastname || ''}  type="text" id="lastname" name="lastname" className="LoginDivInput-Campos" onChange={handleInputChange} disabled = {(inputDisabled) ? true : false}/>
                </div>
                <div className="LoginDiv-Campos">
                    <label className="nameInput" htmlFor="password">Email</label><br></br>
                    <input size={60} type="email" value={email|| ''}  id="email" name="email" className="LoginDivInput-Campos"  onChange={handleInputChange} disabled = {(inputDisabled) ? true : false}/>
                </div>
                {cohorte ? 
                        <>
                            <div className="LoginDiv-Campos">
                                <label className="nameInput" htmlFor="password">Cohorte</label><br></br>
                                <input size={60} type="text" value={cohorte || ''}  id="cohorte" name="cohorte" className="LoginDivInput-Campos"  onChange={handleInputChange} disabled />
                            </div>
                        </>
                    : null
                }
                {standup ? 
                    <>
                        <div className="LoginDiv-Campos">
                            <label className="nameInput" htmlFor="password">Standup</label><br></br>
                            <input size={60} type="text" value={standup || ''}  id="standup" name="standup" className="LoginDivInput-Campos"  onChange={handleInputChange} disabled />
                        </div>
                        </>
                    : null
                }
                {getProfile.role === 'admin' ? 
                 <div className="divBtnLogin">
                    <button
                        className={'app__btn'}
                        type="submit"
                    >
                        Actualizar datos
                    </button>
                </div>
                : null
                }
                <div className="divBtnLogin">
                    <button
                        className={'app__btn'}
                        onClick={openModal}
                    
                    >
                        Cambiar mi contraseña
                    </button>
                </div>
            </form>
            <Modal
                showModal={showModal}
                setShowModal= {setShowModal}   
                title={'Cambiar Contraseña'}
            >
                <form onSubmit={submitUpdatePassword} >
                    <div className="LoginDiv-Campos">
                        <label className="nameInput" htmlFor="email">Contraseña actual</label><br></br>
                        <input autoFocus={true} size={40}   type="password" value={password || ''} id="password" name="password" className="LoginDivInput-Campos" onChange={handleInputChange} />
                    </div>
                    <div className="LoginDiv-Campos">
                        <label className="nameInput" htmlFor="email">Contraseña nueva</label><br></br>
                        <input autoFocus={true} size={40}   type="password" value={newPassword || ''}  id="newPassword" name="newPassword" className="LoginDivInput-Campos" onChange={handleInputChange} />
                    </div>
                    <div className="LoginDiv-Campos">
                        <label className="nameInput" htmlFor="email">Confirmar contraseña nueva</label><br></br>
                        <input autoFocus={true} size={40}   type="password" value={confirmPassword || ''}  id="confirmPassword" name="confirmPassword" className="LoginDivInput-Campos"  onChange={handleInputChange}/>
                    </div>
                    <button className={'app__btn'} onClick={()=>setShowModal(false)}>Cancelar</button>
                    <button className={'app__btn'} type="submit">Actualizar contraseña</button>
                </form>
            </Modal>      
        </div>
    )
}


export default Profile;
