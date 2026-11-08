# Architecture
- Keep reusable localized page views separate from thin explicit TanStack route files; this preserves existing URLs and gives every locale its own SSR metadata.
- Derive the current locale from the URL rather than browser preferences; language links and server rendering must agree.
- Keep the shared OAuth callback URL and carry the selected locale through its search parameter; provider configuration and account logic remain unchanged.
- Render the opening and product features as localized React UI with shared app-preview phones and a decorative CDN background; real text and controls preserve translations, accessibility, and responsive sizing.