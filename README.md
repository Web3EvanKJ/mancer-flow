# 🧠 Mancer Flow

**Full Stack Web3 Payroll Protocol**

Real-time on-chain salary streaming powered by smart contracts, with off-chain role management and blockchain indexing.

---

## 📁 Project Structure

```
mancer-flow/
├── client/           → Next.js Web3 dApp (Frontend)
├── server/           → Express + Prisma API (User roles & DB)
└── mancer-indexer/   → Ponder indexer (Blockchain events)
```

---

## ⚙️ Requirements

Make sure you have installed:

- **Node.js ≥ 18**
- **PostgreSQL**
- **npm / pnpm / yarn**
- WalletConnect Project ID
- EDU Chain RPC URL (Alchemy recommended)

---

## 🚀 Local Development Setup

You must run **all 3 services** simultaneously.

---

## 1️⃣ Client — Next.js dApp

### Install

```bash
cd client
npm install
```

### Environment Variables

Create `client/.env`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_PONDER_URL=http://localhost:42069
NEXT_PUBLIC_SERVER_URL=http://localhost:4000
```

### Run

```bash
npm run dev
```

**App runs at:** http://localhost:3000

---

## 2️⃣ Server — Express + Prisma API

Handles wallet addresses and roles.

### Install

```bash
cd server
npm install
```

### Environment Variables

Create `server/.env`:

```env
DATABASE_URL=your_deployed_database_url
PORT=4000
CLIENT_URL=http://localhost:3000
```

### 🧱 Database & Prisma Setup (First Time Only)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This will:

- Create database tables
- Sync schema
- Generate Prisma client

### Run Server

```bash
npm run dev
```

**Server runs at:** http://localhost:4000

### API Endpoints

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/user/role`     | Check or create user role |
| GET    | `/user/:address` | Fetch user by wallet      |

---

## 3️⃣ Mancer Indexer — Ponder

Indexes smart contract events.

### Install

```bash
cd mancer-indexer
npm install
```

### Environment Variables

Create `mancer-indexer/.env.local`:

```env
PONDER_RPC_URL_1=https://your-rpc-url
```

### Run Indexer

```bash
npm run dev
```

**GraphQL endpoint:** http://localhost:42069

Note: In mancer-indexer/ponder.config.ts, you can change the `startBlock` to the latest block

---

## 🛠️ Development Workflow

1. **Start PostgreSQL** database
2. **Terminal 1:** Run the server
   ```bash
   cd server && npm run dev
   ```
3. **Terminal 2:** Run the indexer
   ```bash
   cd mancer-indexer && npm run dev
   ```
4. **Terminal 3:** Run the client
   ```bash
   cd client && npm run dev
   ```

---

## 📝 Notes

- Make sure PostgreSQL is running before starting the server
- The indexer must be running for real-time blockchain event updates
- All three services must be running for full functionality
- Update environment variables with your actual credentials
