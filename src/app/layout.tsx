import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const neutraFont = localFont({
  src: [
    {
      path: "../fonts/neutra-text.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-neutra",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neutraFont.variable} antialiased font-neutra`}
      >
        {children}
      </body>
    </html>
  );
}
