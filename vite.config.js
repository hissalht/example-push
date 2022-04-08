/** @type {import('vite').UserConfig} */
const config = {
  server: {
    proxy: {
      "/push": "http://localhost:4000",
    },
  },
};

export default config;
