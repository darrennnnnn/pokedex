import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const PokemonEvolution = ({ pokemonName }) => {
    const [evolutionChain, setEvolutionChain] = useState([]);

    useEffect(() => {
        const fetchEvolutionChain = async () => {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
                );
                const evolutionChainUrl = response.data.evolution_chain.url;
                const evolutionChainResponse = await axios.get(
                    evolutionChainUrl
                );
                const chain = evolutionChainResponse.data.chain;
                setEvolutionChain(parseEvolutionChain(chain));
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvolutionChain();
    }, [pokemonName]);

    const parseEvolutionChain = (chain) => {
        const parsedChain = [];

        const parseChain = (evolutionDetails) => {
            const { species, evolves_to } = evolutionDetails;

            parsedChain.push({
                name: species.name,
                url: species.url,
            });

            if (evolves_to.length > 0) {
                parseChain(evolves_to[0]);
            }
        };

        parseChain(chain);

        return parsedChain;
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "6rem",
                flexWrap: "wrap",
            }}
        >
            {evolutionChain.map((pokemon) => (
                <div
                    key={pokemon.name}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <h3>
                        {pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1)}
                    </h3>
                    <Image
                        alt="HI"
                        width={150}
                        height={150}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                            pokemon.url.split("/")[6]
                        }.png`}
                    />
                </div>
            ))}
        </div>
    );
};

export default PokemonEvolution;
