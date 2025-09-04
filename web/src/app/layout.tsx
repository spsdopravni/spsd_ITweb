import type { Metadata } from "next";
import "./globals.css";
import { SearchProvider } from "@/contexts/SearchContext";
import { CommandPaletteProvider } from "@/contexts/CommandPaletteContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ClientLayout } from "@/components/layout/ClientLayout";


export const metadata: Metadata = {
  title: "IT Obor- SPSD",
  description: "Procházej svůj studentský život s lehkostí. Přistupuj k projektům, událostem, soutěžím a zdrojům na jednom místě.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black">
        <LanguageProvider>
          <SearchProvider>
            <CommandPaletteProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </CommandPaletteProvider>
          </SearchProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
