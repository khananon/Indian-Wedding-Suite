import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
}

export function SEO({
  title = "Vows & Knots | Indian Digital Wedding Invitations & Wedding Websites",
  description = "Bespoke Indian digital wedding invitations and interactive wedding websites for Hindu, Muslim, Sikh, Christian, and South Indian weddings.",
  canonicalPath = "",
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://vowsandknots.com${canonicalPath}`);
    }
  }, [title, description, canonicalPath]);

  return null;
}
