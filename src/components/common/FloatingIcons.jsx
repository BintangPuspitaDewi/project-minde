import { motion } from "framer-motion";

const icons = [
  { src: "/Globe.png", alt: "Globe",   top: "10%", left: "5%",   delay: 0, scale: 1 },
  { src: "/lamp.png",  alt: "Lamp",    top: "15%", right: "10%", delay: 1, scale: 0.8 },
  { src: "/pc.png",    alt: "PC",      bottom: "20%", left: "8%", delay: 2, scale: 0.9 },
  { src: "/penggaris.png", alt: "Ruler", bottom: "10%", right: "5%", delay: 0.5, scale: 1.1 },
  { src: "/pensil.png", alt: "Pencil", top: "40%", right: "30%", delay: 1.5, scale: 0.7 },
  
  // Added more icons
  { src: "/Globe.png", alt: "Globe", bottom: "15%", left: "40%", delay: 2.5, scale: 0.7 },
  { src: "/lamp.png",  alt: "Lamp",  top: "50%", left: "5%",     delay: 0.2, scale: 0.6 },
  { src: "/penggaris.png", alt: "Ruler", top: "5%", right: "40%", delay: 1.8, scale: 0.8 },
  { src: "/pensil.png", alt: "Pencil", top: "25%", left: "25%",  delay: 0.8, scale: 0.9 },
  { src: "/pc.png",    alt: "PC",    top: "60%", right: "15%",   delay: 3,   scale: 0.7 },
];

// Configuration for "Title" variant (more compact/subtle)
const titleIcons = [
    { src: "/Globe.png", alt: "Globe", top: "10%", left: "5%", delay: 0, scale: 0.6 },
    { src: "/pensil.png", alt: "Pencil", bottom: "15%", right: "5%", delay: 1, scale: 0.5 },
    { src: "/lamp.png", alt: "Lamp", top: "15%", right: "10%", delay: 0.5, scale: 0.6 },
    
    // Added more
    { src: "/penggaris.png", alt: "Ruler", bottom: "10%", left: "15%", delay: 1.2, scale: 0.7 },
    { src: "/Globe.png", alt: "Globe", top: "40%", right: "25%", delay: 0.3, scale: 0.5 },
    { src: "/pc.png", alt: "PC", bottom: "40%", left: "5%", delay: 2, scale: 0.4 },
];

export default function FloatingIcons({ variant = "hero", className }) {
  const items = variant === "hero" ? icons : titleIcons;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {items.map((icon, index) => (
        <motion.img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className="absolute object-contain opacity-60 hover:opacity-100 transition-opacity"
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
            width: variant === "hero" ? "60px" : "40px", // Base width
            height: "auto",
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, 5, -5, 0] 
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: icon.delay,
          }}
        />
      ))}
    </div>
  );
}
