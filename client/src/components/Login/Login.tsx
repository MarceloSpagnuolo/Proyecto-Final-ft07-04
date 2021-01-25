import React, { useState } from "react";
import "./Login.css"

interface Logeado {
    email?: string,
    password?: string
}


const Login = (): JSX.Element => {
    const [estado, setEstado] = useState<Logeado>()


    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setEstado({
            ...estado,
            [e.target.name]: e.target.value
        })
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
                        <h2> ¿Listo parra cambiar tu vida?</h2>
                    </div>
                    <div className="textoChiquitin">
                        <p>Soy un texto de relleno solo diré que esta es una página mas chiquita que la grande pero igualmente de útil</p>
                    </div>
                    <div className="divFormLogin">
                        <form className="formLogin">
                            <div className="LoginDiv-Campos">
                                <label className="nameInput" htmlFor="email">Email registrado</label><br></br>
                                <input autoFocus={true} size={40} type="email" id="emaill" name="email" className="LoginDivInput-Campos" onChange={(e) => handleInput(e)} />
                            </div>
                            <div className="LoginDiv-Campos">
                                <label className="nameInput" htmlFor="password">Contraseña</label><br></br>
                                <input size={60} type="password" id="pass" name="password" className="LoginDivInput-Campos" onChange={(e) => handleInput(e)} />
                            </div>
                        </form>
                        <div className="divBtnLogin">
                            <button className="btnLogin">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login;