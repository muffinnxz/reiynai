const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground py-4">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="#" className="hover:text-primary">
                        Facebook
                    </a>
                    <a href="#" className="hover:text-primary">
                        Twitter
                    </a>
                    <a href="#" className="hover:text-primary">
                        LinkedIn
                    </a>
                </div>
                <p>Email: contact@ReiynAI.com | Phone: 123-456-7890</p>
                <p>&copy; 2024 ReiynAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
