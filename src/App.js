import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './Style.css';

import api from './services/api';

function App() {


  const [input, setInput] = useState('');
  const[cep, setCep] = useState({})


async function handleSearch(){
  //59900000/json/

  if (input === '') {
    alert("Informe o CEP que deseja localizar!!")
    return;
  }

  try{
    const response = await api.get(`${input}/json`)
    setCep(response.data)
    setInput("")



  }catch{
    alert("ERROR CEP NÃO ENCONTRADO!!")
    setInput("")


  }
  
}







  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP:"
        value={input}
        onChange={(e) => setInput(e.target.value) }> 
        </input>
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25}color='#fff'></FiSearch>
          </button> 
      </div>


      {Object.keys(cep).length > 0 && (  
        <main className='main'>
          <h2>CEP: {cep.cep} </h2>

          <span>RUA: {cep.logradouro} </span>
          <span>Complemento: {cep.complemento}</span>
          <span>BAIRRO {cep.bairro}</span>
          <span>CIDADE: {cep.localidade} - {cep.uf}</span>

        </main>

      )}
      


    </div>
  );
}

export default App;
