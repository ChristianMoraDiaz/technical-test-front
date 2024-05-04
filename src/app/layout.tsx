import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Technical Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-100 pl-8 pr-8 ">
          <div className="navbar-start">
            <button className="btn btn-ghost">
              <Link href="/">Home</Link>
            </button>
          </div>
          <div className="navbar-end">
            <div className="dropdown pr-2">
              <button tabIndex={0} className="btn btn-ghost">
                Employees
              </button>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32">
                <li>
                  <Link href="/employees">List</Link>
                </li>
                <li>
                  <Link href="/employees/create">Create</Link>
                </li>
                <li>
                  <Link href="/employees/edit">Edit</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
