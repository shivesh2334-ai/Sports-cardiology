import './globals.css';
export const metadata = { title: 'Sports Cardiology Risk Navigator', description: 'Exercise risk stratification based on the 2020 ESC Guidelines on sports cardiology and exercise in patients with cardiovascular disease' };
export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>);
}
