# ☁️ AWS S3 & Production Cloud Deployment Guide

This guide details the complete production deployment procedure for the **Malik Tayyab Jamil Engineering Portfolio** on Amazon Web Services (AWS) using **Amazon S3**, **AWS CloudFront**, and **AWS CLI**.

---

## 🏗️ AWS Cloud Deployment Architecture

```
                                [ User / Client Browser ]
                                           │
                                           ▼ (HTTPS / Port 443)
                                 [ Amazon Route 53 DNS ]
                                           │
                                           ▼
                            [ Amazon CloudFront Global CDN ]
                             (300+ Edge Locations Worldwide)
                                           │
                   ┌───────────────────────┴───────────────────────┐
                   ▼                                               ▼
     [ AWS Certificate Manager ]                        [ Origin Access Control ]
     (Free TLS 1.3 SSL Cert)                              (IAM S3 Bucket Policy)
                                                                   │
                                                                   ▼
                                                       [ Amazon S3 Bucket ]
                                                    (Private Static Storage)
                                                       - index.html
                                                       - 404.html
                                                       - css/, js/, assets/
```

---

## 📋 Step 1: Production Build Preparation & Verification

Prior to pushing artifacts to Amazon S3, verify all build outputs:

1. **Compile Production Bundle:**
   ```bash
   npm run build
   ```
2. **Bundle Verification Checklist:**
   - [x] Relative path resolution (`./css/style.css`, `./js/script.js`, `./assets/...`)
   - [x] Vector Favicon (`/favicon.svg`) & PWA Manifest (`/site.webmanifest`)
   - [x] Custom Design-System Error Page (`404.html`)
   - [x] Production Crawler Rules (`robots.txt`) & XML Index (`sitemap.xml`)
   - [x] Zero absolute hardcoded local URLs (`localhost`)

---

## 📦 Step 2: Amazon S3 Bucket Configuration

### 1. Bucket Naming & Region Selection
- **Bucket Name:** `tayyabjamil.com` (Must match custom domain for standard static hosting / CloudFront alias)
- **AWS Region:** `us-east-1` (US East - N. Virginia) — Recommended for global CloudFront distributions and ACM integration.

### 2. Public Access & Security Settings
- **Block All Public Access:** **ENABLED** (`True`).
- *Rationale:* Access to the S3 bucket is locked down completely. Traffic must pass strictly through Amazon CloudFront using **Origin Access Control (OAC)** to prevent direct S3 bypass.

### 3. S3 Bucket Policy (OAC Enforcement)
Apply the following IAM policy under S3 Bucket ➔ Permissions ➔ Bucket Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tayyabjamil.com/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

### 4. S3 Bucket Versioning & Lifecycle Rules
- **Versioning:** **ENABLED** (Protects against accidental object deletion and enables rollbacks to prior commits).
- **Lifecycle Configuration:**
  - Transition non-current object versions to **S3 Standard-IA** after 30 days.
  - Expire and permanently delete non-current versions after 90 days to eliminate storage overhead.

---

## 🚀 Step 3: Production Sync & AWS CLI Commands

Execute the following deployment commands using the AWS CLI:

```bash
# 1. Sync immutable static assets (CSS, JS, WebP, Fonts) with 1-Year Max-Age Cache
aws s3 sync dist/ s3://tayyabjamil.com/ \
  --exclude "*.html" \
  --exclude "robots.txt" \
  --exclude "sitemap.xml" \
  --exclude "site.webmanifest" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# 2. Sync dynamic HTML documents and index maps with revalidation requirement
aws s3 sync dist/ s3://tayyabjamil.com/ \
  --exclude "*" \
  --include "*.html" \
  --include "robots.txt" \
  --include "sitemap.xml" \
  --include "site.webmanifest" \
  --cache-control "public, max-age=0, must-revalidate"
```

---

## ⚡ Step 4: Verification & Smoke Testing

After sync completes:
1. Verify S3 bucket contains `index.html`, `404.html`, `css/`, `js/`, `assets/`, `sitemap.xml`, and `robots.txt`.
2. Confirm permissions block direct HTTP requests (`403 Forbidden` on S3 endpoint).
3. Confirm CloudFront distribution endpoint returns `200 OK` with valid content and security headers.
