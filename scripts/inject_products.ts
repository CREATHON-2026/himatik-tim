import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find a creator profile
  const creator = await prisma.creatorProfile.findFirst();

  if (!creator) {
    console.error("No creator profile found. Please login and visit the dashboard first to auto-create one.");
    return;
  }

  console.log(`Injecting dummy products for creator: ${creator.storeName} (${creator.id})`);

  const dummyProducts = [
    {
      title: "Gift Box Anniversary Deluxe",
      slug: "gift-box-anniversary-deluxe-" + Math.random().toString(36).substring(2, 7),
      description: "Paket kado premium untuk merayakan hari jadi.",
      price: 250000,
      stock: 10,
      category: "HAMPERS",
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop"],
      creatorId: creator.id,
      isPublished: true,
    },
    {
      title: "Bouquet Bunga Artificial",
      slug: "bouquet-bunga-artificial-" + Math.random().toString(36).substring(2, 7),
      description: "Buket bunga tiruan yang indah dan tahan lama.",
      price: 125000,
      stock: 25,
      category: "FLORAL",
      images: ["https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400&auto=format&fit=crop"],
      creatorId: creator.id,
      isPublished: true,
    },
    {
      title: "Custom Mug Lettering",
      slug: "custom-mug-lettering-" + Math.random().toString(36).substring(2, 7),
      description: "Mug keramik dengan tulisan custom.",
      price: 55000,
      stock: 50,
      category: "CUSTOM_ART",
      images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400&auto=format&fit=crop"],
      creatorId: creator.id,
      isPublished: true,
    }
  ];

  for (const p of dummyProducts) {
    await prisma.product.create({ data: p });
    console.log(`Created product: ${p.title}`);
  }

  console.log("Dummy data injection complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
