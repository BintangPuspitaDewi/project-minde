import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slot } from "@radix-ui/react-slot";
import { cn } from '../../lib/utils';

const DropdownMenuContext = createContext({
  open: false,
  setOpen: () => {},
});

export const DropdownMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left" ref={triggerRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = ({ asChild, children, className }) => {
  const { open, setOpen } = useContext(DropdownMenuContext);
  const Comp = asChild ? Slot : "div";
  
  return (
    <Comp 
      onClick={() => setOpen(!open)} 
      className={cn(asChild ? "" : "cursor-pointer", className)}
    >
       {children}
    </Comp>
  );
};

export const DropdownMenuContent = ({ align = "center", children, className }) => {
  const { open, setOpen } = useContext(DropdownMenuContext);
  
  return (
    <AnimatePresence>
      {open && (
         <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
              align === "end" ? "right-0" : "left-0",
              "mt-2",
              className
            )}
         >
           {children}
         </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DropdownMenuItem = ({ children, onClick, className, inset }) => {
  const { setOpen } = useContext(DropdownMenuContext);
  
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      onClick={(e) => {
        if (onClick) onClick(e);
        setOpen(false); // Close menu on item click
      }}
    >
      {children}
    </div>
  );
};
