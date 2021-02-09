import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, getUsereEdit, updateUser, getUserByToken, makeUserEditable } from '../../Store/Actions/Users';
import { Modal } from "./modal";
import {File} from "./File"
import "./Profile.css";
import Swal from "sweetalert2";



interface Inputs {
    id?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    cohorte?: string,
    standup?: string,
    password?: string,
    newPassword?: string,
    confirmPassword?: string,
    thumbnail?:string
}

export interface IdUserProfileParams {
    id: string;
}

const Profile = (): JSX.Element => {
    const [inputs, setInputs] = useState<Inputs>({});
    const [inputDisabled, setinputDisabled] = useState(true)
    const getProfile: any = useSelector((state: any) => state.Users.user);
   

    const { firstname, lastname, email, cohorte, standup, password, newPassword, confirmPassword } = inputs;
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [editOtherProfile, seteditOtherProfile] = useState(false);
    const [userId, setuserId] = useState('');
    const [profileImg, setprofileImg] = useState('http://localhost:3001/imagenes/default-user-image.png');
    //mandar llamar las action de producto action
    const updatePass = async (data: any) => dispatch(updatePassword(data));
    const getUser = async (id: string) => dispatch(getUsereEdit(id));
    const modifyUser = async (data: any) => dispatch(updateUser(data));
    const makeEditable = async (id: string) => dispatch(makeUserEditable(id));
    const userToEdit = useSelector((state: any) => state.Users.userToEdit.usersCOM);


    const [titleProfile, setTitleProfile] = useState('profile')
    //conseguir el id que viene por la url
    const { id } = useParams<IdUserProfileParams>();

    useEffect(() => {
        
        if (id === 'miPerfil') {
            //obtener el perfil del usuario logueado

            const perfil = async () => {
                if (Object.keys(getProfile).length !== 0) {
                    const id = getProfile._id;
                    if( typeof userToEdit !== 'undefined' && typeof userToEdit.thumbnail !== 'undefined' ){
                        setprofileImg(userToEdit.thumbnail);
                    }
                    setuserId(id)
                    //habilitar edicion de todos los campos solo para el admin
                    if (getProfile.role === 'admin' || userToEdit && userToEdit.editable === true) {
                        setinputDisabled(false)
                    }
                    getUserEdit(id)

                    if (userToEdit && Object.keys(userToEdit).length !== 0) {
                        const { _id, name, email, cohorte, standup } = userToEdit;
                      
                        if (typeof userToEdit.cohorte !== 'undefined') var cohorteNombre = cohorte.Nombre;
                        if (typeof userToEdit.standup !== 'undefined') var standupNombre = standup.Grupo;

                        setInputs({
                            id: _id,
                            firstname: name.firstname,
                            lastname: name.lastname,
                            email,
                            cohorte: cohorteNombre,
                            standup: standupNombre
                        })
                    }
                }
            }
            perfil()
            

        } else {
            //admin puede obtener perfil de otro usuario para editarlo
            if (getProfile.role === 'admin') {
                setinputDisabled(false)
               
                const profileOtherUser = async () => {
                    getUserEdit('')
                    
                    if (userToEdit && Object.keys(userToEdit).length !== 0) {

                        

                        const { _id, name, email, cohorte, standup } = userToEdit;
                        
                        if (typeof userToEdit.cohorte !== 'undefined' && cohorte) var cohorteNombre = cohorte.Nombre;
                        if (typeof userToEdit.standup !== 'undefined' && standup) var standupNombre = standup.Grupo ;
                        setuserId(_id);
                        setInputs({
                            id: _id,
                            firstname: name.firstname,
                            lastname: name.lastname,
                            email,
                            cohorte: cohorteNombre,
                            standup: standupNombre
                        })
                    }

                    if( typeof userToEdit !== 'undefined' && typeof userToEdit.thumbnail !== 'undefined' ){
                        setprofileImg(userToEdit.thumbnail);
                    }
                }
                profileOtherUser()
            }
        }
        if(firstname && lastname)  setTitleProfile(`${firstname} ${lastname}`);
      
        //eslint-disable-next-line
    }, [getProfile, userToEdit, id])

    const getUserEdit = async (idUser = '') => {
        if (!editOtherProfile && idUser === '') {
            await getUser(id)
        } else if (!editOtherProfile) {
            await getUser(idUser)
        }
        seteditOtherProfile(true);
    }


    //manejar values de inputs
    const handleInputChange = (e: any) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const openModal = (e: any) => {
        e.preventDefault()
        setShowModal(prev => !prev);
    }

    const submitUpdatePassword = (e: any) => {
        e.preventDefault();
        const { password, newPassword, confirmPassword } = inputs;
        //validar que no hayan campos vacios
        if (!password || !newPassword || !confirmPassword) {
            Swal.fire(
                "Todos los campos son obligatorios",
            )
            return
        }
        //newpassword minimo de 8 caracteres
        if (newPassword.length < 8 || confirmPassword.length < 8) {
            Swal.fire(
                "La contraseña nueva y confirmar contraseña nueva deben ser de minimo 8 caracteres",
            )
            return
        }
        //verfiicar los dos passwords sean iguales
        if (newPassword !== confirmPassword) {
            Swal.fire(
                "Nueva contraseña y confirmar contraseña no son iguales",
            )

            return
        }
        //si no hay errores
        const data = {
            password,
            newPassword,
            confirmPassword
        }
        updatePass(data);
        Swal.fire(
            "Se ha actualizado la constraseña correctamente",
        ).then(() => {
            setShowModal(false)
        }
        )

    }

    const submitUpdateData = async (e: any) => {
        e.preventDefault();
        const { id, email, firstname, lastname } = inputs;
        if (!email || !firstname || !lastname) {
            Swal.fire(
                "Todos los campos son obligatorios",
            )
            return
        }


        //si no hay errores
        const data = {
            id,
            email,
            name: {
                firstname,
                lastname
            }
        }

        await modifyUser(data);
        await Swal.fire(
            "Se han actualizado los datos correctamente",
        )

    }
    const activateEdition = async () => {
        await makeEditable(id);
    }

    return (
        <div className="profileContent">
            <h1>Perfil de {titleProfile}</h1>
           
            <File
                idUser={userId}
                img={profileImg}
            >

            </File>
           
            <form className="formLogin" onSubmit={submitUpdateData}>
                <div className="LoginDiv-Campos">
                    <label className="nameInput" htmlFor="email">Nombre</label><br></br>
                    <input autoFocus={true} size={40} value={firstname || ''} type="text" id="firstname" name="firstname" className="LoginDivInput-Campos" onChange={handleInputChange} disabled={(inputDisabled) ? true : false} />
                </div>
                <div className="LoginDiv-Campos">
                    <label className="nameInput" htmlFor="email">Apellido</label><br></br>
                    <input autoFocus={true} size={40} value={lastname || ''} type="text" id="lastname" name="lastname" className="LoginDivInput-Campos" onChange={handleInputChange} disabled={(inputDisabled) ? true : false} />
                </div>
                <div className="LoginDiv-Campos">
                    <label className="nameInput" htmlFor="password">Email</label><br></br>
                    <input size={60} type="email" value={email || ''} id="email" name="email" className="LoginDivInput-Campos" onChange={handleInputChange} disabled={(inputDisabled) ? true : false} />
                </div>
                {cohorte ?
                    <>
                        <div className="LoginDiv-Campos">
                            <label className="nameInput" htmlFor="password">Cohorte</label><br></br>
                            <input size={60} type="text" value={cohorte || ''} id="cohorte" name="cohorte" className="LoginDivInput-Campos" onChange={handleInputChange} disabled />
                        </div>
                    </>
                    : null
                }
                {standup ?
                    <>
                        <div className="LoginDiv-Campos">
                            <label className="nameInput" htmlFor="password">Standup</label><br></br>
                            <input size={60} type="text" value={standup || ''} id="standup" name="standup" className="LoginDivInput-Campos" onChange={handleInputChange} disabled />
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
                {
                    userToEdit && userToEdit.editable === true && (userToEdit.role === 'alumno' || userToEdit.role === 'PM') && getProfile.role !== 'admin' ?
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
                {
                    //userToEdit && (userToEdit.role === 'alumno' || userToEdit.role === 'PM') && getProfile.role === 'admin'  ? 

                    (getProfile.role === 'admin' && id !== 'miPerfil')
                        ? (userToEdit && userToEdit.editable === true ?
                            <div className="divBtnLogin">
                                <button
                                    className={'app__btn'}
                                    type="button"
                                    onClick={activateEdition}
                                >
                                    Deshabilitar edición
                                </button>
                            </div>
                            :
                            <div className="divBtnLogin">
                                <button
                                    className={'app__btn'}
                                    type="button"
                                    onClick={activateEdition}
                                >
                                    Habilitar edición
                                </button>
                            </div>
                            )
                        : null
                }
                <div className="divBtnLogin">
                    <button
                        className={'app__btn'}
                        onClick={openModal}

                    >
                        Cambiar contraseña
                    </button>
                </div>
            </form>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                title={'Cambiar Contraseña'}
            >
                <form onSubmit={submitUpdatePassword} >
                    <div className="LoginDiv-Campos">
                        <label className="nameInput" htmlFor="email">Contraseña actual</label><br></br>
                        <input autoFocus={true} size={40} type="password" value={password || ''} id="password" name="password" className="LoginDivInput-Campos" onChange={handleInputChange} />
                    </div>
                    <div className="LoginDiv-Campos">
                        <label className="nameInput" htmlFor="email">Contraseña nueva</label><br></br>
                        <input autoFocus={true} size={40} type="password" value={newPassword || ''} id="newPassword" name="newPassword" className="LoginDivInput-Campos" onChange={handleInputChange} />
                    </div>
                    <div className="LoginDiv-Campos">
                        <label className="nameInput" htmlFor="email">Confirmar contraseña nueva</label><br></br>
                        <input autoFocus={true} size={40} type="password" value={confirmPassword || ''} id="confirmPassword" name="confirmPassword" className="LoginDivInput-Campos" onChange={handleInputChange} />
                    </div>
                    <button className={'app__btn'} onClick={() => setShowModal(false)}>Cancelar</button>
                    <button className={'app__btn'} type="submit">Actualizar contraseña</button>
                </form>
            </Modal>
        </div>
    )
}


export default Profile;
