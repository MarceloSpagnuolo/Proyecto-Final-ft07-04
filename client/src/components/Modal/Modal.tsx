import React from 'react';
import './Modal.css';


const Modal = (props: any) => {
    return props.show ? (
        <div className="modal">
            <div className="content">
                <div className="header">
                    <button className="close-modal" onClick={() => {
                        props.onClose && props.onClose()
                    }}>
                        x
                    </button>
                </div>
                <div className="body-modal">
                    <span className="title">{props.title}</span>
                    {props.children}
                </div>
            </div>
        </div>
    ) : null;
}


export default Modal;