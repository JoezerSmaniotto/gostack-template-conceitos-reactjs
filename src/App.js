import React, { useState,useEffect} from 'react';
import api from './services/api';
import "./styles.css";

function App() {
  const [repository,setRepository] = useState([]);
  const [flag,setFlag] = useState(false);
  useEffect(()=>{ // Assim com useEffect quando carrega a pagina ele busca todos os projetos 
    if(flag){
      api.get('repositories').then(response=> {
          setRepository(response.data);
          setFlag(false);
      });
    }
 },[flag]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      url: "https://github.com/Rocketseat/unform",
      title: `Novo Projeto ${Date.now()}`,
      techs: ["React", "ReactNative", "TypeScript","Node","C"]	
      
    }); 
    const newRepository = response.data;
    setRepository([...repository,newRepository]);
    console.log(repository);

  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`);
    setFlag(true);

    console.log(repository);
    
  }

  return (
   
    <div>
      <ul data-testid="repository-list">
        {repository.map(reposit =>  <li key={reposit.id}>{reposit.title} 
                                      <button onClick={() => handleRemoveRepository(reposit.id)}>
                                          Remover
                                      </button>  
                                    </li> )}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
