import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface Registro {
    name?: string,
    lastName?: string,
    email?: string;
    password?: string;
    comparePassword?: string;
    githubId?: string,
    googleId?: string,
    thumbnail?: Buffer,
}

const Registro = (props: any): JSX.Element => {
    const { token } = props.match.params;
    const [estado, setEstado] = useState<Registro>();

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setEstado({
            ...estado,
            [e.target.name]: e.target.value,
        });
        console.log(estado)
    }

    return (
        <>
            <div className="">
                <form className="">
                    <div className="">
                        <label className="" htmlFor="name">
                            Nombre
                        </label>
                        <br></br>
                        <input
                            autoFocus={true}
                            size={40}
                            type="name"
                            name="name"
                            className=""
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div className="">
                        <label className="" htmlFor="lastName">
                            Apellido
                        </label>
                        <br></br>
                        <input
                            autoFocus={true}
                            size={40}
                            type="lastName"
                            name="lastName"
                            className=""
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div className="">
                        <label className="" htmlFor="email">
                            Email
                        </label>
                        <br></br>
                        <input
                            autoFocus={true}
                            size={40}
                            type="email"
                            name="email"
                            className=""
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div className="">
                        <label className="" htmlFor="password">
                            Contraseña
                        </label>
                        <br></br>
                        <input
                            size={60}
                            type="password"
                            name="password"
                            className=""
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div className="">
                        <label className="" htmlFor="comparePassword">
                            Repetir contraseña
                        </label>
                        <br></br>
                        <input
                            autoFocus={true}
                            size={40}
                            type="password"
                            name="comparePassword"
                            className=""
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <div className="">
                        <label className="" htmlFor="githubId">
                            GithubId
                        </label>
                        <br></br>
                        <input
                            autoFocus={true}
                            size={40}
                            type="name"
                            name="githubId"
                            className=""
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                </form>
                <div className="">
                    <button className="">Entrar</button>
                </div>
            </div>
        </>
    );
};

export default Registro;
