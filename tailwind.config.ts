import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx,md}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)"],
        manrope: ["var(--font-manrope)"],
      },
      spacing: {
        primary: "1rem",
        "primary-half": ".5rem",
      },
      colors: {
        border: "#F3F4F8",
        'border-2':'#EAEBF2',
        input: "#e5e7eb",
        ring: "#0f172a",
        'gray-100':'#F3F4F8',
        avatar: "#A9A0FF",
        blue: {
          100: "#F6F5FF",
        },
        'green-100':'#2DC47B',
        'red-50':'#EF466F',
        'red-10':'#FFF0F4',
        'green-50':'#F0FFF8',
        'gray-150':'#2F2B3D',
        'orange-50':'#FFD88D',
        'gray-10':'#C5C8D9',
        'gray-light':'#F5F5F7',
        'gray-5':'#F2FBF0',
        'green-10':'#1BB172',
         status: {
          default: '#f3f4f6', // corresponds to bg-gray-100
          waiting: '#B2E4FC',
          completed: '#B6E4CA',
          processing: '#CABEFF',
          returned: '#FFBC99',
        },
        background: "#ffffff",
        foreground: "#131313",
        container: {
          DEFAULT: "#F7F7F9",
          foreground: "#131313",
        },
        primary: {
          DEFAULT: "#7367F0",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F7F7F9",
          foreground: "#1e293b",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#777E90",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#1e293b",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "collapsible-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-collapsible-content-height)",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
} satisfies Config;

export default config;
