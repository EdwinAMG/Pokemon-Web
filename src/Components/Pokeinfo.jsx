import React from "react";

const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? ( //Aquí primero miramos si la información del pokemon esta vacia o no
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <div className="contenedor">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt=""
              /*URL para traer las imagenes de todos los pokemons a la derecha con su información*/
            />
          </div>
          {/*Traemos la información de las habilidades de cada pokemon*/}
          <div className="abilities">
            {data.abilities.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
          {/*Se traen las seis estadisticas base de cada pokemon*/}
          <div className="base-stat">
            {data.stats.map((poke) => {
              return (
                <>
                  <h3>
                    {poke.stat.name}:{poke.base_stat}
                  </h3>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default Pokeinfo;
