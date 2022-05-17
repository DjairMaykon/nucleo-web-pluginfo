module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "movie-card":
          "linear-gradient(to bottom, rgba(59,59,59,0) 0%, rgba(59,59,59,0.4) 15%, rgba(59,59,59,0.6) 30%, rgba(59,59,59,0.8) 65%, rgba(59,59,59,0.9) 80%, rgba(59,59,59,1) 100%)",
      },
      fontFamily: {
        lato: "Lato",
      },
    },
  },
  plugins: [],
};
