const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      euphoria: ['"Euphoria Script"'],
      clicker: ['"Clicker Script"'],
      league: ['"League Script"'],
      bad: ['"Bad Script"'],
      dancing: ['"Dancing Script"'],
      sofia: ['"Sofia"'],
      schoolbell: ['"Schoolbell"'],
      cedarville: ['"Cedarville Cursive"'],
      charmonman: ['"Charmonman"'],
      montserrat: ['"Montserrat"'],
      oswald: ['"Oswald"'],
    },
    screens: {
      mobile: "375px",
      tablet: "768px",
      laptop: "1024px",
      laptopL: "1440px",
      desktop: "1920px",
      fourK: "2560px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      gray: colors.gray,
      red: colors.red,
      blue: colors.blue,
      rose: colors.rose,
      main: "#1F1D2B",
      container: "#353340",
      strong: "#FF7551",
      white: "#F2F2F2",
      // Custom colors
    },
    borderWidth: {
      DEFAULT: "1px",
      // prettier-ignore
      '0': '0',
      // prettier-ignore
      '1': '1px',
      // prettier-ignore
      '2': '2px',
      // prettier-ignore
      '3': '3px',
      // prettier-ignore
      '4': '4px',
      // prettier-ignore
      '5': '5px',
      // prettier-ignore
      '6': '6px',
      // prettier-ignore
      '7': '7px',
      // prettier-ignore
      '8': '8px',
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-heropatterns")({
      // as per tailwind docs you can pass variants
      variants: [],
      patterns: [
        "jigsaw",
        "autumn",
        "formal-invitation",
        "topography",
        "wiggle",
        "diagonal-stripes",
        "current",
        "moroccan",
      ],
      // The foreground colors of the pattern
      colors: {
        default: "#484848",
      },
      // The foreground opacity
      opacity: {
        default: "0.05",
        10: "0.1",
        20: "0.2",
        30: "0.3",
        50: "0.5",
        70: "0.7",
        100: "1.0",
      },
    }),
  ],
};
