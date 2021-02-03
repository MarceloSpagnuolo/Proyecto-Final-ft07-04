import React, { useState, useEffect } from "react";
import "./Login.css"
import { getUserByToken } from "../../Store/Actions/Users";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import clienteAxios from '../../config/axios';


interface Logeado {
    email?: string,
    password?: string
}


const Login = (): JSX.Element => {


    const [inputs, setInputs] = useState<Logeado>()
    const [error, setError] = useState<boolean>(false)

    //utilizar usedispatch 
    const dispatch = useDispatch();
    //constante que guarda la action para hacer login al backend
    const userLogin = async (newToken: any) => dispatch(getUserByToken(newToken));

    const user: any = useSelector((state: any) => state.Users.user)

    const history = useHistory();

    useEffect(() => {

        if (Object.keys(user).length !== 0) history.push('/home');

    }, [user])

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit() {
        try {
            const newToken = await clienteAxios.post('auth/login', inputs);
            if (newToken) {
                await userLogin(newToken.data);
            } else {
                setError(true)
            }
        } catch (error) {
            setError(true)

        }
    }


    return (
        <>
            <div className="gridLogin">
                <div className="imgLoginMax">
                    <img src="https://cdn.discordapp.com/attachments/764979688446885898/802048383844876298/cowork.png" />
                </div>
                <div className="loginManager">
                    <div className="divLoginH1">
                        <h1 className="loginH11" >Henry</h1>
                        <h1 className="loginH12">Manager</h1>
                    </div>
                    <div className="loginH2">
                        <h2> ¿Listo para cambiar tu vida?</h2>
                    </div>
                    <div className="textoChiquitin">
                        <p>Soy un texto de relleno solo diré que esta es una página mas chiquita que la grande pero igualmente de útil</p>
                    </div>
                    <div className="divFormLogin">
                        <form className="formLogin" >
                            {error ? <div className="errText"><p>Contraseña o Email incorrectos</p></div> : null}
                            <div id={error ? "errLogin" : ""} className="LoginDiv-Campos">
                                <label className="nameInput" htmlFor="email">Email registrado</label><br></br>
                                <input autoFocus={true} size={40} type="email" id="emaill" name="email" className="LoginDivInput-Campos" onChange={(e) => handleInput(e)} />
                            </div>
                            <div id={error ? "errLogin" : ""} className="LoginDiv-Campos">
                                <label className="nameInput" htmlFor="password">Contraseña</label><br></br>
                                <input size={60} type="password" id="passs" name="password" className="LoginDivInput-Campos" onChange={(e) => handleInput(e)} />
                            </div>
                        </form>
                        <div className="divBtnLogin">
                            <button className="btnLogin" onClick={handleSubmit}>Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login;