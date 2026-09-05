# portfolio

Source code for my personal website. A minimal, interactive space to showcase my software projects, skills, and homelab architecture.

**Live:** [portfolio.jack-lab.dev](https://portfolio.jack-lab.dev)

## Stack

- **Core:** React, Vite
- **UI & 3D:** CSS3, React Three Fiber, Framer Motion
- **Icons:** React Icons, PrimeIcons
- **Infra:** Docker, Nginx, Self-hosted Debian

## Development

```bash
git clone https://github.com/comitanigiacomo/deep_mind.git
cd deep_mind
npm install
npm run dev
```

## Deployment

Uses a multi-stage Docker build to compile assets and serve them via a lightweight Nginx container.

```bash
docker compose up -d --build
```

*By default, the container exposes port `8090`.*

## License

MIT
