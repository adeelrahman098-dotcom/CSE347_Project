# ICCMS setup and operation

## Prerequisites

- Node.js 20 or later
- MySQL 8 or later

## First-time setup

1. Run `mysql -u root -p < Database/schema.sql` from the project root.
2. Copy `Backend/.env.example` to `Backend/.env`, then enter your local MySQL credentials and a long, unique `JWT_SECRET`.
3. Run `npm install` in both `Backend` and `Frontend`.
4. Start the API with `npm run dev` in `Backend` and the web app with `npm run dev` in `Frontend`.
5. Open the URL displayed by Vite, normally `http://localhost:5173`.

## Security notes

- Successful logins automatically migrate existing plaintext passwords to bcrypt hashes. New accounts must always be created with a bcrypt hash.
- Authentication uses a signed bearer token. Configure a unique `JWT_SECRET` before deployment.
- Do not commit `.env`; use `.env.example` as the safe configuration template.

## External integrations

SSL Commerz, SMS/email delivery, and AI question generation require each provider's credentials and webhook configuration. They are deliberately not simulated as real payments or messages. Add provider keys to environment variables and implement their verified server-side callbacks before enabling them in production.

## Registration approval

Visitors can open `/register` to submit a Student, Teacher, or Parent account request. An administrator logs in, opens **Registrations**, reviews the submitted information, and selects **Approve**. The user can then log in. To add this feature to an already-created database, run `Database/schema.sql` again; `CREATE TABLE IF NOT EXISTS` preserves your existing records.
