import './globals.css';
import { Roboto_Slab, Noto_Serif } from 'next/font/google';
import Link from 'next/link';

const headerFnt = Roboto_Slab({ subsets: ['latin'] });
const mainFnt = Noto_Serif({ subsets: ['latin'] });

export const metadata = {
  title: 'Commit Timer',
  description: 'あなたの勉強やトレーニングを管理するタイマーアプリです。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <header className={headerFnt.className}>
          <div style={{ backgroundColor: "#101841" }} className='flex justify-between fixed top-0 left-0 right-0 z-30'>
            <h1 style={{ fontWeight: 400, fontSize: 22 }} className='text-slate-50 ml-3 my-5'><Link href="/">Commit Timer</Link></h1>
            <div style={{ color: "#70acce" }} className='flex items-center pr-1'>
              <ul style={{ fontSize: 15 }} className='flex'>
                <li>
                  <Link className='no-underline' href="/">
                    <p className='block px-1.5 py-1.5 mr-1 rounded duration-200 hover:text-slate-50 cursor:pointer'>Home</p>
                  </Link>
                </li>
                <li>
                  <Link className='no-underline' href="/timer">
                    <p className='block px-1.5 py-1.5 mr-1 rounded duration-200 hover:text-slate-50 cursor:pointer'>Timer</p>
                  </Link>
                </li>
                <li>
                  <Link className='no-underline' href="/setting">
                    <p className='block px-1 py-1.5 rounded duration-200 hover:text-slate-50 cursor:pointer'>Setting</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div className={mainFnt.className}>
          {children}
        </div>
      </body>
    </html>
  );
}
