import type { Metadata } from "next";
import { Bricolage_Grotesque, Chivo, DM_Mono } from "next/font/google";
import { FilmGrain } from "@/components/FilmGrain";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-chivo",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evisprodutora.com.br"),
  title: {
    default: "Evis Produtora — Audiovisual que Dá Resultado",
    template: "%s | Evis Produtora",
  },
  description:
    "Vídeos institucionais e ensaios corporativos em Belém/PA e todo o Brasil. Produção audiovisual estratégica para empresas que dá resultado, não vaidade.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://evisprodutora.com.br",
    siteName: "Evis Produtora",
    title: "Evis Produtora — Audiovisual que Dá Resultado",
    description:
      "Vídeos institucionais e ensaios corporativos em Belém/PA e todo o Brasil. Produção audiovisual estratégica para empresas que dá resultado, não vaidade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evis Produtora — Audiovisual que Dá Resultado",
    description:
      "Vídeos institucionais e ensaios corporativos em Belém/PA e todo o Brasil. Produção audiovisual estratégica para empresas que dá resultado, não vaidade.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${chivo.variable} ${dmMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-(--color-ground) text-(--color-cream) font-(--font-body)">
        <FilmGrain />
        {children}
      </body>
    </html>
  );
}
