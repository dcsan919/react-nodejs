import React from "react";
import { useNavigate } from "react-router-dom";
import "./list.css";
import deleteIcon from "../img/borrar.png"
import editIcon from "../img/editar.png"


const ListPc = ({pcs, setListUpdated }) => {
  let nuevoEstado = 0;
  let nuevoMesa = 0;

  let navigate = useNavigate();
  const handleClickUd = (id) => navigate(`/form/${id}`);
  const handleClick = () => navigate('/form');
  //Borrar un registro
  const handleDelete = id =>{
    const requestInit = {
      method: 'DELETE',
    }
    fetch('http://localhost:4000/delete/' + id, requestInit)
    .then(res => res.json())
    .then(res => console.log(res))

    setListUpdated(true)
  }

  return (
    <div>
      <div className="inp-buscador">
        <a>Buscar Pc</a>
        <input placeholder="Ingresa el nombre" />
      </div>
      <div className="container-list">
        <div className="cont-t-b">
          <h2 className="txt-list">Lista de Computadoras</h2>
          <button onClick={handleClick} className="btn btn-success">Agregar</button>
        </div>
      <table className="table table-hover small-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teclado</th>
            <th>Mouse</th>
            <th>Observacion</th>
            <th>Modelo</th>
            <th>No. Serie</th>
            <th>Estado</th>
            <th>Mesa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pcs.map(pc => {
            // Cambio de texto para el estado
            if(pc.id_estado === 1){
              nuevoEstado = "Disponible";
            }else if(pc.id_estado === 2) {
              nuevoEstado = "Fuera de servicio";
            }else{
              nuevoEstado = "Estado no encontrado"
            }
            //Cambio de texto par la mesa
            if(pc.id_tabla === 1){
              nuevoMesa = "Mesa 1";
            }else if(pc.id_tabla === 2) {
              nuevoMesa = "Mesa 2";
            }else if(pc.id_tabla === 3){
              nuevoMesa = "Mesa 3"
            }else if(pc.id_tabla === 4){
              nuevoMesa = "Mesa 4"
            }else{
              nuevoMesa = "Mesa no encontrada"
            }

            return (
              <tr key={pc.id}>
                <td>{pc.id}</td>
                <td>{pc.nombre}</td>
                <td>{pc.teclado}</td>
                <td>{pc.mouse}</td>
                <td>{pc.observacion}</td>
                <td>{pc.modelo}</td>
                <td>{pc.no_serie}</td>
                <td>{nuevoEstado}</td>
                <td>{nuevoMesa}</td>
                <td>
                    <div className="mb-3 cont-btns">
                      <button onClick={() => handleDelete(pc.id)} className="btn btn-danger">
                      <img className="icon-value" src={deleteIcon} alt="Eliminar" />
                      </button>
                      <button onClick={() =>handleClickUd(pc.id) } className="btn btn-primary">
                      <img className="icon-value" src={editIcon} alt="Editar" />
                      </button>
                    </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ListPc;
