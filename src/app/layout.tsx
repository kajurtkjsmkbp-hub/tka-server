import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LMS KKA',
  description: 'Platform Pembelajaran Koding dan Kecerdasan Artifisial',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
