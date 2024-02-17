module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {},
    extend: {
      colors: {
        blue: { A700: "#2563eb", 800: "#1E2235" },
        white: { A700: "#ffffff" },
        blue_gray: {
          200: "#abadc5",
          300: "#9ca3af",
          800: "#374151",
          900: "#242940",
          "900_01": "#1e2135",
          "200_01": "#b8bcca",
        },
        gray: {
          50: "#f8fafc",
          800: "#3f424a",
          900: "#1a1d2d",
          "900_01": "#1e1f22",
        },
        teal: { 50: "#d8efe9", 100: "#b0d6cc", "100_01": "#b0d7cd" },
      },
      boxShadow: {},
      fontFamily: { inter: "Inter" },
    },
  },
};
