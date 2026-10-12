import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string;
  jsonLd?: Record<string, any>;
}

export function SEO({
  title = "Vows & Knots | Indian Digital Wedding Invitations & Wedding Websites",
  description = "Bespoke Indian digital wedding invitations and interactive wedding websites for Hindu, Muslim, Sikh, Christian, and South Indian weddings.",
  canonicalPath = "",
  keywords,
  jsonLd,
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

    if (keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement("meta");
        metaKw.setAttribute("name", "keywords");
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute("content", keywords);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", `https://indian-wedding-suite-api-server.vercel.app${canonicalPath}`);
    }

    const twUrl = document.querySelector('meta[name="twitter:url"]');
    if (twUrl) {
      twUrl.setAttribute("content", `https://indian-wedding-suite-api-server.vercel.app${canonicalPath}`);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", `https://indian-wedding-suite-api-server.vercel.app${canonicalPath}`);
    }

    // Dynamic JSON-LD structured data for Google Search rich snippets
    if (jsonLd) {
      let scriptTag = document.getElementById("page-jsonld");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "page-jsonld";
        scriptTag.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, canonicalPath, keywords, jsonLd]);

  return null;
}
