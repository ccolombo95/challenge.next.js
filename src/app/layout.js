import localFont from "next/font/local";
import "./globals.scss";
import Header from "./components/header/header";

const publicSansBold = localFont({
  src: "./fonts/PublicSans-bold.ttf",
  variable: "--font-public-sans-bold",
  weight: "700",
});

const publicSansSemiBold = localFont({
  src: "./fonts/PublicSans-semibold.ttf",
  variable: "--font-public-sans-semibold",
  weight: "600",
});

const publicSansMedium = localFont({
  src: "./fonts/PublicSans-medium.ttf",
  variable: "--font-public-sans-medium",
  weight: "500",
});

const publicSansRegular = localFont({
  src: "./fonts/PublicSans-regular.ttf",
  variable: "--font-public-sans-regular",
  weight: "400",
});

export const metadata = {
  title: "Next.js",
  description: "Prueba técnica Finanex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={` 
          ${publicSansBold.variable} 
          ${publicSansSemiBold.variable} 
          ${publicSansMedium.variable} 
          ${publicSansRegular.variable}
        `}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
