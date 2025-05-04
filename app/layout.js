import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Professional Portfolio | Photo & Video Editor, Full Stack Developer, Gamer & IT Innovator',
  description: 'Professional portfolio showcasing expertise in photo and video editing, full stack development, gaming, and innovative IT solutions.',
  keywords: 'portfolio, photo editing, video editing, full stack developer, gaming, IT innovation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
