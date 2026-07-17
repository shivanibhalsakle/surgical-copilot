import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "O.R.A.C.L.E.",
  description:
    "Operating Room AI Clinical Learning and Evaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="mx-auto max-w-[1500px] px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}