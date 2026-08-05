# ☁️ AWS Production Deployment Guide

This document outlines the complete step-by-step production deployment strategy for the **Malik Tayyab Jamil Portfolio Application** on Amazon Web Services (AWS) using **S3**, **CloudFront**, **Route 53**, and **AWS Certificate Manager (ACM)**.

---

## 🏗️ Architecture Overview

```
[ User / Browser ]
       │
       ▼ (HTTPS / TLS 1.3)
[ Amazon CloudFront CDN ] (Global Edge Cache - 300+ POPs)
       │
       ├──────▶ [ AWS Certificate Manager ] (Free Managed SSL/TLS)
       ├──────▶ [ Route 53 DNS ] (Custom Apex Domain tayyabjamil.com)
       │
       ▼ (Private Origin Access Control - OAC)
[ Amazon S3 Bucket ] (Private Static Storage)
```

---

## 🛠️ Step-by-Step Deployment Walkthrough

### Step 1: Build the Static Production Bundle
Execute Vite production compilation:
```bash
npm run build
```
This generates the optimized `dist/` directory containing bundled HTML, CSS, JavaScript, WebP assets, `robots.txt`, `sitemap.xml`, `site.webmanifest`, and `404.html`.

---

### Step 2: Provision Amazon S3 Bucket
1. Open the **AWS S3 Console** and create a bucket named `tayyabjamil.com`.
2. Keep **Block all public access** enabled (security best practice; CloudFront will access via **Origin Access Control - OAC**).
3. Enable **Bucket Versioning** for rollback protection.

---

### Step 3: Configure Amazon CloudFront CDN
1. Open **Amazon CloudFront Console** and click **Create Distribution**.
2. **Origin Domain:** Select `tayyabjamil.com.s3.amazonaws.com`.
3. **Origin Access:** Select **Origin Access Control (OAC)** and auto-generate the S3 bucket policy.
4. **Viewer Protocol Policy:** Select **Redirect HTTP to HTTPS**.
5. **Allowed HTTP Methods:** `GET, HEAD, OPTIONS`.
6. **Custom Error Pages:**
   - Error Code: `404` ➔ Response Page: `/404.html` ➔ HTTP Status: `404`.
7. **Default Root Object:** `index.html`.

---

### Step 4: Configure Custom Domain & SSL (ACM & Route 53)
1. In **AWS Certificate Manager (us-east-1 region)**, request a public certificate for `tayyabjamil.com` and `*.tayyabjamil.com`.
2. Validate via **DNS validation** in Route 53.
3. In CloudFront, attach the ACM certificate under **Custom SSL Certificate** and add **Alternate Domain Name (CNAME)** `tayyabjamil.com`.
4. In **Route 53**, create an **A (Alias)** record pointing `tayyabjamil.com` to the CloudFront distribution domain name.

---

### Step 5: S3 Sync & Cache Headers Command
Sync build artifacts with granular HTTP caching rules:

```bash
# 1. Upload immutable static assets (CSS, JS, WebP) with 1-year cache
aws s3 sync dist/ s3://tayyabjamil.com/ \
  --exclude "*.html" \
  --exclude "robots.txt" \
  --exclude "sitemap.xml" \
  --exclude "site.webmanifest" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# 2. Upload HTML, Sitemap, and Manifest with zero-cache revalidation
aws s3 sync dist/ s3://tayyabjamil.com/ \
  --exclude "*" \
  --include "*.html" \
  --include "robots.txt" \
  --include "sitemap.xml" \
  --include "site.webmanifest" \
  --cache-control "public, max-age=0, must-revalidate"
```

---

### Step 6: Invalidate CloudFront Edge Caches
After deployment, invalidate CloudFront edge caches to propagate instant updates:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_CLOUDFRONT_DIST_ID \
  --paths "/*"
```

---

## 🤖 GitHub Actions CI/CD Pipeline (`.github/workflows/deploy.yml`)

```yaml
name: Deploy Portfolio to AWS S3 & CloudFront

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies & Lint
        run: |
          npm ci
          npm run lint

      - name: Build Production Assets
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET_NAME }}/ --delete --cache-control "public, max-age=31536000, immutable" --exclude "*.html" --exclude "sitemap.xml" --exclude "robots.txt"
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET_NAME }}/ --include "*.html" --include "sitemap.xml" --include "robots.txt" --cache-control "public, max-age=0, must-revalidate"

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

---

## ⚡ Deployment Verification Checklist
- [x] HTTPS enforced with TLS 1.3 encryption
- [x] Custom domain `tayyabjamil.com` resolving to CloudFront CDN
- [x] S3 Bucket secured with private OAC access
- [x] Custom 404 page returning HTTP 404 status
- [x] Cache headers properly separating immutable assets from HTML documents
- [x] Google Search Console XML sitemap verified
