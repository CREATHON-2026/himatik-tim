import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

interface SyncUserParams {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  role?: Role;
  phone?: string | null;
  storeName?: string | null;
  city?: string | null;
}

export async function syncUserProfile(params: SyncUserParams) {
  const { id, email, name, avatarUrl, role, phone, storeName, city } = params;

  // Cek apakah user sudah ada
  const existingUser = await prisma.user.findUnique({
    where: { id },
    include: { creatorProfile: true },
  });

  if (existingUser) {
    return existingUser;
  }

  const assignedRole: Role = role || Role.CUSTOMER;

  // Buat user baru di PostgreSQL via Prisma
  const newUser = await prisma.user.create({
    data: {
      id,
      email,
      name: name || email.split("@")[0],
      avatarUrl: avatarUrl || null,
      phone: phone || null,
      role: assignedRole,
      creatorStatus: assignedRole === Role.CREATOR ? "PENDING_VERIFICATION" : null,
      creatorProfile:
        assignedRole === Role.CREATOR && storeName && city
          ? {
              create: {
                storeName,
                city,
              },
            }
          : undefined,
    },
    include: {
      creatorProfile: true,
    },
  });

  return newUser;
}

export async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { creatorProfile: true },
  });
}
