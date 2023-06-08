import { useEffect, useState } from "react";
import axios from "axios";

const usePokemonData = (pokemonId) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonSpecies, setPokemonSpecies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (pokemonId) {
            setLoading(true);
            const url1 = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            const url2 = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`

            const req1 = axios.get(url1);
            const req2 = axios.get(url2);        

    
            axios
                .all([req1, req2])
                .then(
                    axios.spread((...res) => {
                        const res1 = res[0];
                        const res2 = res[1];
                        setPokemonData(res1.data);
                        setPokemonSpecies(res2.data);
                        setLoading(false);
                    })
                )
                .catch((error) => {
                    setError(error);
                    setLoading(false)
                })
        }
    }, [pokemonId]);

    return { pokemonData, pokemonSpecies, loading, error };
};

export default usePokemonData;