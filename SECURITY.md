# 🔒 AWS Cloud Security, IAM & Security Headers Architecture

This document defines the security architecture, IAM access controls, Origin Access Control (OAC), and security headers implemented for the **Malik Tayyab Jamil Portfolio Application**.

---

## 🛡️ Core Security Principles

1. **Principle of Least Privilege (PoLP):** IAM roles and bucket policies grant the bare minimum permissions required for operation.
2. **Defense in Depth:** Security is enforced across multiple layers — DNS, CDN, Edge Security Headers, IAM Policies, and S3 Access Restrictions.
3. **Zero Direct Access:** S3 bucket endpoint is 100% private. All traffic MUST pass through CloudFront.

---

## 🔑 IAM & Access Control Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                              IAM Policy                                │
├────────────────────────────────────────────────────────────────────────┤
│  Service Principal: cloudfront.amazonaws.com                           │
│  Action Allowed: s3:GetObject                                          │
│  Resource: arn:aws:s3:::tayyabjamil.com/*                               │
│  Condition: StringEquals AWS:SourceArn = CloudFront Distribution ARN   │
└────────────────────────────────────────────────────────────────────────┘
```

### OAC (Origin Access Control) vs Legacy OAI (Origin Access Identity)

| Feature | Legacy OAI | Modern OAC (Implemented) |
| :--- | :--- | :--- |
| **AWS Service Support** | S3 Only | S3, MediaStore, Elemental, Lambda |
| **KMS Encryption Support** | ❌ No SSE-KMS support | ✅ Supports SSE-KMS encrypted buckets |
| **HTTP Methods** | Standard GET/HEAD | Full HTTP method suite + dynamic POST |
| **Security Signature** | Legacy SignV2 | Modern AWS SigV4 authorization |

---

## 🌐 CloudFront Response Headers Policy (Security Headers)

CloudFront Response Headers Policies inject security headers into every response:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';
```

### Security Header Rationale:
- **HSTS (`Strict-Transport-Security`):** Forces browsers to communicate strictly over HTTPS for 2 years (`63072000` seconds).
- **`X-Content-Type-Options: nosniff`:** Prevents MIME-type sniffing attacks by instructing browsers to strictly adhere to declared `Content-Type`.
- **`X-Frame-Options: DENY`:** Prevents Clickjacking attacks by forbidding the portfolio from being embedded in unauthorized third-party `<iframe>` elements.
- **`Content-Security-Policy` (CSP):** Restricts script, style, font, and image fetch origins to verified sources (`self` and Google Fonts CDN).

---

## 🔓 CORS (Cross-Origin Resource Sharing) Policy

Cross-Origin requests to S3 assets are restricted via S3 CORS configuration:

```xml
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>https://tayyabjamil.com</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
    <MaxAgeSeconds>3600</MaxAgeSeconds>
  </CORSRule>
</CORSConfiguration>
```

---

## 🛡️ Security Audit Checklist
- [x] S3 Block All Public Access enabled (`True`)
- [x] OAC policy configured with SigV4 signature
- [x] All 6 core security headers enforced via CloudFront policy
- [x] HTTPS enforced with TLS 1.3 protocol requirement
- [x] Zero plain HTTP endpoints or unencrypted transmission
- [x] CORS restricted to official domain name
