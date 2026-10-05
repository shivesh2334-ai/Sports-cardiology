# Sports Cardiology Risk Navigator

A Next.js application for exercise risk stratification, recommendations with evidence levels, and suggested investigations based on the 2020 ESC sports cardiology guideline.

## Local development

Requires Node.js 22 or 24.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm start
```

## Vercel deployment

Import this repository, choose the Next.js framework, and use the repository root as the Root Directory. Install with `npm ci` and build with `npm run build`; Vercel manages the output directory. No environment variables or API keys are required.

The app source is in `app/`. The original ZIP is retained for reference; its embedded Git history is not used.

Decision support only. Verify recommendations against the source guideline and apply clinical judgement. Not validated as a medical device.
