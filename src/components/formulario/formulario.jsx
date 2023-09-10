import React, {useState} from "react";
import './formulario.css'
import axios from 'axios';
function Formulario(){
     
    const estadoInicial = {
        id: '',
        nombre: '',
        email: '',
        telefono: '',
        opcion:false
      };
    const [error, setError] = useState({})
    const[datos, setDatos] = useState(estadoInicial);
    const handleInputChange = (event) => {
        setDatos({
          ...datos,
          [event.target.name]: event.target.value
        });
      };
      const validarFormulario  = () =>{
        let erroresTemp = {}
        if(!datos.id || !/^\d+$/.test(datos.id)){
            erroresTemp.id = "El ID es obligatorio y solo debe contener números.";
        }
        
    if (!datos.nombre) {
        erroresTemp.nombre = "El nombre es obligatorio.";
      }
  
      if (!datos.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(datos.email)) {
        erroresTemp.email = "El correo electrónico no es válido.";
      }
  
      if (!datos.telefono || !/^\d{10}$/.test(datos.telefono)) {
        erroresTemp.telefono = "El número es obligatorio y solo debe contener números.";
      }
        setError(erroresTemp);
        return Object.keys(erroresTemp).length === 0;
      }
      const handleSubmit = async(event) => {
        event.preventDefault();
        if(validarFormulario()){
          fetch('https://proyect-x-1.onrender.com/newData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Puedes agregar otros encabezados aquí si lo necesitas
            },
            body: JSON.stringify(datos),
             // Establecer el modo a 'no-cors'
          })
          .then(response => {
            if (response.ok) {
              setDatos(estadoInicial);
              setError({})
              return response.json();
            } else {
              throw new Error('Error al enviar los datos');
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Hubo un error:', error);
          });
        }

      };
    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input 
              type="text"
              name="id"
              value={datos.id}
              onChange={handleInputChange}
            />
            {error.id && <div style={{color: 'red'}}>{error.id}</div>}
          </div>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleInputChange}
            />
            {error.nombre && <div style={{color: 'red'}}>{error.nombre}</div>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={datos.email}
              onChange={handleInputChange}
            />
            {error.email && <div style={{color: 'red'}}>{error.email}</div>}
          </div>
          <div>
            <label>Telefono:</label>
            <input
              type="text"
              name="telefono"
              value={datos.telefono}
              onChange={handleInputChange}
            />
            {error.telefono && <div style={{color: 'red'}}>{error.telefono}</div>}
          </div>
          <div>
        <label>
         <input
           type="checkbox"
           name="opcion"
           checked={datos.opcion}
           onChange={(e) => setDatos({ ...datos, opcion: e.target.checked })}
    />
          Quieres recibir noticias por correo
  </label>
</div>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </form>
      );
}
export default Formulario;