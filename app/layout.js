import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAIT Course Catalogue (2025 Winter)",
  description: "An easy way to browse SAIT offerings",
  keywords: "SAIT Course, 2025 Winter, Timetable"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
