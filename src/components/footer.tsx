import { DISCORD_INVITE_LINK } from "@/constants/links";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          {/* TODO: Put Facebook and Github */}
          <a
            href="https://www.facebook.com/profile.php?id=61561649669483"
            className="hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://github.com/muffinnxz/reiynai"
            className="hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href={DISCORD_INVITE_LINK} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
            Discord
          </a>
        </div>
        <p>Email: reiynai.official@gmail.com</p>
        <p>&copy; 2024 ReiynAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
