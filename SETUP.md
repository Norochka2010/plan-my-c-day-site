# Plan My C Day — GitHub Pages setup

## Before publishing

The website layout is complete. Privacy and terms are **unfinished drafts**, not effective legal notices. Complete every bracketed field using the app’s actual practices, then remove the draft notices. Confirm the home page wording. All three pages currently include `<meta name="robots" content="noindex">`; remove that tag when ready for search indexing. Noindex does not prevent public access.

To finish the content, provide: the app’s purpose and features; owner/business name and contact email; intended audience and locations served; account and data flows; third-party SDKs/services; storage, retention, deletion and security practices; any payments/subscriptions; and the business jurisdiction. Privacy disclosures should match actual behavior, including integrated services: [FTC app guidance](https://www.ftc.gov/business-guidance/resources/marketing-your-mobile-app-get-it-right-start).

## Files to upload

Keep this structure at the repository root:

```
index.html
CNAME
styles.css
.nojekyll
privacy/
  index.html
terms/
  index.html
```

The shared stylesheet must be uploaded with the three pages. No installation or build is needed. Navigation uses relative links so it works with a repository-based Pages address and a custom domain. SETUP.md is for you and need not be uploaded.

## Enable GitHub Pages

1. Open [your repository](https://github.com/Norochka2010/plan-my-c-day-site). A public repository works with GitHub Free.
2. Upload the files above, preserving the folders, and commit them to `main`. Upload the contents of the site folder, rather than the enclosing folder or ZIP file.
3. Open the repository’s **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/(root)`, and save.
5. Wait for the Pages deployment to finish and use the site link shown in Settings. A typical project address is `https://Norochka2010.github.io/plan-my-c-day-site/`.

Source: [GitHub publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Connect your domain

Your domain: `mycday.com`. Purchased through Namecheap.

First, verify ownership in your GitHub account’s **Settings → Pages → Add a domain**. Add the TXT record GitHub gives you at your DNS provider, finish verification, and keep that record. [Verification instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

In the repository’s **Settings → Pages → Custom domain**, enter `mycday.com` and save **before changing website DNS records**. The included `CNAME` file already contains `mycday.com`; preserve it on future uploads. Confirm the same hostname appears in Pages settings.

In Namecheap, open **Domain List → Manage** beside MyCDay.com, then **Advanced DNS → Host Records → Add New Record**. Set TTL to Automatic and save each record below. These controls apply when using Namecheap BasicDNS, PremiumDNS, or FreeDNS. If your domain uses another provider’s nameservers, edit DNS at that provider instead; changing nameservers can disrupt existing email.

[Namecheap’s GitHub Pages instructions](https://www.namecheap.com/support/knowledgebase/article.aspx/9645/2208/how-do-i-link-my-domain-to-github-pages/).

Configure:

| Type | Host/name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | Norochka2010.github.io |

`@` means the bare domain. Use the GitHub username or organization name; omit `https://` and the repository name from the CNAME value. Replace conflicting website records for these names; preserve unrelated email and verification records. Avoid wildcard records.

After DNS resolves, enable **Enforce HTTPS** in repository Pages settings. DNS and HTTPS availability can each take up to 24 hours. With both names configured, GitHub redirects `www` to the chosen bare domain.

For a subdomain-only site such as `app.mycday.com`, save that hostname as the custom domain and add a CNAME for `app` pointing to `Norochka2010.github.io`; do not change the bare domain’s A records.

Source: [GitHub custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Final checks

Open your homepage, `/privacy/`, and `/terms/` over HTTPS. Follow the navigation on each page and check it on your phone. Confirm no bracketed draft fields or draft notices remain before using these URLs in app-store submissions. The files have not been uploaded and no domain settings have been changed on your behalf.

## Your public URLs after deployment

- Home: https://mycday.com/
- Privacy Policy: https://mycday.com/privacy/
- Terms of Service: https://mycday.com/terms/

Owner: Nora Im. Support: support@mycday.com.

## Authentication email links

Password reset and signup confirmation use `https://mycday.com/auth/`. Publish the
`auth/` directory (index.html, handoff.js, style.css) together. The static page
passes valid recovery/signup fragments to the existing `mobile://me` app handler.
Passwords are changed in the installed app, not on this website. No credentials
are sent to GitHub Pages, stored in browser storage, or loaded by third-party scripts.

In Supabase → Authentication → URL Configuration, add exactly
`https://mycday.com/auth/` to Redirect URLs. Keep existing valid redirects, including
the former ChatGPT site, while older app versions and already-sent emails use them.
Email templates should use `{{ .ConfirmationURL }}` so Supabase verifies the link
and respects the app-supplied redirect. Rebuild/update the app to use the new URL.

Verify both a fresh reset email and signup confirmation on a phone with the app
installed. Expired links should show a request-new-email message; opening `/auth/`
without a link should show instructions. A reset for another account must retain
the app's existing account-mismatch protection.
