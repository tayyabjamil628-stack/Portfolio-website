# 💰 AWS Cost Estimation, Billing & Infrastructure Financial Model

This document outlines the AWS cloud infrastructure cost estimations, Free Tier eligibility, and cost monitoring mechanisms for the **Malik Tayyab Jamil Portfolio Application**.

---

## 📊 AWS Free Tier Eligibility Overview

The portfolio architecture leverages AWS Services that fall heavily under the **AWS Free Tier (Always Free & 12-Month Free Tier)**:

- **AWS CloudFront:** **1 TB of data transfer out per month** and **10,000,000 HTTP/HTTPS requests per month** are **100% FREE** forever.
- **Amazon S3:** **5 GB of S3 Standard storage**, **20,000 GET requests**, and **2,000 PUT requests** per month free for 12 months.
- **AWS Certificate Manager (ACM):** **$0.00** (Free SSL/TLS certificates for CloudFront).
- **AWS Route 53:** **$0.50 per month** per hosted zone.

---

## 📈 Traffic-Tiered Financial Breakdown

Assumptions:
- Average page weight per visitor session: `250 KB` (optimized HTML, WebP, compressed CSS/JS).
- Average HTTP requests per visitor session: `15 requests`.
- CloudFront Edge Cache Hit Ratio: `95%` (95% of requests served from CDN edge without touching S3 origin).

### Tier 1: 100 Visitors / Day (3,000 Visitors / Month)
- **Data Transfer Out:** 3,000 × 250 KB = `750 MB / month`
- **Total Requests:** 3,000 × 15 = `45,000 requests / month`

| AWS Service | Usage Metric | Monthly Cost |
| :--- | :--- | :--- |
| **Amazon CloudFront** | 750 MB Data Out + 45k Requests | **$0.00** (Within Always Free 1 TB) |
| **Amazon S3 Storage** | ~5 MB static assets | **$0.00** (Within Free Tier 5 GB) |
| **Amazon S3 GET Requests** | 2,250 origin GETs (5% Cache Miss) | **$0.00** (Within Free Tier 20k GETs) |
| **AWS Route 53** | 1 Hosted Zone | **$0.50** |
| **ACM SSL Certificate** | 1 Public Cert | **$0.00** |
| **TOTAL ESTIMATED COST** | | **$0.50 / month** |

---

### Tier 2: 1,000 Visitors / Day (30,000 Visitors / Month)
- **Data Transfer Out:** 30,000 × 250 KB = `7.5 GB / month`
- **Total Requests:** 30,000 × 15 = `450,000 requests / month`

| AWS Service | Usage Metric | Monthly Cost |
| :--- | :--- | :--- |
| **Amazon CloudFront** | 7.5 GB Data Out + 450k Requests | **$0.00** (Within Always Free 1 TB) |
| **Amazon S3 Storage** | ~5 MB static assets | **$0.00** (Within Free Tier 5 GB) |
| **Amazon S3 GET Requests** | 22,500 origin GETs (5% Cache Miss) | **$0.01** |
| **AWS Route 53** | 1 Hosted Zone + DNS Queries | **$0.65** |
| **ACM SSL Certificate** | 1 Public Cert | **$0.00** |
| **TOTAL ESTIMATED COST** | | **$0.66 / month** |

---

### Tier 3: 10,000 Visitors / Day (300,000 Visitors / Month)
- **Data Transfer Out:** 300,000 × 250 KB = `75 GB / month`
- **Total Requests:** 300,000 × 15 = `4,500,000 requests / month`

| AWS Service | Usage Metric | Monthly Cost |
| :--- | :--- | :--- |
| **Amazon CloudFront** | 75 GB Data Out + 4.5M Requests | **$0.00** (Within Always Free 1 TB) |
| **Amazon S3 Storage** | ~5 MB static assets | **$0.00** (Within Free Tier 5 GB) |
| **Amazon S3 GET Requests** | 225,000 origin GETs | **$0.09** |
| **AWS Route 53** | 1 Hosted Zone + DNS Queries | **$1.85** |
| **ACM SSL Certificate** | 1 Public Cert | **$0.00** |
| **TOTAL ESTIMATED COST** | | **$1.94 / month** |

---

## 🔔 Cost Monitoring & Financial Safeguards

To prevent unexpected billing charges or DDoS cost spikes:

1. **AWS Budgets Alert:**
   - Set a monthly budget threshold of **$2.00 USD**.
   - Trigger email notifications  if actual or forecasted costs exceed **80% ($1.60 USD)**.
2. **Amazon CloudWatch Billing Alarm:**
   - Metric: `EstimatedCharges` in `us-east-1`.
   - Threshold: `$1.00 USD`.
3. **CloudFront Rate Limiting & AWS WAF (Optional Scale Guard):**
   - Configured rate limit rule: max 2,000 requests per 5 minutes per IP address to block automated scrapers.
