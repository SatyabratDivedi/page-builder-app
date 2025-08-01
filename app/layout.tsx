import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page Builder",
  description: "Create pages with API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
