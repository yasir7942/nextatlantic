//import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/layout/navigation";
import {Oswald} from "next/font/google"
import Footer from "./components/layout/footer";


//const inter = Inter({ subsets: ["latin"] });

const oswald =Oswald ({
  subsets :['latin'],
  weight: ['200','500','600','700']
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={ oswald.className} >
           <Navigation />

        {children}

        <Footer />
      </body>
    </html>
  );
}
