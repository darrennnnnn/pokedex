/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["raw.githubusercontent.com", "pokeapi.co"],
    },
};

const withImages = require("next-images");
module.exports = withImages();

module.exports = nextConfig;
