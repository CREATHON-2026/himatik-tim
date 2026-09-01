import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking for dummy data...");
  const dataPath = path.join(process.cwd(), "data", "transactions.json");
  
  if (!fs.existsSync(dataPath)) {
    console.log("Running dummy_data.py to generate data...");
    execSync("python scripts/insight-prototype/dummy_data.py --creators 1", { stdio: "inherit" });
  }

  const rawData = fs.readFileSync(dataPath, "utf-8");
  const transactions = JSON.parse(rawData);

  // Get a real user from the database who is a creator
  const creator = await prisma.user.findFirst({
    where: { role: "CREATOR" },
    include: { creatorProfile: true }
  });

  if (!creator) {
    console.error("No CREATOR user found in the database. Please login or sign up first!");
    process.exit(1);
  }

  const storeId = creator.id;
  console.log(`Seeding data for User (Store): ${creator.name} (${storeId})`);

  // Delete old transactions to prevent bloat
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (prisma as any).transaction.deleteMany({
    where: { storeId: storeId }
  });

  console.log(`Inserting ${transactions.length} transactions...`);

  let count = 0;
  for (const trx of transactions) {
    // Map status from dummy data to Prisma Enum
    let status = "COMPLETED";
    if (trx.status === "PAID_ESCROW") status = "IN_ESCROW";
    else if (trx.status === "PENDING_PAYMENT") status = "PENDING";
    else if (trx.status === "CANCELLED") status = "CANCELLED";
    else if (trx.status === "REFUNDED") status = "REFUNDED";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).transaction.create({
      data: {
        id: trx.transaction_id,
        storeId: storeId,
        buyerId: trx.buyer_id,
        status: status as string,
        paymentChannel: trx.channel,
        grossAmount: trx.gross_amount,
        platformFee: Math.floor(trx.gross_amount * 0.05),
        netAmount: trx.gross_amount - Math.floor(trx.gross_amount * 0.05),
        primaryCategory: trx.category,
        primaryProductId: trx.product_id,
        primaryProductName: trx.product_name,
        createdAt: new Date(trx.created_at),
        paidAt: status === "COMPLETED" || status === "IN_ESCROW" ? new Date(trx.created_at) : null,
      }
    });
    count++;
  }

  console.log(`Successfully seeded ${count} transactions!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
