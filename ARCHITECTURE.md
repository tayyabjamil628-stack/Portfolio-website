# 🏛️ Complete AWS Cloud Architecture & DevOps Blueprint

This document specifies the end-to-end cloud infrastructure architecture, network topology, high-availability model, and CI/CD deployment pipeline for the **Malik Tayyab Jamil Portfolio Application**.

---

## 🗺️ System Architecture Diagram

```
[ User Request ] ───(DNS Resolution)───► [ Amazon Route 53 ]
                                                │
                                                ▼ (Alias A/AAAA Records)
                                   [ Amazon CloudFront CDN ]
                                   (Global Anycast Network)
                                                │
                   ┌────────────────────────────┴────────────────────────────┐
                   ▼                                                         ▼
     [ AWS Certificate Manager ]                               [ CloudFront Security Headers ]
     (Free Auto-Renewing SSL/TLS)                             (HSTS, CSP, Frame Options)
                   │                                                         │
                   └────────────────────────────┬────────────────────────────┘
                                                │
                                                ▼ (SigV4 Encrypted OAC Tunnel)
                                      [ Amazon S3 Bucket ]
                                    (Private Static Storage)
                                                │
                                                ▼
                                   [ AWS CloudWatch & Logs ]
                                  (Billing Alarms & Access Logs)
```

---

## 🧩 Architectural Components & Responsibilities

### 1. Amazon Route 53 (DNS Layer)
- **Role:** Latency-based global DNS resolution.
- **Routing Policy:** Alias Records (`A` and `AAAA` for IPv6) mapping `tayyabjamil.com` and `www.tayyabjamil.com` directly to CloudFront distribution domains.
- **Health Checks:** Native health checks to route visitors to standby maintenance pages if needed.

### 2. Amazon CloudFront (Content Delivery Network)
- **Role:** Edge caching, TLS termination, Brotli compression, and security header injection.
- **PoPs:** 300+ Point-of-Presence edge locations worldwide.
- **Cache Hit Target:** `> 95%` Edge Cache Hit Ratio.

### 3. Amazon S3 (Origin Storage Layer)
- **Role:** Durable object storage for compiled static assets (`index.html`, `404.html`, `css/`, `js/`, `assets/`).
- **Security:** Public access disabled (`BlockPublicAccess = true`). Accessible ONLY via CloudFront Origin Access Control (OAC).
- **Durability:** 99.999999999% (11 9s) object durability.

### 4. AWS Certificate Manager (ACM)
- **Role:** Automated issuance and 60-day auto-renewal of X.509 SSL/TLS certificates.
- **Validation:** DNS validation via Route 53 CNAME records.

---

## 🤖 CI/CD Automation Pipeline Architecture (GitHub Actions)

```
[ Git Push to 'main' ]
          │
          ▼
[ GitHub Actions Runner ]
          │
          ├─► 1. Checkout Code & Setup Node.js 20
          ├─► 2. Run Type Checks & Linter (`npm run lint`)
          ├─► 3. Execute Production Build (`npm run build`)
          ├─► 4. Configure AWS Credentials (OIDC IAM Role)
          ├─► 5. Execute AWS S3 Sync with Cache Control Headers
          └─► 6. Trigger CloudFront Cache Invalidation (`aws cloudfront create-invalidation`)
```

### GitHub Actions Workflow Blueprint (`.github/workflows/deploy.yml`):
```yaml
name: AWS Production CI/CD Pipeline

on:
  push:
    branches: [ main ]

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install & Validate
        run: |
          npm ci
          npm run lint

      - name: Build Production Assets
        run: npm run build

      - name: Configure AWS Credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::ACCOUNT_ID:role/GitHubActionsS3DeployRole
          aws-region: us-east-1

      - name: Sync Static Assets to S3 (Immutable Cache)
        run: |
          aws s3 sync dist/ s3://tayyabjamil.com/ \
            --exclude "*.html" \
            --exclude "robots.txt" \
            --exclude "sitemap.xml" \
            --exclude "site.webmanifest" \
            --cache-control "public, max-age=31536000, immutable" \
            --delete

      - name: Sync Documents to S3 (Revalidate Cache)
        run: |
          aws s3 sync dist/ s3://tayyabjamil.com/ \
            --exclude "*" \
            --include "*.html" \
            --include "robots.txt" \
            --include "sitemap.xml" \
            --include "site.webmanifest" \
            --cache-control "public, max-age=0, must-revalidate"

      - name: Invalidate CloudFront Edge Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

---

## 📊 Monitoring, Observability & Cloud Operations

1. **Amazon CloudWatch Metrics:**
   - CloudFront Metrics: `Requests`, `BytesDownloaded`, `4xxErrorRate`, `5xxErrorRate`.
   - S3 Metrics: `NumberOfObjects`, `BucketSizeBytes`.
2. **Access Logging:**
   - CloudFront Edge Access Logs delivered to a dedicated logging S3 bucket (`tayyabjamil-logs-s3`).
   - S3 Server Access Logging enabled for security auditing.
3. **AWS CloudTrail:**
   - Management events logged for security auditability across IAM policies and S3 bucket modifications.
