import React, {useRef} from 'react';
import "./modal.css";

interface ModalProps {
    showModal:boolean,
    setShowModal:(ShowModal: boolean) => void
    title:string,
    
}



export const Modal: React.FC<ModalProps> = ({showModal,setShowModal, title,children})=>{
    const overlayRef = useRef(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>)=>{
        if (e.target === overlayRef.current) {
            setShowModal(false);
        }
    }

    return (
        <>  
            {showModal ? 
                <div className={'modal'}>
                <div
                  ref={overlayRef}
                  className={'modal__overlay'}
                  onClick={handleOverlayClick}  
                />
                <div className={'modal__box'}>
                  <button
                    className={'modal__close'}
                    onClick={()=>setShowModal(false)}
                  >
                   <span className={'closeIcon'} >X</span>
                  </button>
                  <div className={'modal__title'}>
                    {title}
                  </div>
                  <div className={'modal__content'}>
                    {children}
                  </div>
                </div>
              </div>
           :null
            }
        </>
    )
}