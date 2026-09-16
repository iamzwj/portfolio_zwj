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
NODE_VERSION="22.13.1"
NODE_DIR="/home/${DEPLOY_USER}/.local/node-v22"
NPM_BIN="${NODE_DIR}/bin/npm"

if [[ $EUID -ne 0 ]]; then
  echo "Run this script with sudo."
  exit 1
fi

apt-get update
apt-get install -y nginx certbot python3-certbot-nginx git rsync curl xz-utils

# Keep the portfolio on Node 22 without changing the Node 20 runtime used by
# the existing 17design service.
if [[ ! -x "${NODE_DIR}/bin/node" ]] || [[ "$("${NODE_DIR}/bin/node" --version)" != "v${NODE_VERSION}" ]]; then
  rm -rf "$NODE_DIR"
  mkdir -p "$NODE_DIR"
  curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
    | tar -xJ --strip-components=1 -C "$NODE_DIR"
  chown -R "$DEPLOY_USER:$DEPLOY_GROUP" "$(dirname "$NODE_DIR")"
fi

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
Environment=PATH=${NODE_DIR}/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
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
