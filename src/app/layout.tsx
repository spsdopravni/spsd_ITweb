import type { Metadata } from "next";
import "./globals.css";
import { SearchProvider } from "@/contexts/SearchContext";
import { CommandPaletteProvider } from "@/contexts/CommandPaletteContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { AuthProvider } from "@/contexts/AuthContext";
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
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-black">
        <PreferencesProvider>
          <LanguageProvider>
            <AuthProvider>
              <SearchProvider>
                <CommandPaletteProvider>
                  <ClientLayout>
                    {children}
                  </ClientLayout>
                </CommandPaletteProvider>
              </SearchProvider>
            </AuthProvider>
          </LanguageProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
