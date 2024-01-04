import './globals.css';
import { Roboto_Slab, Noto_Serif } from 'next/font/google';
import Link from 'next/link';
import { Home, Timer, Settings } from "@mui/icons-material";

const LogoNavFnt = Roboto_Slab({ subsets: ['latin'] });
const MainFnt = Noto_Serif({ subsets: ['latin'] });
const HomeIcon = Home;
const TimerIcon = Timer;
const SettingsIcon = Settings;

export const metadata = {
  title: 'Commit Timer',
  description: 'あなたの勉強やトレーニングを管理するタイマーアプリです。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <header className={LogoNavFnt.className}>
          <div style={{ backgroundColor: "#101841",fontWeight: 380, fontSize: 28 }} className='flex justify-center items-center fixed top-0 left-0 right-0 z-30 text-slate-50'>
            <h1 className='my-3'><Link href="/">Commit Timer</Link></h1>
          </div>
        </header>
        <div className={MainFnt.className}>
          {children}
        </div>
        <footer className={LogoNavFnt.className}>
          <ul style={{ backgroundColor: "#101841", fontSize: 15 }} className='flex justify-around fixed bottom-0 left-0 right-0 z-30 text-slate-50'>
            <li>
              <Link className='no-underline' href="/">
                <p className="menu-button"><HomeIcon /></p>
              </Link>
            </li>
            <li>
              <Link className='no-underline' href="/timer">
                <p className="menu-button"><TimerIcon /></p>
              </Link>
            </li>
            <li>
              <Link className='no-underline' href="/setting">
                <p className='menu-button'><SettingsIcon /></p>
              </Link>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
