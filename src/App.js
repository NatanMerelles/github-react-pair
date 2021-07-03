import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

const Header = styled.header`
  background-color: #282c34;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Body = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const RepoStyling = styled.div`
  width: 100px;
  padding: 20px;
  border: 1px solid #b3b3b3;
  border-radius: 25px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #33a3d4;
  font-size: 16px;
`;

function Repo({
  name,
  url
}){
  return(
    <RepoStyling>
      <Link href={url} target="_blank">
        Repositorio: {name}
      </Link>
    </RepoStyling>         
  )
}

function App() {
  const [profile, setProfile] = useState();
  const [repos, setRepos] = useState([]);
  const [dado, setDado] = useState('');


  useEffect(() => {
    if (profile && profile.repos_url) {
      fetch(profile.repos_url)
        .then((result) => result.json())
        .then((dados) => setRepos(dados));
    }else{
      setRepos([])
    }
  }, [profile]);

  

  function handleDado(e){
    setDado(e.target.value)
  }

  function handleBuscar(){
    fetch(`https://api.github.com/users/${dado}`)
      .then((result) => result.json())
      .then((dados) => setProfile(dados));
  }

  return (
    <div className="App">
      <Header>
        <input type="text" placeholder="Dado" value={dado} onChange={handleDado}></input>
        <button onClick={handleBuscar}>Buscar</button>
      </Header>
      <Body>
        {profile ? profile.login : 'Um nome'}
        {
          repos.map((repo) => (
            <Repo name={repo.name} url={repo.html_url}/>
          ))
        }
      </Body>
    </div>
  );
}

export default App;
