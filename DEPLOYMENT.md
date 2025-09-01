# Deployment Guide for Flashy Cardy

This guide will help you deploy your Next.js flashcard application to production.

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications and is created by the same team.

### Step 1: Prepare Environment Variables

1. Copy `.env.example` to `.env.local` for local development
2. Fill in your actual values:
   - **Clerk keys**: Get from [Clerk Dashboard](https://dashboard.clerk.com)
   - **Database URL**: Get from [Neon Console](https://console.neon.tech)

### Step 2: Deploy to Vercel

#### Option A: GitHub Integration (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `flashycardy` repository
4. Vercel will auto-detect Next.js settings
5. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add DATABASE_URL

# Redeploy with environment variables
vercel --prod
```

### Step 3: Configure Clerk for Production

1. In [Clerk Dashboard](https://dashboard.clerk.com):
   - Go to your application
   - Navigate to "Domains" 
   - Add your Vercel domain (e.g., `flashycardy.vercel.app`)
   - Update redirect URLs to match your production domain

### Step 4: Database Setup

1. In [Neon Console](https://console.neon.tech):
   - Ensure your database is created
   - Run migrations: `npm run db:push` (locally with production DATABASE_URL)
   - Or use Neon's SQL Editor to set up tables

## 🔧 Alternative Deployment Options

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Railway
1. Connect GitHub repository
2. Railway will auto-detect Next.js
3. Add environment variables
4. Deploy

### Self-hosted (VPS/Docker)
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key (client-side) | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key (server-side) | ✅ |
| `DATABASE_URL` | Neon PostgreSQL connection string | ✅ |

## 🚨 Security Checklist

- [ ] Environment variables are set in deployment platform
- [ ] Clerk domain is configured for production URL
- [ ] Database connection works with production credentials
- [ ] All API routes are protected with Clerk authentication
- [ ] HTTPS is enabled (automatic on Vercel/Netlify)

## 🔍 Troubleshooting

### Build Failures
- Run `npm run build` locally to catch errors
- Check ESLint errors and fix them
- Ensure all imports are correct

### Authentication Issues
- Verify Clerk keys are correctly set
- Check Clerk domain configuration
- Ensure redirect URLs match your domain

### Database Connection Issues
- Test DATABASE_URL connection
- Check if Neon database allows connections from your deployment platform
- Verify SSL mode is enabled (`?sslmode=require`)

### 404 Errors
- Ensure all routes are properly defined
- Check middleware configuration
- Verify file structure matches App Router conventions

## 📞 Support

If you continue to have issues:
1. Check Vercel deployment logs
2. Review Clerk documentation
3. Check Neon database logs
4. Consult Next.js deployment docs

---

**Recommended**: Deploy to Vercel for the best Next.js experience with zero configuration!
