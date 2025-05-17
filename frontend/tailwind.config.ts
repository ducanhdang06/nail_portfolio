import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blush: {
          DEFAULT: '#FADADD', // blush pink
          light: '#FFE9EF',
        },
        lilac: {
          DEFAULT: '#E3D7FF',
          light: '#F3EEFF',
        },
        peach: {
          DEFAULT: '#FFD6C0',
          light: '#FFF1EA',
        },
        mint: {
          DEFAULT: '#C6F7E2',
          light: '#E6FFF7',
        },
        sky: {
          DEFAULT: '#B3E5FC',
          light: '#E3F8FF',
        },
      },
      borderRadius: {
        xl: '2rem',
        lg: '1.25rem',
        md: '0.75rem',
        sm: '0.5rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 24px 0 rgba(220, 180, 255, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.04)',
        pastel: '0 2px 16px 0 rgba(250, 218, 221, 0.15), 0 1px 4px 0 rgba(179, 229, 252, 0.10)',
      },
      fontFamily: {
        sans: ['Quicksand', 'Poppins', 'ui-sans-serif', 'system-ui'],
        accent: ['Caveat', 'cursive'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
