import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shyam Syangtan - Portfolio",
  description: "Personal portfolio website of Shyam Syangtan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
