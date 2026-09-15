#!/usr/bin/env bash

# Creates the isolated portfolio service and its reverse proxy. It does not
# touch the existing 17design.fun service or its API.
set -euo pipefail

DOMAIN="${1:?Usage: sudo ./deploy/bootstrap.sh portfolio.17design.fun you@example.com}"
CERTBOT_EMAIL="${2:?Usage: sudo ./deploy/bootstrap.sh portfolio.17design.fun you@example.com}"
SERVICE_NAME="portfolio-zwj"
APP_DIR="/opt/portfolio-zwj"
APP_PORT="3001"
DEPLOY_USER="${SUDO_USER:-$USER}"
DEPLOY_GROUP="$(id -gn "$DEPLOY_USER")"
NPM_BIN="$(command -v npm || true)"

if [[ $EUID -ne 0 ]]; then
  echo "Run this script with sudo."
  exit 1
fi

if [[ -z "$NPM_BIN" ]]; then
  echo "Node.js and npm must be installed before configuring the service."
  exit 1
fi

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx rsync

install -d -m 0755 -o "$DEPLOY_USER" -g "$DEPLOY_GROUP" "$APP_DIR"

cat > "/etc/systemd/system/${SERVICE_NAME}.service" <<EOF
[Unit]
Description=Richart J portfolio
After=network.target

[Service]
Type=simple
User=${DEPLOY_USER}
Group=${DEPLOY_GROUP}
WorkingDirectory=${APP_DIR}
Environment=NODE_ENV=production
Environment=PORT=${APP_PORT}
ExecStart=${NPM_BIN} run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

cat > "/etc/nginx/sites-available/${SERVICE_NAME}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

ln -sfn "/etc/nginx/sites-available/${SERVICE_NAME}" "/etc/nginx/sites-enabled/${SERVICE_NAME}"
nginx -t
systemctl daemon-reload
systemctl enable "${SERVICE_NAME}"
systemctl restart nginx

certbot --nginx --non-interactive --agree-tos --email "$CERTBOT_EMAIL" -d "$DOMAIN" --redirect

echo "Bootstrap complete. The next GitHub Actions push will upload and start the portfolio."
