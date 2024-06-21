import { Inter } from "next/font/google";
import "./globals.css";
import { Key } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAIT Course Catalogue (2024 Fall)",
  description: "An easy way to browse SAIT offerings",
  keywords: "SAIT Course, 2024 Fall, Timetable"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
