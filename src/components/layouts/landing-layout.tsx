import Navbar from "../NavBar";
import ChatButton from "../chatui";
import Footer from "../footer";

export default function LandingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      <Navbar />
      {children}
      <Footer />
      <ChatButton />
    </div>
  );
}
