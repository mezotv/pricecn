import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#b52ba5',
  maximumScale: 5,
  minimumScale: 1,
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pricecn.com'),
  title: 'pricecn - Pricing Components',
  description: 'pricecn is a collection of pricing components for your next project.',
  robots: 'index, follow',
  publisher: 'Autumn',
  openGraph: {
    title: 'pricecn - Pricing Components',
    description: 'pricecn is a collection of pricing components for your next project.',
    type: 'website',
    url: 'https://pricecn.com',
    locale: 'en_US'
  },
  twitter: {
    title: 'pricecn - Pricing Components',
    description: 'pricecn is a collection of pricing components for your next project.',
    site: '@autumnpricing'
  },
  pinterest: { richPin: true }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
