"use client";
import { Link } from "@/lib/router-events";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useUser from "@/hooks/use-user";
import { signOut } from "@/lib/firebase-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { userData } = useUser();

  return (
    <header className="bg-background shadow-md text-foreground">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <div className="text-2xl font-bold">
            <Link href="/">Reiyn AI</Link>
          </div>
        </div>
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="space-x-4">
            <Link href="/" className="hover:text-primary">
              หน้าหลัก
            </Link>
            <Link href="/explore" className="hover:text-primary">
              คอร์สเรียน
            </Link>
            <Link href="/pricing" className="hover:text-primary">
              ราคา
            </Link>
          </nav>
        </div>
        <div className="flex-1 flex justify-end items-center md:space-x-8 space-x-4">
          {userData ? (
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-10 h-10 border cursor-pointer">
                    <AvatarImage src={userData.avatar || "/default-avatar.png"} />
                    <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={signOut}>ออกจากระบบ</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild className="bg-foreground text-background">
              <Link href="/login">ลงชื่อเข้าใช้</Link>
            </Button>
          )}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
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
              <Link href="/explore" className="hover:text-primary" onClick={toggleMenu}>
                คอร์สเรียน
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary" onClick={toggleMenu}>
                ราคา
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
