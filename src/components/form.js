import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Form = ({pc, setPc, setListUpdated}) => {
       const [editMode, setEditMode] = useState(false);
       const {id} = useParams();
       const home = useNavigate();
       
       //Especificar campos de edicion o agregar
       useEffect(()=>{
        if(id){
          setEditMode(true);
          fetch(`http://localhost:4000/getPc/${id}`)
          .then(response => response.json())
          .then(data => {
              // Actualiza el estado de la computadora con los datos recibidos
              setPc(data[0]);
          })
          .catch(error => console.error('Error al cargar datos de la computadora:', error));
        }else{
          setEditMode(false);
        }
       },[id, setPc, setEditMode]);

       const setPcs = ()=>{
        setPc({
          nombre: "",
          teclado: "",
          observacion: "",
          modelo: "",
          no_serie: "",
          mouse: "",
          id_estado: "",
          id_tabla: ""
        });
       }
       //CAmbiar el estado de los inputs
       const handleChange = e =>{
              setPc({
                     ...pc,
                     [e.target.name]: e.target.value
              })
       }
       //Agregar un registro
       const handleSubmit = (e)=> {
       let{nombre, teclado, observacion, modelo, no_serie, mouse, id_estado, id_tabla} = pc
              e.preventDefault();
              id_estado = parseInt();
              id_tabla = parseInt();
              //Validacion de datos del formulario
              if (nombre === '' || teclado === '' || observacion === '' || modelo === '' 
              || no_serie === '' || mouse === '' || id_estado <= 0 || id_tabla <= 0) {
                     alert("Todos los campos son obligatorios")
                     return
              }

              //Hacer la consulta
              const requestInit = {
                     method: 'POST',
                     headers: {'Content-Type': 'application/json'},
                     body: JSON.stringify(pc)
              }
              fetch('http://localhost:4000/create', requestInit)
              .then((res) => res.json())
              .then((res) => {
                if(res){
                  setPcs();
                  home('/');
                  console.log(res);
                  
                }else {
                  alert("Ocurrió un error al insertar los datos");
                }
              })
              .catch((error) =>{
                console.error("Error:", error);
                alert("Ocurrió un error al insertar los datos");
              })
              setListUpdated(true)
       }
       //Actualizar un registro
      const handleUpdate = (e,id) => {
        e.preventDefault();
        let{id_estado, id_tabla} = pc
        id_estado = parseInt();
        id_tabla = parseInt();
                  
        const requestInit = {
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(pc)
        }
        fetch('http://localhost:4000/update/' + id, requestInit)
        .then((res) => res.json())
        .then((res) =>{
          if(res){
            setPcs();
            home('/');
            console.log(res)
          }})
        .catch(error => {
          console.error("Error:", error);
          alert("Ocurrió un error al actualizar los datos");
        });
        setListUpdated(true)
      }
      //Riniciar los valores al cancelar
      const estadoCancelado = ()=>{
        setPcs();
        home('/');
      }

       return (
              <div className="form-container">
                <h2>{editMode ? "Editar Computadora" : "Agregar Computadora"}</h2>
                <form onSubmit={(e)=> editMode ? handleUpdate(e,pc.id) : handleSubmit(e)} className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre</label>
                      <input
                        name="nombre"
                        onChange={handleChange}
                        type="text"
                        id="nombre"
                        value={pc.nombre || ""}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="modelo" className="form-label">Modelo</label>
                      <input
                        name="modelo"
                        onChange={handleChange}
                        type="text"
                        id="modelo"
                        value={pc.modelo || ""}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="no_serie" className="form-label">No. Serie</label>
                      <input
                        name="no_serie"
                        onChange={handleChange}
                        type="text"
                        id="no_serie"
                        value={pc.no_serie || ""}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="observacion" className="form-label">Observacion</label>
                      <input
                        name="observacion"
                        onChange={handleChange}
                        type="text"
                        id="observacion"
                        value={pc.observacion || ""}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="teclado" className="form-label">Teclado</label>
                      <select
                        name="teclado"
                        onChange={handleChange}
                        id="teclado"
                        className="form-select"
                        value={pc.teclado || ""}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="SI">SÍ</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mouse" className="form-label">Mouse</label>
                      <select
                        name="mouse"
                        onChange={handleChange}
                        id="mouse"
                        className="form-select"
                        value={pc.mouse || ""}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="SI">SÍ</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="estado" className="form-label">Estado</label>
                      <select
                        name="id_estado"
                        onChange={handleChange}
                        id="estado"
                        className="form-select"
                        value={pc.id_estado || ""}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="1">Disponible</option>
                        <option value="2">Fuera de servicio</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mesa" className="form-label">Mesa</label>
                      <select
                        name="id_tabla"
                        onChange={handleChange}
                        id="mesa"
                        className="form-select"
                        value={pc.id_tabla || ""}
                      >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="1">Mesa 1</option>
                        <option value="2">Mesa 2</option>
                        <option value="3">Mesa 3</option>
                        <option value="4">Mesa 4</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">{editMode ? "Actualizar" : "Agregar"}</button>
                    <button type="button" onClick={() => estadoCancelado()} className="btn btn-danger ms-2">Cancelar</button>

                  </div>
                </form>
              </div>
            );
}
 
export default Form;