# Architecture
- Keep reusable localized page views separate from thin explicit TanStack route files; this preserves existing URLs and gives every locale its own SSR metadata.
- Derive the current locale from the URL rather than browser preferences; language links and server rendering must agree.
- Keep the shared OAuth callback URL and carry the selected locale through its search parameter; provider configuration and account logic remain unchanged.
- Keep supplied product artwork in a CDN asset pointer and render it full-width without its screenshot navigation; this preserves the artwork without duplicating site controls.