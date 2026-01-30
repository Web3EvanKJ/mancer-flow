import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma";
import { UserRole } from "../generated/prisma/enums";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.post("/user/role", async (req, res) => {
  try {
    let { address, role } = req.body as {
      address?: string;
      role?: UserRole;
    };

    if (!address) {
      return res.status(400).json({ error: "Wallet address required" });
    }

    address = address.toLowerCase();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { address },
    });

    // If user exists → return role
    if (existingUser) {
      return res.json({
        exists: true,
        role: existingUser.role,
      });
    }

    // No role provided for new user
    if (!role) {
      return res.status(400).json({
        error: "Role required for new user",
      });
    }

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        address,
        role,
      },
    });

    return res.json({
      exists: false,
      role: newUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/user/:address", async (req, res) => {
  const address = req.params.address.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { address },
  });

  if (!user) {
    return res.json({ status: "User not exist" });
  }

  res.json(user);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
