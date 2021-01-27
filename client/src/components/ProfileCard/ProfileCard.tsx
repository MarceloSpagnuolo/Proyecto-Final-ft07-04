import React, { useState } from "react";
import "./ProfileCard.css"



const ProfileCard = (): JSX.Element => {


    return (
        <div className="divsitoProfileCard">
            <div className="card-container">
                <img className="round" src="https://ca.slack-edge.com/TPRS7H4PN-U01B2F8BZ7G-c04270f308a9-512" alt="user" />
                <div className="divCGP"><span>C1</span><span>G1</span></div>
                <h3 className="namePCard" >Babass Masitas</h3>
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



