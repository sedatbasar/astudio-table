import "./globals.css";
import localFont from "next/font/local";
import Breadcrumb from "@/components/Breadcrumb";
import Providers from "@/store/providers";

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
      <body className={`${neutraFont.variable} antialiased font-neutra`}>
        <main className="container mx-auto px-4">
          <Providers>
            <Breadcrumb />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
