import type { Metadata } from 'next';

import '@/styles/index.scss';
import { Inter } from 'next/font/google';

import { Container } from '@/components/Container';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Student Management',
    template: '%s | Student Management',
  },
  description: 'Manage Students app',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <Container>{children}</Container>

      <Toaster />
    </body>
  </html>
);

export default RootLayout;
