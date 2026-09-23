import type { Metadata } from "next";
import { Bricolage_Grotesque, Chivo, DM_Mono } from "next/font/google";
import { FilmGrain } from "@/components/FilmGrain";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
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

const HOME_TITLE = "Evis Produtora — Audiovisual que Dá Resultado";
const HOME_DESCRIPTION =
  "Vídeos institucionais e ensaios corporativos em Belém/PA e todo o Brasil. Produção audiovisual estratégica para empresas que dá resultado, não vaidade.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
