import React, { useEffect, useState, useContext } from "react";
const mockDesc = "Le encanta la programación, especialmente en Python y JavaScript. En su tiempo libre, disfruta de la jardinería y la cocina gourmet. Es un apasionado de la música clásica y toca el violín desde niño. Le gusta leer sobre ciencia ficción y es miembro activo de un club de lectura local. Los fines de semana, suele hacer senderismo por la Sierra de Guadarrama y le gusta capturar fotografías de la naturaleza.";
import { getStringDate } from "../../utils/formattedDate";
import { EditUser } from "./editUser";
import userPic from "../../img/rigo-baby.jpg"
import { Context } from "../store/appContext";

export const UserPanel = ({ user }) => {
    const { actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
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
                    <div className="card-header border-0 bg-white rounded-5 rounded-bottom-0 border-bottom"> 
                        <div className="d-flex justify-content-around flex-wrap">
                            <img src={imageUrl || userPic} className="img-fluid rounded-circle" alt="user-image" style={{width:150,height:150}}/>
                            <div className="my-auto float-end">
                                <h5 className="card-title text-success fw-semibold m-0 py-2 text-start">{user.nombre || "Juan Martinez"}</h5> 
                                <p className="card-text mb-2 fw-normal text-start">{user.email || "juan.martinez@example.com"}</p> 
                                <p className="card-text mb-2 fw-normal text-start">{user.direccion || "Calle de la Primavera, 45, 4º B 28013 Madrid, España"}</p> 
                            </div>
                        </div>
                    </div> 
                    <div className="card-body bg-light pt-0 rounded-5 rounded-top rounded-top-0 pb-2"> 
                        <p className="mt-2 text-start" style={{ height: '75%' }}>{user.descripcion || mockDesc}</p>
                        <div className="d-flex justify-content-between">
                            <p className="card-text m-0 text-secondary text-start">Usuario desde {user.admission_day || getStringDate()}</p> 
                            <a href="#" className="text-success float-end" onClick={(e) => { e.preventDefault(); handleOpenModal(); }}>
                                Editar usuario
                            </a>
                        </div>
                    </div> 
                </div>
            </div>

            <EditUser show={showModal} openModal={handleOpenModal} closeModal={handleCloseModal} />
        </>
    );
};
