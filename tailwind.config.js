module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('assets/bg.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
