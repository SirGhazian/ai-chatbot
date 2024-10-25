import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const outfitFont = localFont({
  src: "./fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NgawurGPT",
  description: "Real-time AI chatbot with Gemini API integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfitFont.variable} antialiased`}>
        <div className="font-[family-name:var(--font-outfit)]">{children}</div>
      </body>
    </html>
  );
}
