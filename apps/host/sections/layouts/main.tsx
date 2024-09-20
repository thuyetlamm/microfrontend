// routes
import { usePathname } from "@repo/utils/routes/hooks";

import { cn } from "@repo/ui/lib/utils";
import Header from "./header";
import Footer from "./footer";
import { Inter } from "next/font/google";
import {useOnlineStatus} from "@/hooks/useOnline.ts";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const isOnline = useOnlineStatus()
  console.log(isOnline)

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}
    >
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 py-6 border-b">
          {isOnline ? children : (
              <div className={cn('w-full')}>
                Rớt mạng rồi má ơiii
              </div>
          )}
          </div>
        <Footer />
      </div>
    </div>
  );
}
