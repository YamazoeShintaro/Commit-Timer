import './globals.css';
import { Inconsolata } from 'next/font/google';
import Link from 'next/link';

const fnt = Inconsolata({ subsets: ['latin'] })

export const metadata = {
  title: 'Commit Timer',
  description: 'あなたの勉強やトレーニングを管理するタイマーアプリです。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={fnt.className}>
        <div className='bg-green-300 flex justify-between fixed top-0 left-0 right-0 z-40'>
          <h1 className='pl-4 py-4 text-2xl'>CommitTimer</h1>
          <div className='flex items-center pr-3'>
            <ul className='flex'>
              <li>
                <Link className='no-underline' href="/">
                  <p className='block px-4 py-1.5 rounded-md hover:bg-gray-300 cursor:pointer'>Home</p>
                </Link>
              </li>
              <li>
                <Link className='no-underline' href="/timer">
                  <p className='block px-3 py-1.5 rounded-md hover:bg-gray-300 cursor:pointer'>Timer</p>
                </Link>
              </li>
              <li>
                <Link className='no-underline' href="/setting">
                  <p className='block px-2 py-1.5 rounded-md hover:bg-gray-300 cursor:pointer'>Setting</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
