import { useEffect, useState } from "react";
import ColorThief from "colorthief";

const useColorFetching = (pokemonData) => {
    const [dominantColor, setDominantColor] = useState("");

    useEffect(() => {
        const fetchColor = async () => {
            if (pokemonData.id) {
                const colorThief = new ColorThief();
                const img = document.createElement("img");

                img.crossOrigin = "anonymous";

                img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`;

                img.onload = () => {
                    const dominantColor = colorThief.getColor(img);
                    const rgbColor = `rgb(${dominantColor.join(",")})`;
                    setDominantColor(rgbColor);
                    
                };
            }
        };

        fetchColor();
    }, [pokemonData.id]);

    return dominantColor;
};

export default useColorFetching;
