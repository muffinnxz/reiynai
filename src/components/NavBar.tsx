"use client";
import { Link } from "@/lib/router-events";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useUser from "@/hooks/use-user";
import { signOut } from "@/lib/firebase-auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
          <Link href="/explore" className="hover:text-primary">
            คอร์สเรียน
          </Link>
          <Link href="/pricing" className="hover:text-primary">
            ราคา
          </Link>
        </nav>
        <div className="hidden md:flex space-x-2 items-center">
          {userData ? (
            <>
              <Link href="/profile">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src={userData.avatar || "/default-avatar.png"} />
                  <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <Button onClick={signOut} className="bg-foreground text-background">
                ลงชื่อออก
              </Button>
            </>
          ) : (
            <Button asChild className="bg-foreground text-background">
              <Link href="/login">ลงชื่อเข้าใช้</Link>
            </Button>
          )}
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
              <Link href="/explore" className="hover:text-primary" onClick={toggleMenu}>
                คอร์สเรียน
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-primary" onClick={toggleMenu}>
                ราคา
              </Link>
            </li>
            <li>
              {userData ? (
                <>
                  <Link href="/profile" onClick={toggleMenu}>
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={userData.avatar || "/default-avatar.png"} />
                      <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <Button onClick={signOut} className="bg-foreground text-background w-full text-center">
                    ลงชื่อออก
                  </Button>
                </>
              ) : (
                <Button asChild className="bg-foreground text-background">
                   <Link href="/login">ลงชื่อเข้าใช้</Link>
                </Button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
