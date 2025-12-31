import React from 'react';

const Logo = ({ src, alt, href, size = 'w-16 h-16' }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-block transition-transform hover:scale-110">
      <img src={src} className={`${size} object-contain`} alt={alt} />
    </a>
  );
};

export default Logo;
