import { create } from "twrnc";

// Create the customized version of the library
const tw = create({
  theme: {
    extend: {
      colors: {
        primaryBlue: "#130160",
        darkerBlue: "#150B3D",
        lightBlue: "#A49EB5",
        primaryOrange: "#f97316",
        lightOrange: "#fdba74",
        yellow: "#ff9228",
        grayBg: "#f5f5f5",
        grayText: "#64748b",
        grayBorder: "#e2e8f0",
        success: "#22c55e",
        error: "#ef4444",
        warning: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        bold: ["Inter-Bold", "sans-serif"],
        medium: ["Inter-Medium", "sans-serif"],
        OpenSans: ["OpenSans", "sans-serif"],
      },
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
      },
    },
  },
});

export default tw;
