This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Login de Google y contador de partidos

- El generador es público. La pelota del título abre el acceso con Google para consultar el contador con `yv.avila@gmail.com`.
- Configura `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID` y `NEXT_PUBLIC_FIREBASE_APP_ID` con los valores de la app web de Firebase. Usa `.env.local` en local y las variables del proyecto en Vercel.
- Habilita Google en Firebase Authentication y añade el dominio de Vercel a los dominios autorizados. Para probar en local, autoriza también `localhost`.
- En Cloud Firestore, publica el bloque de reglas de `pachangaGenerations` de [firestore.rules](firestore.rules). Si la base ya tiene reglas para otras colecciones, integra el bloque en el conjunto actual. Si este archivo contiene todas las reglas que necesitas, puedes publicarlo con `firebase deploy --only firestore:rules --project padelcana-2635f`.
- Al guardar un sorteo, el navegador intenta registrar únicamente la cantidad de partidos y la hora del servidor. El contador admite registros de visitantes sin sesión y la lectura está limitada a la cuenta administradora verificada. Agrupa por día de generación en la zona horaria de Madrid. El generador funciona aunque el registro de estadísticas falle.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
