import './globals.css';

export const metadata = {
  title: 'Hirely - Jobs & Internships for Students',
  description: 'Connect students and fresh graduates with internship and entry-level opportunities in Egypt',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
