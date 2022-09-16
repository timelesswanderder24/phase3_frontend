import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import React from 'react';
import PokeCard from '../stories/PokeCard';

export default function Home() {
  const [team, addTeam] = useState([]);
  const [pokeNames, addPokeName] = useState([]);

  async function updateNewPoke(id, name, url, defense) {  
    const response = await fetch('/api/pokemonTeamAPI', {
      method: 'POST',
      body: JSON.stringify({
        id,      
        name,   
        url,
        defense
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
  }

  async function refreshTeam() {
    const response = await fetch('/api/pokemonTeamAPI')
    const data = await response.json()
    console.log(data)
    addTeam(data);
  }
  async function addToTeam(search){ 
    if(team.length<=3){
      if (search !== "" && !pokeNames.includes(search)) {
        const response = await fetch('/api/pokemonsAPI')
        const data = await response.json() 
        const final = data.filter(poke => poke.name.includes(search));
        const poke = final[0];
        console.log(poke.defense)
        updateNewPoke(poke.id, poke.name, poke.url, poke.defense)
        refreshTeam()
        addPokeName(poke.name)
      } 
    }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}> 
        <h1 className={styles.title}>
          Select four pokemons for your team! 
        </h1>

        <div className={styles.grid}>
        <div className={styles.card} onClick={() => addToTeam("ditto")}>
            <h2>ditto</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("charmander")}>
            <h2>charmander</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("pikachu")}>
            <h2>pikachu</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("Eevee")}>
            <h2>Eevee</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("snorlax")}>
            <h2>snorlax</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("Charizard")}>
            <h2>chizard</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("piplup")}>
            <h2>piplup</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("mewtwo")}>
            <h2>mewtwo</h2>
          </div>

          <div className={styles.card} onClick={() => addToTeam("squirtle")}>
            <h2>squirtle</h2>
          </div>
          
      </div>
      <div className={styles.grid}>
        {team.length==0?(
          <div></div>
        ):(
          <div>
            <h1 className={styles.title}>
            Your Pokemon team
            </h1>
            {
              team.map((pokemon) =>
              <PokeCard key={pokemon.name} name={pokemon.name} url={pokemon.url} defense={pokemon.defense}/>
              )
            } 
          </div>
        )}
        </div>
      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}

