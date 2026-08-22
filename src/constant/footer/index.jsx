import React from "react";

const footerNavigation = {
  products: [
    { name: "All products", href: "#" },
    { name: "Plans & pricing", href: "#" },
    { name: "Roadmap", href: "#" },
    { name: "Integrations", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Services", href: "#" },
  ],
  resources: [
    { name: "All resources", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Developers", href: "#" },
    { name: "Support", href: "#" },
    { name: "Education", href: "#" },
  ],
  company: [
    { name: "About us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Terms and conditions", href: "#" },
  ],
};

const legalLinks = [
  { name: "Website terms of use", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Trust Center", href: "#" },
];

function Footer() {
  return (
    <footer className="bg-brand-primary text-white w-full min-h-screen flex flex-col justify-between p-8 md:p-16">
      {/* Top Section: Brand & Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl w-full mx-auto">

        {/* Products Column */}
        <div>
          <h3 className="font-semibold text-lg text-brand-surface mb-4">
            Products
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {footerNavigation.products.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-white/90 hover:text-brand-surface hover:underline transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h3 className="font-semibold text-lg text-brand-surface mb-4">
            Resources
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {footerNavigation.resources.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-white/90 hover:text-brand-surface hover:underline transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h3 className="font-semibold text-lg text-brand-surface mb-4">
            Company
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {footerNavigation.company.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-white/90 hover:text-brand-surface hover:underline transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section: Legal & Copyright */}
      <div className="max-w-7xl w-full mx-auto pt-8 mt-12 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/80">
        <ul className="flex flex-wrap gap-6 items-center">
          {legalLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="hover:underline hover:text-white">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;