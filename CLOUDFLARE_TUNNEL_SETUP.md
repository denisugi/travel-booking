# Cloudflare Tunnel Setup Guide

This guide explains how to set up Cloudflare Tunnel to expose your local Travel Booking app to the public internet through Cloudflare's edge network.

## Overview

```
[Your App (Docker)] --> [Cloudflare Tunnel] --> [Cloudflare Edge] --> [Public Internet]
                              |
                    cloudflared daemon
                    connects outbound
                    to Cloudflare
```

## Option 1: Zero-Trust Dashboard (Recommended)

### Step 1: Create a Cloudflare Account
1. Go to https://dash.cloudflare.com/
2. Sign up / Log in
3. Go to **Zero Trust** → **Networks** → **Tunnels**

### Step 2: Create a Tunnel
1. Click **Create a tunnel**
2. Choose **Cloudflared** as the connector
3. Name your tunnel: `wanderlust-travel`
4. Save the **Tunnel Token** (you'll need this for `CLOUDFLARE_TUNNEL_TOKEN` in .env)

### Step 3: Configure the Tunnel Route
1. In the tunnel dashboard, add a **public hostname**:
   - **Subdomain**: `travel` (or your choice)
   - **Domain**: Select your Cloudflare-connected domain
   - **Type**: `HTTP`
   - **URL**: `nginx:80` (the nginx service name in docker-compose)
2. Save the route

### Step 4: Set the Token in .env
```bash
CLOUDFLARE_TUNNEL_TOKEN=your-tunnel-token-here
```

### Step 5: Start the Tunnel
```bash
docker-compose up -d cloudflared
```

Your app will be accessible at `https://travel.yourdomain.com`

---

## Option 2: Manual Tunnel (Quick Testing)

### Step 1: Install cloudflared
```bash
# macOS
brew install cloudflared

# Linux
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# Windows
# Download from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
```

### Step 2: Authenticate
```bash
cloudflared tunnel login
# Opens browser for Cloudflare authentication
```

### Step 3: Create Tunnel
```bash
cloudflared tunnel create wanderlust-travel
# Saves tunnel credentials to ~/.cloudflared/
```

### Step 4: Configure DNS
```bash
cloudflared tunnel route dns wanderlust-travel travel.yourdomain.com
```

### Step 5: Run Tunnel
```bash
cloudflared tunnel run --name wanderlust-travel --url http://localhost:8080
```

---

## Option 3: Docker Cloudflared Sidecar

The `docker-compose.yml` already includes a `cloudflared` service. Just set your token:

```bash
# Set your tunnel token
export CLOUDFLARE_TUNNEL_TOKEN="your-token-from-zero-trust-dashboard"

# Or add it to a .env file
echo 'CLOUDFLARE_TUNNEL_TOKEN=your-token-here' >> .env

# Start everything
docker-compose up -d
```

---

## Docker Compose Services with Tunnel

```yaml
services:
  app:        # Laravel + PHP-FPM
  nginx:      # Web server (port 8080)
  postgres:   # Database
  redis:      # Cache/Queue
  horizon:    # Queue worker
  mailpit:    # Local email dev (port 8025)
  cloudflared: # TUNNEL - connects to Cloudflare
```

## Access URLs

| Service | Local URL | Public URL (via Tunnel) |
|---------|-----------|------------------------|
| App | http://localhost:8080 | https://travel.yourdomain.com |
| Mailpit UI | http://localhost:8025 | https://mail.yourdomain.com |
| Horizon | http://localhost:8080/horizon | https://horizon.yourdomain.com |

## Tunnel Health Check

```bash
# Check tunnel status
docker-compose logs cloudflared

# Or via cloudflared command (outside container)
cloudflared tunnel list
cloudflared tunnel info wanderlust-travel
```

## Troubleshooting

### Tunnel not connecting?
```bash
# Check logs
docker-compose logs cloudflared

# Verify token
echo $CLOUDFLARE_TUNNEL_TOKEN

# Restart tunnel
docker-compose restart cloudflared
```

### App not reachable?
```bash
# 1. Verify nginx is running
docker-compose logs nginx

# 2. Verify app is healthy
curl http://localhost:8080/health

# 3. Check tunnel logs for connection errors
docker-compose logs cloudflared | grep -i error
```

### DNS not propagating?
```bash
# Check DNS records in Cloudflare dashboard
# Ensure CNAME points to tunnel
```

## Production HTTPS Setup

For full HTTPS with automatic SSL:

1. **Cloudflare handles SSL automatically** - No cert setup needed
2. Set **SSL/TLS mode** to "Full" or "Flexible" in Cloudflare dashboard
3. Your app can run on HTTP internally

## Security Considerations

- Cloudflare Tunnel bypasses NAT - no port forwarding needed
- All traffic goes through Cloudflare edge (DDoS protection, WAF)
- Use Cloudflare Access for additional authentication if needed
- The tunnel token is sensitive - keep it secret

## Cleanup

```bash
# Stop tunnel
docker-compose stop cloudflared

# Remove tunnel (from Cloudflare dashboard too)
docker-compose rm -f cloudflared
```
