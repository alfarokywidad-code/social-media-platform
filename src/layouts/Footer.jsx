import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="/about">About</a>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/help">Help</a>
            </div>

            <p className="footer-copyright">
                © 2026 Social Media Platform. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;