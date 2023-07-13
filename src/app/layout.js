import './globals.css'
import 'react-calendar/dist/Calendar.css'
import { Inter } from 'next/font/google'
// import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Curso FullStack - UNICOLOMBO',
  description: 'Curso FullStack - UNICOLOMBO'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
      {/* <Toaster /> */}
    </html>
  )
}
