import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  /*Con este link traigo la información de los pokemons en lotes de a 20*/
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next); //Asignamos la siguiente página de pokemons
    setPrevUrl(res.data.previous); //Y se pone el link para ir a la página anterior
    getPokemon(res.data.results); //Traemos los pokemons de a 20, si se hace f12 sse puede ver que hay 1126 resulatos
    setLoading(false);
  };
  const getPokemon = async (res) => {
    //En esta función obtenemos el URL de cada uno de los pokemon
    //Y además creamos un objeto que contiene la información de cada pokemon
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1)); //Con este metodo organizamos los id de los pokemons para que salgan en orden en la página
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);
  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={
              (poke) => setPokeDex(poke)
              /*Aqui pasamos la función info pokemon para que cuando demos click a un pokemon
               aparezca su información a la izquierda, esto se completa en la clase Card.jsx*/
            }
          />
          {/*En esta parte se actualiza el URL para que cada que se presione next or previous
          la aplicación web haga render nuevamente. Además miramos si debe existir o no
          un botón se anterior*/}
          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}
            {/*Anteriormente se guardo la variable state se guardaban todos los pokemons,
                   para que en la siguiente página no aparezcan del 1 al 40 por ejemplo, 
                   creamos en cada click un array vacio y así la siguiente página solo 
                   mostrara del 21 al 40, 41 a 60 etc, lo mismo sucede si vamosa la página anterior.*/}
            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};
export default Main;
