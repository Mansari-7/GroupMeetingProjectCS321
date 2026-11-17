import { Pixelify_Sans } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel/square";
import "./globals.css";

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});

export const metadata = {
  title: "Study Group Finder App",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${pixelify.variable} ${GeistPixelSquare.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
