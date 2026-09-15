# Tencent Cloud deployment

This repository deploys `main` to `https://portfolio.17design.fun` through
GitHub Actions. The pipeline validates the build, uploads the source to the
server, builds there, and restarts only the `portfolio-zwj` systemd service.
It does not touch the primary site or API.

## One-time server setup

On the Tencent Cloud server, after installing Node.js and adding the deployment
public key to the deployment user's `~/.ssh/authorized_keys`, run:

```bash
sudo ./deploy/bootstrap.sh portfolio.17design.fun your-email@example.com
```

The DNS A record must already point `portfolio.17design.fun` to the server
before running the script, because Certbot validates the domain over HTTP.

## GitHub Actions secrets

In the GitHub repository, open **Settings → Secrets and variables → Actions**
and add these repository secrets:

| Secret | Value |
| --- | --- |
| `DEPLOY_HOST` | `49.235.121.231` |
| `DEPLOY_USER` | The Linux deployment username, normally `ubuntu` |
| `DEPLOY_SSH_KEY` | The private key for the dedicated deployment keypair |
| `DEPLOY_SSH_KNOWN_HOST` | The pinned server host-key line in OpenSSH `known_hosts` format |

After the first successful setup, every push to `main` runs the deployment
workflow automatically. A manual run is also available from the repository's
**Actions** tab.
