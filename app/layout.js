import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Saif Academy - When teaching is an art, Learning is entertaining',
  description: 'The objectives of Saif Academy are- 1. To teach academic English for PEC, JSC, SSC and HSC candidates 2. To teach basic English 3. To teach everyday English 4. To motivate the students and the guardians 5. To share  teaching experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
