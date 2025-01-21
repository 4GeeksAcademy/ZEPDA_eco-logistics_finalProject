import React, { useEffect, useState, useContext } from "react";
const mockDesc = "Sin descripción actualizada...";
import { getStringDate } from "../../utils/formattedDate";
import { EditUser } from "./editUser";
import userPic from "../../img/rigo-baby.jpg"
import { Context } from "../store/appContext";

export const UserPanel = ({ user }) => {
    const { actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Detecta el cambio en actions.updateUser()
        if (user.image !== null && user.image !== undefined) {
            const fetchImage = async () => {
                try {
                    const url = await actions.getImageUrl(user.image.public_id);
                    setImageUrl(url); // Muestra la URL de la imagen
                } catch (error) {
                    alert('Error obteniendo la imagen.');
                }
            };
        
            fetchImage();
        } else {
            setImageUrl('');
        }
    }, [user.image])

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <div className="col-6 p-3"> 
                <h1 className="text-start fw-normal fs-5 mb-3">BIENVENIDO {user.nombre.toUpperCase()}</h1>
                <div className="card rounded-2 shadow" style={{ height: '50vh' }}> 
                    <div className="card-header border-0 bg-white rounded-2 rounded-bottom-0 border-bottom"> 
                        <div className='row p-3'>
                            <div className='col-4'>
                                <img src={imageUrl || userPic} className="imgcontainer rounded-circle border border-2 shadow-sm" alt="user-image" style={{width:150,height:150}}/>
                            </div>
                            <div className='col-8 my-auto'>
                                <h5 className="card-title text-success fw-semibold m-0 py-2 text-start">{user.nombre || "Juan Martinez"}</h5> 
                                <p className="card-text mb-2 fw-normal text-start">{user.email || "usuario@example.com"}</p> 
                                <p className="card-text mb-2 fw-normal text-start">{user.direccion || "Sin dirección asignada..."}</p> 
                            </div>
                        </div>
                    </div> 
                    <div className="card-body bg-light pt-0 rounded-2 rounded-top rounded-top-0 pb-2"> 
                        <p className="mt-2 text-start">{user.descripcion || mockDesc}</p>
                        <div className="d-flex justify-content-between position-absolute bottom-0 w-100 start-0 px-3 pb-1">
                            <p className="card-text m-0 text-secondary text-start">Usuario desde {user.admission_day || getStringDate()}</p> 
                            <a href="#" className="text-success float-end" onClick={(e) => { e.preventDefault(); handleOpenModal(); }}>
                                Editar usuario
                            </a>
                        </div>
                    </div> 
                </div>
            </div>

            <EditUser show={showModal} openModal={handleOpenModal} closeModal={handleCloseModal} backUpImage={user.image} />
        </>
    );
};
