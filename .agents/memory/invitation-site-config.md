---
name: Invitation-site config pattern
description: Where site-wide contact info and template gallery data live in the invitation-site artifact
---

In `artifacts/invitation-site`:

- `src/config/site.ts` holds site-wide contact details (WhatsApp number, display phone, email) plus a `getWhatsAppLink()` helper. Any page that links to WhatsApp or shows the phone/email must import from here instead of hardcoding values.
- `src/data/templates.ts` holds the Featured Designs / template gallery list (name, category, price, image, optional `link` for an external demo URL). `src/hooks/use-templates.ts` just filters this array — it is not a fetch/query against a backend.
- `TemplateCard.tsx` renders an up-right arrow icon button in the top-right corner only when a template's `link` field is set, opening it in a new tab. Adding/removing/redesigning a featured template is a pure data edit in `templates.ts`, no component changes needed.

**Why:** user wanted Featured Designs/pricing/photos easily editable without touching component code, plus a single source of truth for the WhatsApp/phone number used across Home and Contact pages.
