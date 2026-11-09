import { prisma } from "./src/lib/prisma.ts";

async function main() {
  console.log("Models disponíveis:");

  console.log(
    Object.keys(prisma).filter(
      (key) => !key.startsWith("_") && !key.startsWith("$")
    )
  );

  const tables = await prisma.$queryRaw<
    { name: string }[]
  >`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
  `;

  console.log("Tabelas no SQLite:", tables);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());