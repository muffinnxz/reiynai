// components/NavBar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NavBar = () => {
    return (
        <header className="bg-background shadow-md text-foreground">
            <div className="container mx-auto flex justify-between items-center py-4">
                <div className="text-2xl font-bold">
                    <Link href="/">genai101</Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/explore-courses"
                                className="hover:text-primary"
                            >
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/pricing"
                                className="hover:text-primary"
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="space-x-2 flex items-center">
                    <Button variant="secondary" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-foreground text-background">
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
