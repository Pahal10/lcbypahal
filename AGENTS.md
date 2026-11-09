# Architecture
- Keep reusable localized page views separate from thin explicit TanStack route files; this preserves existing URLs and gives every locale its own SSR metadata.
- Derive the current locale from the URL rather than browser preferences; language links and server rendering must agree.
- Keep the shared OAuth callback URL and carry the selected locale through its search parameter; provider configuration and account logic remain unchanged.
- Render the opening and product features as localized React UI with uploaded CDN app screenshots and one shared decorative background; real text and controls preserve translations while the screenshots retain their original language.
- Keep scroll presentation effects client-side with passive, frame-throttled updates and a reduced-motion fallback; this preserves SSR content and accessible navigation.