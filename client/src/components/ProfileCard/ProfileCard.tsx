import React, { useState } from "react";
import axios from "axios";
import "./ProfileCard.css";



const ProfileCard = (props: any): JSX.Element => {

    async function eliminar(id: any) {
        const res = await axios.put(`http://localhost:3001/users/modify/${id}`, { standup: null })
        return
    }


    const fullName: string = `${props.props.name.firstname} ${props.props.name.lastname}`;
    const image = props.props.thumbnail ?? "http://localhost:3001/imagenes/default-user-image.png";


    return (
        <div className="divsitoProfileCard">
            <div className="card-container">
                <button className="btnXPC" onClick={() => { eliminar(props.props._id); props.set.a(!props.set.b) }}>
                    X
                    </button>
                <img className="round" src={image} alt="user" />
                <div className="divCGP"><span>C{props.CG.c}</span><span>G{props.CG.g}</span></div>
                <h3 className="namePCard" >{fullName}</h3>
                <div className="divHub"> <img src="https://cdn.discordapp.com/attachments/764979688446885898/803015111555809310/github.png" alt="" /></div>
                <div className="buttons">
                    <button className="primary">
                        <a>✉</a>
                    </button>
                    <button className="primary ghost">
                        <a><img src="https://cdn.discordapp.com/attachments/764979688446885898/802760142222262272/14660.png" alt="" /> </a>
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ProfileCard;



