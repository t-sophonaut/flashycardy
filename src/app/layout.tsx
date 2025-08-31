import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Flashy Cardy - Flashcard App",
  description: "A flashcard application with Clerk authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${poppins.variable} antialiased`}
        >
          <header className="bg-background border-b p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold">
                  <a href="/" className="hover:text-primary">Flashy Cardy</a>
                </h1>
                <nav className="flex items-center space-x-6">
                  <SignedIn>
                    <a href="/dashboard" className="text-sm hover:text-primary transition-colors">
                      Dashboard
                    </a>
                  </SignedIn>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <Button variant="outline" asChild>
                    <SignInButton mode="modal">Sign In</SignInButton>
                  </Button>
                  <Button asChild>
                    <SignUpButton mode="modal">Sign Up</SignUpButton>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
