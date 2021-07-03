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

const Repo = styled.div`
  width: 100px;
  padding: 20px;
  border: 1px solid #b3b3b3;
  border-radius: 25px;
`;

function App() {
  const [profile, setProfile] = useState();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/natanmerelles')
      .then((result) => result.json())
      .then((dados) => setProfile(dados));
  }, []);

  useEffect(() => {
    if (profile) {
      fetch(profile.repos_url)
        .then((result) => result.json())
        .then((dados) => setRepos(dados));
    }
  }, [profile]);

  console.log({ profile });
  console.log({ repos });

  return (
    <div className="App">
      <Header></Header>
      <Body>
        {profile ? profile.login : 'Um nome'}
        {
          repos.map((repo) => (
            <Repo>{repo.name}</Repo>
          ))
        }
      </Body>
    </div>
  );
}

export default App;
