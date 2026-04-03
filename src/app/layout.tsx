import type { Metadata } from "next";
import "./globals.css";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  title: {
    default: `${personal.name}`,
    template: `%s — ${personal.name}`,
  },
  authors: [{ name: personal.name }],
  creator: personal.name,
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-[600px] px-6 py-12 md:py-20">{children}</main>
      </body>
    </html>
  );
}
