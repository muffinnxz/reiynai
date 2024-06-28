"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useUser from "@/hooks/use-user";
import { signIn, signOut } from "@/lib/firebase-auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { userData } = useUser();

  return (
    <header className="bg-background shadow-md text-foreground">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-2xl font-bold">
          <Link href="/">Reiyn AI</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-primary">
            หน้าหลัก
          </Link>
          <Link href="/explore-courses" className="hover:text-primary">
            คอร์สเรียน
          </Link>
          <Link href="/pricing" className="hover:text-primary">
            ราคา
          </Link>
        </nav>
        <div className="hidden md:flex space-x-2 items-center">
          <Button asChild className="bg-foreground text-background w-full text-center">
            <Link href="/login" onClick={toggleMenu}>
              ลงชื่อเข้าใช้
            </Link>
          </Button>
        </div>

        {/* On mobile device */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-background">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link href="/" className="hover:text-primary" onClick={toggleMenu}>
                หน้าหลัก
              </Link>
            </li>
            <li>
              <Link href="/explore-courses" className="hover:text-primary" onClick={toggleMenu}>
                คอร์สเรียน
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary" onClick={toggleMenu}>
                ราคา
              </Link>
            </li>
            <li>
              <Button asChild className="bg-foreground text-background w-full text-center">
                <Link href="/login" onClick={toggleMenu}>
                  ลงชื่อเข้าใช้
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
