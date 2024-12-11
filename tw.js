import { create } from "twrnc";

const tw = create({
  theme: {
    extend: {
      colors: {
        primaryBlue: "#0D0140",
        lightBlue: "#7551FF",
        lightestBlue: "#524B6B",
        paleBlue: "#F3F2F2",
        darkBlue: "#232D3A",
        darkerBlue: "#150B3D",
        secOrange: "#FF9228",
        lightOrange: "#FFD6AD",
        paleOrange: "#FF6B2C",
        cyan: "#AFECFE",
        lilac: "#BEAFFE",
        red: "#FC4646",
        offWhite: "#F9F9F9",
        lightGrey: "#ADAAB9",
        lightestGrey: "#CBC9D4",
      },
    },
  },
});

export default tw;
