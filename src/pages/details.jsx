import { useParams } from "react-router";

import { Loading } from "../components/Loading";
import {usePokemonDetail} from '../services/pockemonapi';
import { PokemonAddCollection } from "../components/Pokemon/PokemonAddCollection";
import { usePokemonLocation } from "../services/pockemonapi";

export const Details = () => {
    const { pokeid } = useParams();
    const pokemonData = usePokemonDetail(pokeid);
    const pokemonLocation = usePokemonLocation(pokeid);

    if(!pokemonData) {
        return (
            <Loading />
        )
    }
    return (
        <section className="detailsPage">
             
            <section className="pokemonDetail">
                <h1>
                    <strong>Nombre del Pokemon: </strong>
                    {pokemonData.name}
                </h1>  
                <img src={pokemonData.sprites.front_default} />
                <img src={pokemonData.sprites.back_default} />
                <p>
                <strong>Habilidades: </strong>
                {pokemonData.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </p>
                <p >
                <strong>Movimientos: </strong>
                {pokemonData.moves
                    .map((move) => move.move.name)
                    .join(", ")}
                </p>
                <p>
                    <strong>Entregas en las que aparece: </strong>
                    {pokemonData.game_indices.map((version)=> `Pokemon ${version.version.name}`).join(", ")}
                </p>
                <p>
                <strong>Estadisticas: </strong>
                {pokemonData.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", ")}
                </p>
                <p>
                    <strong>Pokemon Tipo: </strong>
                    {pokemonData.types.map((type)=>type.type.name)}
                </p>
                <p>
                    <strong>Peso: </strong>
                    {pokemonData.weight/10 + " Kg"}
                </p>
                <p>
                    <strong>Localizaciones: </strong>
                    {pokemonLocation.map((location)=>location.location_area.name).join(", ")}
                </p>
                <PokemonAddCollection
                    Pokecod={pokeid}
                    imgSprite={pokemonData.sprites.front_default}
                    name={pokemonData.name}
                    url=''
                />
            </section>
        </section>
    );
};
