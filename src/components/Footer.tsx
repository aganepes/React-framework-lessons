import React from 'react';

interface FooterProps {
  companyName: string;
}

interface FooterLink {
  label: string;
  url: string;
}

const footerLinks: FooterLink[] = [
  { label: 'Privacy Policy', url: '/privacy' },
  { label: 'Terms of Use', url: '/terms' },
  { label: 'About Us', url: '/about' },
  { label: 'Contact', url: '/contact' },
];

const Footer: React.FC<FooterProps> = ({ companyName}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <div style={{fontSize:".6rem", margin:0}}>
          &copy; {currentYear} **{companyName}**. All rights reserved.
        </div>
        
        <nav style={{display:"flex",gap:"10px"}}>
          {footerLinks.map((link) => (
            <a 
              key={link.label}
              href={link.url}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;