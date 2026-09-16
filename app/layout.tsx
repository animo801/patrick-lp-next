import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Millionaire Contractor Coach — Free Assessment",
  description:
    "Learn where your contracting business is leaking money. Answer a few questions and get a free, personalized breakdown of where the money is going and how to fix it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="bg-white font-sans text-black pb-20 md:pb-0">
        {children}
      </body>
    </html>
  );
}
