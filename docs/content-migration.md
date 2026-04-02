# Content Migration Checklist

Use this whenever identity/content is migrated to a new owner.

## 1) Core Identity
- [ ] `data/modules/profile.ts` updated (`name`, `email`, `bio`, `roles`, `location`)
- [ ] `social` links updated
- [ ] `app/layout.tsx` metadata (title/description/author/site URL) updated

## 2) Portfolio Content
- [ ] `experience` replaced
- [ ] `projects` replaced
- [ ] `education` replaced
- [ ] `skills` replaced
- [ ] `organizations` reviewed
- [ ] `photos` reviewed

## 3) App Surface
- [ ] `AppId` / app names are consistent (`ArihantGPT` naming)
- [ ] Home screen app icons open valid destinations
- [ ] Empty optional social links are hidden (not shown as broken icons/cards)

## 4) AI Assistant
- [ ] `app/api/chat/route.ts` system prompt updated to new owner
- [ ] Removed old private facts and old social handles

## 5) Docs & Branding
- [ ] `README.md` updated
- [ ] all `*.md` files mention only current owner
- [ ] favicon/logo/title updated if needed

## 6) Verification
- [ ] `npm run check:integrity`
- [ ] `npm run build`
- [ ] manual click-test of every app icon + dock icon
