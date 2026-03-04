# Giacomo Comitani - Portfolio Website

<p align="center">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  </a>
  <a href="https://getbootstrap.com/">
    <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </a>
</p>

A minimal portfolio to present my projects and experience.

**Live Demo:** [portfolio.jack-lab.dev](https://portfolio.jack-lab.dev) _(Self-Hosted)_

![Portfolio Screenshot](/public/Deep.png)

**Core:** 

- `React.js`
- `React Bootstrap`
- `React Icons`
- `CSS3`

**Infrastructure & Deployment:**

- `Docker` & `Docker Compose`
- `Nginx` (Multi-stage build)
- Self-hosted on Debian Linux

**Build Tools:**

- `Vite`
- `npm`
- `Git`

## Local Development

1. Clone the repository

```bash
git clone https://github.com/comitanigiacomo/deep_mind.git
```

2. Navigate into the project directory and install dependencies

```Bash
npm install
```

3. Start the development server

```Bash
npm run dev
```

4. Open http://localhost:3000 in your browser.

## Production Deployment (Docker)

This project includes a Docker setup. 
It uses Node.js to build the Vite/React app, and a lightweight Nginx container to serve the static files.

1. Clone the repository

```Bash
git clone https://github.com/comitanigiacomo/deep_mind.git
cd deep_mind
```

2. Build and start the container in detached mode

```Bash
docker compose up -d --build
```

The application will be running on port `8090` (as defined in `docker-compose.yml`). You can expose this through a reverse proxy like Nginx Proxy Manager.

## Contributing

Contributions are welcome! If you want to suggest improvements or fix issues, please open an issue or submit a pull request.

## License

This project is licensed under the `MIT` License. See the LICENSE file for details.
Acknowledgements

- Typewriter animation inspired by Typed.js

- Timeline component based on PrimeReact Timeline

- UI Design influenced by modern developer portfolios and open projects

- Visual and interactive ideas adapted from various sources across the web — if you see something of yours, feel free to reach out and I'll credit you properly.
