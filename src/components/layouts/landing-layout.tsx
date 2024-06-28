import Footer from "../footer";
import Navbar from "../navbar";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-full">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
