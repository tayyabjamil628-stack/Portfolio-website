# 🌐 Amazon CloudFront CDN Architecture & Edge Caching Guide

This document details the configuration, edge caching rules, security mechanisms, and performance benefits of the **Amazon CloudFront CDN** distribution for the **Malik Tayyab Jamil Portfolio Application**.

---

## ⚡ CloudFront CDN Overview

Amazon CloudFront is a low-latency Content Delivery Network (CDN) that securely delivers data, code, and static web assets to global viewers with low latency and high transfer speeds.

```
                      [ Viewer Request (HTTP/2, HTTP/3, TLS 1.3) ]
                                           │
                                           ▼
                            [ CloudFront Edge POP Location ]
                                           │
                        ┌──────────────────┴──────────────────┐
                        ▼                                     ▼
                [ Cache HIT ]                         [ Cache MISS ]
          (Return Asset in <15ms)                               │
                                                                ▼
                                                    [ Fetch from S3 Origin ]
                                                    (Via OAC Secure Tunnel)
                                                                │
                                                                ▼
                                                    [ Cache Asset at Edge ]
```

---

## ⚙️ CloudFront Distribution Settings

### 1. Origin Configuration
- **Origin Domain:** `tayyabjamil.com.s3.us-east-1.amazonaws.com`
- **Origin Access:** **Origin Access Control (OAC)** (Recommended over legacy OAI).
- **Origin Shield:** Enabled in `us-east-1` (Reduces load on S3 bucket during traffic spikes).

### 2. Cache Behavior Settings
- **Viewer Protocol Policy:** **Redirect HTTP to HTTPS** (Enforces HTTPS on all requests).
- **Allowed HTTP Methods:** `GET, HEAD, OPTIONS`.
- **Cached HTTP Methods:** `GET, HEAD`.
- **Compress Objects Automatically:** **Enabled** (Brotli & Gzip compression for CSS, JS, HTML, and SVG).

### 3. TTL (Time To Live) Strategy

| Path Pattern | Minimum TTL | Default TTL | Maximum TTL | Cache-Control Header |
| :--- | :--- | :--- | :--- | :--- |
| `*.css`, `*.js`, `*.webp`, `*.svg` | `86400s` (24h) | `31536000s` (1 yr) | `31536000s` (1 yr) | `public, max-age=31536000, immutable` |
| `*.html`, `sitemap.xml`, `robots.txt` | `0s` | `0s` | `0s` | `public, max-age=0, must-revalidate` |
| `Default (*)` | `0s` | `86400s` (24h) | `31536000s` (1 yr) | Controlled by Origin |

---

## 🔒 Security & Custom Error Page Configuration

### 1. Custom Error Pages (404 Handling)
- **HTTP Error Code:** `404 Not Found`
- **Customize Error Response:** `Yes`
- **Response Page Path:** `/404.html`
- **HTTP Response Code:** `404`
- **Error Caching Minimum TTL:** `10` seconds

### 2. HTTPS & TLS Protocol Settings
- **Minimum TLS Version:** **TLSv1.2_2021** (Supports TLS 1.3).
- **Security Policy:** Modern TLS ciphers only (Disables SSLv3, TLS 1.0, and TLS 1.1).

---

## 🔄 Cache Invalidation Strategy

When deploying updates, invalidate the CloudFront edge cache to clear cached HTML manifests:

```bash
# Execute CloudFront Cache Invalidation via AWS CLI
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

### Invalidation Mechanics:
- **Scope:** `/*` invalidates all HTML paths and forces edge nodes to revalidate content against S3 origin.
- **Cost Efficiency:** First 1,000 path invalidations per month are **100% free** under the AWS Free Tier.

---

## 📈 Performance Benefits & Expected Metrics

| Performance Metric | Without CDN (S3 Direct) | With CloudFront Edge CDN | Optimization Gain |
| :--- | :--- | :--- | :--- |
| **Time To First Byte (TTFB)** | `180ms – 450ms` | `< 15ms – 35ms` | **~92% Reduction** |
| **Asset Download Latency** | `250ms` | `< 20ms` | **~90% Reduction** |
| **Global Availability** | Single AWS Region | 300+ Edge POPs | **Global High Availability** |
| **Bandwidth Consumption** | Uncompressed bytes | Brotli (25% smaller than Gzip) | **~30% Less Data Transferred** |
