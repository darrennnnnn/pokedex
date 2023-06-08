import { useRouter } from "next/router";
import usePokemonData from "../../components/getPokemonData";
import useColorFetching from "../getColor";
import Image from "next/image";
import PokemonEvolution from "../pokemonEvolution";

function PokemonPage() {
    const router = useRouter();
    const { pokemonId } = router.query;
    const { pokemonData, pokemonSpecies, loading, error } =
        usePokemonData(pokemonId);
    const dominantColor = useColorFetching(pokemonData);

    const back = () => {
        router.back();
    };

    const backgrounds = {
        normal: "#A8A878",
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        ice: "#98D8D8",
        fighting: "#C03028",
        poison: "#A040A0",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dark: "#705848",
        dragon: "#7038F8",
        steel: "#B8B8D0",
        fairy: "#F0B6BC",
    };

    const defaultBackground = "white";

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                padding: "4rem",
                background: dominantColor,
            }}
        >
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
                    <button
                        style={{
                            width: "200px",
                            padding: "10px",
                            position: "absolute",
                            top: "50px",
                            right: "100px",
                            border: "none",
                            borderRadius: "10px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={back}
                    >
                        Back
                    </button>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                            }}
                        >
                            {pokemonData && pokemonData.name && (
                                <p
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "3.5rem",
                                    }}
                                >
                                    {pokemonData.name.charAt(0).toUpperCase() +
                                        pokemonData.name.slice(1)}{" "}
                                    <br />
                                    <p
                                        style={{
                                            fontSize: "1.5rem",
                                        }}
                                    >
                                        #{pokemonData.id} <br />
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "1.75rem",
                                        }}
                                    >
                                        {
                                            pokemonSpecies.genera.find(
                                                (genus) =>
                                                    genus.language.name === "en"
                                            ).genus
                                        }
                                    </p>
                                </p>
                            )}
                        </div>
                        <div
                            style={{
                                width: "100%",
                            }}
                        >
                            {pokemonData && pokemonData.types && (
                                <div
                                    style={{
                                        alignItems: " center",
                                        display: "flex",
                                        justifyContent: "right",
                                    }}
                                >
                                    {pokemonData.types.map((type) => (
                                        <p
                                            key={type.slot}
                                            style={{
                                                background:
                                                    backgrounds[
                                                        type.type.name
                                                    ] || defaultBackground,
                                                padding: "10px 20px 10px 20px",
                                                borderRadius: "10px",
                                                fontWeight: "bold",
                                                fontSize: "1.25rem",
                                                marginRight: "2em",
                                                color: "white",
                                                boxShadow:
                                                    "10px 10px 7px 0px rgba(0,0,0,0.14",
                                            }}
                                        >
                                            {type.type.name
                                                .charAt(0)
                                                .toUpperCase() +
                                                type.type.name.slice(1)}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Image
                            style={{
                                marginBottom: "20px",
                            }}
                            width={400}
                            height={400}
                            alt={pokemonData.id}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
                        />
                    </div>
                    <div
                        style={{
                            marginBottom: "30px",
                            textAlign: "center",
                            background: "rgba(255, 255, 255, 0.7",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {pokemonSpecies &&
                            pokemonSpecies.flavor_text_entries && (
                                <p
                                    style={{
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {pokemonSpecies.flavor_text_entries
                                        .find(
                                            (desc) =>
                                                desc.language.name === "en"
                                        )
                                        .flavor_text.replace(/\f/g, " ")
                                        .replace(/\u00ad\n/g, " ")
                                        .replace(/\u00ad/g, " ")
                                        .replace(/ -\n/g, " - ")
                                        .replace(/-\n/g, "-")
                                        .replace(/\n/g, " ")}
                                </p>
                            )}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            background: "rgba(255, 255, 255, 0.7)",
                            justifyContent: "center",
                            padding: "10px",
                            borderRadius: "10px",
                            marginBottom: "30px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                
                        }}
                    >
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                                paddingBottom: "10px",
                            }}
                        >
                            Ability
                        </p>
                        {pokemonData && pokemonData.abilities && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "50px",
                                    width: "100%",
                                    textAlign: "center",
                                    
                                }}
                            >
                                {pokemonData.abilities.map((ability) => (
                                    <div
                                        key={ability.slot}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: ability.is_hidden
                                                ? "center"
                                                : "flex-start",
                                        }}
                                    >
                                        {ability.ability.name
                                            .charAt(0)
                                            .toUpperCase() +
                                            ability.ability.name.slice(1)}
                                        <br />
                                        {ability.is_hidden === true
                                            ? "(Hidden Ability)"
                                            : null}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.7)",
                            padding: "30px",
                            borderRadius:'10px',
                        }}
                    >
                        <p
                            style={{
                                textAlign: "center",
                                marginBottom: "30px",
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                            }}
                        >
                            Evolutions
                        </p>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <PokemonEvolution pokemonName={pokemonData.id} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PokemonPage;
