// Central place for site-wide contact details.
// Update these values to change the WhatsApp number, phone, and email everywhere on the site.

export const SITE_CONFIG = {
  whatsappNumber: "919058955529",
  phoneDisplay: "+91 90589 55529",
  email: "hello@vowsandknots.com",
};

export function getWhatsAppLink(message?: string) {
  const base = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
