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
        <div className="loginManager">
            <div className="divLoginH1">
                <h1 className="loginH11" >Henry</h1>
                <h1 className="loginH12">Manager</h1>
            </div>
            <div className="loginH2">
                <h2> ¿Listo parra cambiar tu vida?</h2>
            </div>
            <div className="divFormLogin">
                <form className="formLogin">
                    <div className="LoginDiv-Campos">
                        <label className="nameInput" htmlFor="email">Email registrado</label><br></br>
                        <input autoFocus={true} size={40} type="email" id="email" name="email" className="LoginDivInput-Campos" onChange={(e) => handleInput(e)} />
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
    )
}

export default Login;