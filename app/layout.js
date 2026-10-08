import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
const serif = Fraunces({ subsets: ["latin"], variable: "--serif", axes: ["opsz"] });
const sans = Manrope({ subsets: ["latin"], variable: "--sans" });
export const metadata = {
  title: "Family Dental Studio | Dentist in Vesu, Surat",
  description: "Root canal, smile designing, dentures and implants with Dr. Mayuri Jain. Rated 4.9 by 68+ patients in Vesu, Surat.",
};
export default function Layout({ children }) {
  return (<html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>);
}
