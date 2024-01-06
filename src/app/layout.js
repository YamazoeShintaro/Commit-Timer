import './globals.css';
import { Roboto_Slab, Noto_Serif } from 'next/font/google';
import Link from 'next/link';
import { Home, Timer, Settings } from "@mui/icons-material";

const LogoFnt = Roboto_Slab({ subsets: ['latin'] });
const MainFnt = Noto_Serif({ subsets: ['latin'] });
const HomeIcon = Home;
const TimerIcon = Timer;
const SettingsIcon = Settings;

export const metadata = {
  title: 'Commit Timer',
  description: 'あなたが勉強やトレーニングにCommitできるタイマーアプリです',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <header className={LogoFnt.className}>
          <div
            style={{ backgroundColor: "#101841",fontWeight: 380, fontSize: 28 }}
            className='flex justify-center items-center text-slate-50 fixed top-0 left-0 right-0 z-30'
          >
            <h1 className='my-3'><Link href="/">Commit Timer</Link></h1>
          </div>
        </header>
        <div className={MainFnt.className}>
          {children}
        </div>
        <ul style={{ backgroundColor: "#101841" }} className='flex justify-around text-slate-50 fixed bottom-0 left-0 right-0 z-30'>
          <li>
            <Link href="/">
              <p className="menu-button"><HomeIcon /></p>
            </Link>
          </li>
          <li>
            <Link href="/timer">
              <p className="menu-button"><TimerIcon /></p>
            </Link>
          </li>
          <li>
            <Link href="/setting">
              <p className="menu-button"><SettingsIcon /></p>
            </Link>
          </li>
        </ul>
      </body>
    </html>
  );
}
