import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import FloatingIcons from "./FloatingIcons";

export default function SectionTitle({ title, subtitle, className, align = "center", withDecorations = false }) {
  return (
    <div className={cn("mb-16 space-y-6 relative", align === "center" ? "text-center" : "text-left", className)}>
      {withDecorations && <FloatingIcons variant="title" className="h-[150%] -top-1/4" />}
      <div className="relative inline-block">
        <h2 className="relative z-10 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-foreground drop-shadow-sm">
          {title}
        </h2>
        {/* Decorative element behind/under title */}
        <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={cn(
                "absolute -bottom-2 h-3 bg-[#B88E2F]/20 -z-0 rounded-full",
                align === "center" ? "left-1/2 -translate-x-1/2 w-1/2" : "left-0 w-1/3"
            )}
        />
        
        {/* Fancy SVG Underline (only centered for now) */}
        {align === "center" && (
            <div className="flex justify-center mt-2">
                <svg width="120" height="12" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                   <path d="M2 5C20 5 30 9 50 9C70 9 80 5 98 5" stroke="#B88E2F" strokeWidth="2" strokeLinecap="round" />
                   <circle cx="50" cy="5" r="3" fill="#B88E2F" />
                </svg>
            </div>
        )}
      </div>
      
      {subtitle && (
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
