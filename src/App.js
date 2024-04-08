import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import ListPc from "./components/listaPcs";
import Form from "./components/form";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [pc, setPc] = useState({
    nombre: '',
    teclado: '',
    observacion: '',
    modelo: '',
    no_serie: '',
    mouse:'',
    id_estado: 0,
    id_tabla: 0
  })

  const [pcs, setPcs] = useState([]);

  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    const getPcs = () => {
      fetch('http://localhost:4000/get/Pcs')
      .then(res => res.json())
      .then(res => setPcs(res))
      .catch((err) =>{
        console.log(err.message);
      })
    };

    getPcs();
    setListUpdated(false)
  }, [listUpdated]);

  return (
    <Router>
      <Navbar brand="Sistema de computadoras" />
        <Routes>
            <Route path="/" element={<ListPc pc={pc} pcs={pcs} setListUpdated={setListUpdated}/>}/>
            <Route path="/form/:id?" element={<Form pc={pc} setPc={setPc} setListUpdated={setListUpdated}/>}/>
        </Routes>

    </Router>
  );
}

export default App;
