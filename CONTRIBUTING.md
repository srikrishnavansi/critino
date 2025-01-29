# Contributing to Critino

## Future Areas

- 🚧 **Frontend (SvelteKit) & Database (Supabase)**: Contribution guides coming soon! Currently you can contribute to the API independently from the database and frontend.

## Development Setup (API Focus)

### Prerequisites

- Python 3.11–3.12
- Docker + Docker Compose
- Nixpacks (`curl -sSL https://nixpacks.com/install.sh | bash`)
- Poetry (`pip install poetry`)

### First-Time Setup

1. `git clone https://github.com/startino/critino`
2. `cd services/api && poetry install`
3. **From root**: Run `./api.sh` (_first time only_) to:
   - Build API/web containers with Nixpacks
   - Start Docker services

### Running the API

- Use `docker compose up api` for daily development

### Workflow

- Start API: `docker compose up api`
- Format code: `./services/api/scripts/format.sh`
- Lint code: `./services/api/scripts/lint.sh` (note: existing errors expected)

### To Add Later

- Pre-commit hooks (contributions welcome!)
- Linter error cleanup roadmap
