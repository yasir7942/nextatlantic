//import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/layout/navigation";
import { Oswald } from "next/font/google"
import Footer from "./components/layout/footer";


//const inter = Inter({ subsets: ["latin"] });

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '500', '600', '700']
})

export const metadata = {
  title: "Atlantic Grease and Lubricants FZC (AGL) - A Leading Manufacturer Company",
  description: "Pioneers of Lubricants and Grease Manufacturing Atlantic Grease & Lubricants is one of the leading manufacturers in the automotive industry providing high-performance products certified by renowned European and American automobileindustries.AGL incorporates cutting-edge expertise with certified lubricants and greases for customersglobally. Our consistent dedication to innovation, excellence, and customer satisfaction",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  alternates: {
    canonical:  process.env.NEXT_PUBLIC_BASE_URL,
    languages: {
      'en-US': process.env.NEXT_PUBLIC_BASE_URL,
      'en-UK': process.env.NEXT_PUBLIC_BASE_URL,
      'ar-AR': process.env.NEXT_PUBLIC_BASE_URL,
      'fr-FR': process.env.NEXT_PUBLIC_BASE_URL,
      'es-ES': process.env.NEXT_PUBLIC_BASE_URL,
    },
  },
  openGraph: {
    images: '/opengraph-image.jpg',
    locale: 'en_US',
    type: 'website',
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={oswald.className} >
        <Navigation />

        {children}

        <Footer />
      </body>
    </html>
  );
}
