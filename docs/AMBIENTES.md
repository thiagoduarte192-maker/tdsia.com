# Ambientes — tdsia.com

Documento de referência para deploys. Foi escrito pra ser lido junto
com o Claude em conversas futuras — ele entende o fluxo a partir dele.

## Visão geral

```
DEVELOP                           MAIN
   ↓                               ↓
staging.tdsia.com              tdsia.com
   ↓                               ↓
banco tdsia_staging            banco tdsia
porta 3015 (PM2)               porta 3010 (PM2)
/root/tds-site-staging         /root/tds-site
```

Mesma VPS (46.202.147.137), mesmo postgres, mesmo MP (modo TEST
hoje). Custo extra: R$ 0.

## Fluxo padrão de trabalho

1. **Codar em `develop`** localmente
2. `git push origin develop`
3. **Deploy em staging** — comando único no VPS:
   ```bash
   ssh root@46.202.147.137 'cd /root/tds-site-staging && git pull --ff-only && npm install && npm run build && pm2 restart tds-site-staging --update-env'
   ```
4. **Testar em [staging.tdsia.com](https://staging.tdsia.com)** — abrir no browser, validar interatividade, login no admin, fluxo de pagamento etc
5. Quando aprovado, **merge `develop` → `main`**:
   ```bash
   git checkout main && git merge develop && git push origin main && git checkout develop
   ```
6. **Deploy em produção**:
   ```bash
   ssh root@46.202.147.137 'cd /root/tds-site && git stash; git pull --ff-only && npm install && npm run build && pm2 restart tds-site --update-env'
   ```

## Hotfix urgente (em produção)

Quando algo está quebrado em prod e precisa correção imediata, ainda
passa por staging — só que rápido:

1. Cria branch a partir de `main`: `git checkout -b hotfix/x main`
2. Faz a correção, commit, push `hotfix/x`
3. Merge `hotfix/x` em `develop` E `main`
4. Deploy em staging primeiro, valida em 1 minuto
5. Deploy em prod
6. Apaga branch hotfix

## Credenciais por ambiente

| Var | Staging | Produção |
|---|---|---|
| `DATABASE_URL` | `tdsia_staging` | `tdsia` |
| `ADMIN_PASSWORD` | `staging-test-9V2pX7QmK4` | (a real) |
| `SESSION_SECRET` | diferente | (a real) |
| `MP_ACCESS_TOKEN` | TEST | TEST hoje, PRODUCTION quando migrar |
| `NEXT_PUBLIC_MP_PUBLIC_KEY` | TEST | TEST hoje, PRODUCTION quando migrar |
| `PUBLIC_BASE_URL` | `https://staging.tdsia.com` | `https://tdsia.com` |

Arquivos: `.env.production.local` em cada projeto no VPS (chmod 600).

## Quando rodar migrations

Quando o schema mudar, gerar a migration localmente:
```bash
npx drizzle-kit generate --name=descricao
```

Depois aplicar manualmente em **staging primeiro**, validar, depois
em produção:

```bash
# staging
scp drizzle/000X_*.sql root@46.202.147.137:/tmp/m.sql
ssh root@46.202.147.137 'PGPASSWORD="..." psql -h 127.0.0.1 -U tdsia_admin -d tdsia_staging -f /tmp/m.sql'

# produção (só depois de validar em staging)
ssh root@46.202.147.137 'PGPASSWORD="..." psql -h 127.0.0.1 -U tdsia_admin -d tdsia -f /tmp/m.sql'
```

## Backup

Cron diário 3h da manhã:
- `/var/backups/tdsia/tdsia_*.sql.gz` — banco de produção
- staging não tem backup (não precisa, é descartável)

Pra restaurar:
```bash
gunzip -c /var/backups/tdsia/tdsia_YYYYMMDD_HHMMSS.sql.gz | \
  PGPASSWORD="..." psql -h 127.0.0.1 -U tdsia_admin -d tdsia
```

## Resetar staging

Pra zerar o banco staging e voltar pro estado inicial (só a Bruna):

```bash
ssh root@46.202.147.137 'PGPASSWORD="..." psql -h 127.0.0.1 -U tdsia_admin -d tdsia_staging <<SQL
TRUNCATE pagamentos, contratos, cobrancas, aceites RESTART IDENTITY CASCADE;
INSERT INTO contratos (cliente_slug, cliente_nome, cliente_empresa, projeto, valor_total, metodo, dia_vencimento, data_inicio, numero_parcelas, status, observacoes)
VALUES ('"'"'bruna'"'"', '"'"'Bruna Abdenur'"'"', '"'"'Clínica Dermatológica'"'"', '"'"'Automação Clínica — Feegow + 5 fluxos WhatsApp'"'"', 6000.00, '"'"'PIX'"'"', 20, '"'"'2026-04-20'"'"', 6, '"'"'ativo'"'"', '"'"'seed STAGING'"'"');
INSERT INTO pagamentos (contrato_id, numero, data_pagamento) VALUES (1, 1, '"'"'2026-04-20'"'"'), (1, 2, '"'"'2026-05-20'"'"');
SQL'
```
