import React from "react";
const Card = ({ pokemon, loading, infoPokemon }) => {
  // console.log(pokemon);

  return (
    <>
      {
        //En la siguiente linea se mira si la información ya fue cargada, de no ser así aparece el texto "Loading"
        loading ? (
          <h1>Loading...</h1>
        ) : (
          pokemon.map((item) => {
            return (
              <>
                <div
                  className="card"
                  key={item.id}
                  onClick={
                    /*En la clase Card se completa para que cuando
                      se le de click a un pokemon salga su infromación*/
                    () => infoPokemon(item)
                  }
                >
                  <h2>{item.id}</h2>
                  <img src={item.sprites.front_default} alt="" />{" "}
                  {/*Con en el sprites y font default trameos la imagen de cada pokemon*/}
                  <h2>{item.name}</h2>{" "}
                  {/*Y el nombre se asigna automaticamente con el atributo name*/}
                </div>
              </>
            );
          })
        )
      }
    </>
  );
};
export default Card;
