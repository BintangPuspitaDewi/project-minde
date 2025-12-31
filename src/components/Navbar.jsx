import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { siteData } from "../data/siteData";
import { cn } from "../lib/utils";
import Container from "./Container";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion } from "framer-motion";

export default function Navbar() {
  const { brandName, navLinks } = siteData;
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent border-transparent"
    )}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 no-underline">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            {/* Added brandName text again if needed, or keep accessible only */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions / Mobile Menu */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Sheet onOpenChange={setIsOpen} open={isOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%] max-w-[320px] bg-[#FDF8EE] border-l border-[#B88E2F]/10 p-0 flex flex-col">
                    {/* Cloud/Pattern Decoration */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <img src="/logo.png" className="w-32 h-auto grayscale" alt="" />
                    </div>

                    <div className="p-8 pb-4">
                        <img src="/logo.png" alt="Minde Logo" className="h-12 w-auto mb-6" />
                        <div className="h-px w-full bg-[#B88E2F]/20 mb-8" />
                    </div>

                    <div className="flex flex-col gap-6 px-8 flex-1 overflow-y-auto">
                         {navLinks.map((link) => (
                              <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-lg font-medium tracking-wide transition-all duration-300 hover:text-primary hover:translate-x-2 flex items-center justify-between group",
                                    location.pathname === link.href ? "text-primary" : "text-foreground/70"
                                )}
                              >
                                {link.label}
                                <span className={cn(
                                    "w-1.5 h-1.5 rounded-full bg-primary transition-opacity", 
                                    location.pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                                )} />
                              </Link>
                         ))}
                    </div>

                    <div className="p-8 mt-auto">
                        <div className="h-px w-full bg-[#B88E2F]/20 mb-6" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            © {new Date().getFullYear()} Minde Project.<br/>
                            Knitted with love.
                        </p>
                    </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
