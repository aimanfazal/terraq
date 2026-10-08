# Virdis

![React](https://img.shields.io/badge/React-18-000000?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Framework-000000?style=flat-square&logo=tailwindcss)
![Mapbox](https://img.shields.io/badge/Mapbox-GL_JS-000000?style=flat-square&logo=mapbox)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Pro-1A73E8?style=flat-square&logo=google)
![EarthEngine](https://img.shields.io/badge/Google_Earth_Engine-Sentinel--2-4285F4?style=flat-square&logo=googleearth)
![License](https://img.shields.io/badge/License-AGPL_v3-000000?style=flat-square)

Satellite-powered agricultural and land analytics platform. Draw regions on a map, get NDVI vegetation analysis, soil profiling, climate data, land use classification, and AI crop planning — all in one dashboard.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript 5 + Vite 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Mapping | Mapbox GL JS 3 |
| Backend | Vercel Edge Functions (`/api/*`) |
| Satellite | Google Earth Engine (Sentinel-2, ESA WorldCover, SRTM, CHIRPS) |
| AI | Google Gemini 2.5 Pro |
| Weather | Open-Meteo (free, no key) |
| Soil | ISRIC SoilGrids (free, no key) |

## Local Development

Requires [Vercel CLI](https://vercel.com/docs/cli) to run the frontend and API routes together.

```bash
npm i -g vercel
git clone https://github.com/your-org/virdis
cd virdis
npm install
```

Create a `.env` file in the project root:

```env
MAPBOX_TOKEN=pk.eyJ1...
GEE_PROJECT_ID=your-google-cloud-project-id
GEE_SERVICE_ACCOUNT_JSON={"type":"service_account","private_key":"-----BEGIN RSA PRIVATE KEY-----\n..."}
GEMINI_API_KEY=AIza...
```

> `GEE_SERVICE_ACCOUNT_JSON` must be the full JSON key on a single line.

Link to Vercel (one-time):

```bash
vercel link   # Create new project, answer "no" to all customisation prompts
```

Run:

```bash
vercel dev    # http://localhost:3000
```

> `npm run dev` starts Vite only — `/api/*` routes will not work without `vercel dev`.

## Deployment

```bash
vercel deploy --prod
```

Set these in **Vercel → Settings → Environment Variables**:

| Variable | Required |
|----------|----------|
| `MAPBOX_TOKEN` | Yes |
| `GEE_PROJECT_ID` | Yes |
| `GEE_SERVICE_ACCOUNT_JSON` | Yes |
| `GEMINI_API_KEY` | Yes |
| `VITE_SUPABASE_URL` | No |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | No |

## License

```
GNU AFFERO GENERAL PUBLIC LICENSE v3
```
