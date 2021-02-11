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
   
    const [userEditable, setUserEditable] = useState(false)

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
                        setUserEditable(userToEdit.editable)
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
                        });
                        
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
       
        if(getProfile.role !== 'admin'){
            setinputDisabled(true)
            setUserEditable(false)
        }  

    }
    const activateEdition = async () => {
        await makeEditable(id);
    }

    return (
        <div className="profileContainer">
            {/* <h1>Perfil de {titleProfile}</h1> */}
            <div id='whiteContainer'>
                <div className='profilePic_div'>
                    <File
                        idUser={userId}
                        img={profileImg}
                    >

                    </File>
                    {
                            //userToEdit && (userToEdit.role === 'alumno' || userToEdit.role === 'PM') && getProfile.role === 'admin'  ? 

                            (getProfile.role === 'admin' && id !== 'miPerfil')
                                ? (userToEdit && userToEdit.editable === true ?
                                    <div className="divBtnLogin">
                                        <button
                                            className='btn_on'
                                            type="button"
                                            onClick={activateEdition}
                                        >
                                            <i className="fa fa-toggle-on" id='switch_off'></i>
                                        </button>
                                        <small className="edicionText">Deshabilitar<br/> edición</small>
                                    </div>
                                    :
                                    <div className="divBtnLogin">
                                        <button
                                            className='btn_off'
                                            type="button"
                                            onClick={activateEdition}
                                        >
                                            <i className="fa fa-toggle-off" id='switch_on'></i>
                                        </button>
                                        <small className="edicionText">Habilitar <br/>edición</small>
                                    </div>
                                    )
                                : null
                    }
                </div>

                <div className='l-form'>

                    <form className="profileData" onSubmit={submitUpdateData}>
                        <div className="data_div">
                            <label className="profile_label" >Nombre</label><br></br>
                            <input autoFocus={true}  value={firstname || ''} type="text" name="firstname" className="profile_input" onChange={handleInputChange} disabled={(inputDisabled) ? true : false} />
                        </div>
                        <div className="data_div">
                            <label className="profile_label" >Apellido</label><br></br>
                            <input autoFocus={true}  value={lastname || ''} type="text" name="lastname" className="profile_input" onChange={handleInputChange} disabled={(inputDisabled) ? true : false} />
                        </div>
                        <div className="data_div">
                            <label className="profile_label" >Email</label><br></br>
                            <input  type="email" value={email || ''} name="email" className="profile_input" onChange={handleInputChange} disabled={(inputDisabled) ? true : false} />
                        </div>
                        {cohorte ?
                            <>
                                <div className="data_div">
                                    <label className="profile_label" >Cohorte</label><br></br>
                                    <input  type="text" value={cohorte || ''} name="cohorte" className="profile_input" onChange={handleInputChange} disabled />
                                </div>
                            </>
                            : null
                        }
                        {standup ?
                            <>
                                <div className="data_div">
                                    <label className="profile_label" >Standup</label><br></br>
                                    <input size={60} type="text" value={standup || ''} name="standup" className="profile_input" onChange={handleInputChange} disabled />
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
                                        className={'app_btn'}
                                        type="submit"
                                    >
                                        Actualizar datos
                                    </button>
                                </div>
                                : null
                        }
                        
                        <div className="divBtnLogin">
                            <button
                                className={'password_btn'}
                                onClick={openModal}

                            >
                             Cambiar contraseña   
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            {
                getProfile.role === 'admin' ?
                    <div id='tutorial_div'>
                        <img src="https://i.ibb.co/cgNTpkX/Mesa-de-trabajo-6.png" alt="" id='tutorial_img'/>
                        <div id='tutorial_whitespace'>
                            <div id='tutorial_ps'>
                                <p>Desde aca podrás ver y editar tus datos y los de otros usuarios</p>
                                <p>Utiliza el boton de edición para que un usuario pueda cambiar sus datos</p>
                            </div>
                        </div>
                    </div>
                    :null
            }
            {
                getProfile.role === 'alumno' || getProfile.role === 'PM' ?
                <div id='tutorial_div'>
                    <img src="https://i.ibb.co/cgNTpkX/Mesa-de-trabajo-6.png" alt="" id='tutorial_img'/>
                    <div id='tutorial_whitespace'>
                        <div id='tutorial_ps'>
                            <p>Desde acá podrás ver tus datos personales</p>
                            <p>Si cometiste un error, contactate con un administrador para que te habilite a modificar tus datos</p>
                        </div>
                    </div>
                </div>
                :null
            }
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
