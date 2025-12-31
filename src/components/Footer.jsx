import { siteData } from "../data/siteData";
import { Link } from "react-router-dom";
import Container from "./Container";
import { Separator } from "./ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const { footer, socials, contactInfo, brandName } = siteData;

  // Helper to get Icon by label
  const getIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes("instagram")) return <Instagram className="h-5 w-5" />;
    if (l.includes("twitter") || l.includes("x")) return <Twitter className="h-5 w-5" />;
    if (l.includes("facebook")) return <Facebook className="h-5 w-5" />;
    return null;
  };

  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border mt-auto">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt={brandName} className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {footer.brandDescription}
            </p>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {getIcon(social.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footer.columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="block font-medium text-foreground">Address:</span>
                {contactInfo.address}
              </li>
              <li>
                <span className="block font-medium text-foreground">Email:</span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <span className="block font-medium text-foreground">Phone:</span>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors">
                   {contactInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
           <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
           <div className="flex gap-4 mt-2 md:mt-0">
              <Link to="#" className="hover:text-primary">Privacy Policy</Link>
              <Link to="#" className="hover:text-primary">Terms of Service</Link>
           </div>
        </div>
      </Container>
    </footer>
  );
}
