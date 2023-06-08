import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        const searchUrl = search
            ? `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
            : url;
        axios
            .get(searchUrl)
            .then((res) => {
                setPokemonData(res.data);
                setLoading(false);
                setNextUrl(res.data.next);
                setPrevUrl(res.data.previous);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [search, url]);

    return (
        <div
            style={{
                padding: "20px",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    justifyContent: "center",
                    marginBottom: "40px",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: "10px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search Pokemon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            padding: "10px",
                        }}
                    />
                </div>
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "fixed",
                            top: "0",
                            left: "0",
                            right: "0",
                            bottom: "0",
                        }}
                    >
                        <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                display: "flex",
                                fontSize: "4em",
                                marginTop:'60px'
                            }}
                        >
                            <button
                                onClick={() => {
                                    setUrl(prevUrl);
                                }}
                                style={{
                                    height: "50px",
                                    width: "200px",
                                    marginRight: "auto",
                                    border: "none",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                Prev
                            </button>
                            Pokedex
                            <button
                                onClick={() => {
                                    setUrl(nextUrl);
                                }}
                                style={{
                                    height: "50px",
                                    width: "200px",
                                    marginLeft: "auto",
                                    border: "none",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                Next
                            </button>
                        </div>
                        {pokemonData && (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: "20px",
                                }}
                            >
                                {pokemonData.name ? (
                                    <div
                                        key={pokemonData.name}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #ccc",
                                            padding: "10px",
                                            background: "#FAF9F6",
                                            boxShadow:
                                                "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            borderStyle: "none",
                                        }}
                                    >
                                        <Link
                                            href={`/pokemon/${pokemonData.name}`}
                                        >
                                            <Image
                                                width={150}
                                                height={150}
                                                alt={pokemonData.name}
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
                                            />
                                            <p
                                                style={{
                                                    justifyContent: "center",
                                                    display: "flex",
                                                }}
                                            >
                                                {pokemonData.name
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    pokemonData.name.slice(1)}
                                            </p>
                                        </Link>
                                    </div>
                                ) : (
                                    pokemonData.results &&
                                    pokemonData.results.map((pokemon) => (
                                        <div
                                            key={pokemon.name}
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                border: "1px solid #ccc",
                                                padding: "10px",
                                                background: "#FAF9F6",
                                                boxShadow:
                                                    "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                borderStyle: "none",
                                            }}
                                        >
                                            <Link
                                                href={`/pokemon/${pokemon.name}`}
                                            >
                                                <Image
                                                    width={150}
                                                    height={150}
                                                    alt={pokemonData.name}
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                                                        pokemon.url.split(
                                                            "/"
                                                        )[6]
                                                    }.png`}
                                                />
                                                <p
                                                    style={{
                                                        justifyContent:
                                                            "center",
                                                        display: "flex",
                                                    }}
                                                >
                                                    {pokemon.name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        pokemon.name.slice(1)}
                                                </p>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
