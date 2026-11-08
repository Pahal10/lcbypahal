# Architecture
- Keep reusable localized page views separate from thin explicit TanStack route files; this preserves existing URLs and gives every locale its own SSR metadata.
- Derive the current locale from the URL rather than browser preferences; language links and server rendering must agree.
- Keep the shared OAuth callback URL and carry the selected locale through its search parameter; provider configuration and account logic remain unchanged.
- Render supplied device-specific opening artwork through responsive CDN image pointers with accessible link overlays for pictured controls; this preserves the exact composition without duplicate navigation.