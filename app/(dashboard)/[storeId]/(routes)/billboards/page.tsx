import prismadb from "@/lib/prismadb";

import { format } from "date-fns";

import { BillboardColumn } from "./components/columns";
import BillboardClient from "./components/BillboardClient";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <main className="flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </section>
    </main>
  );
};

export default BillboardsPage;
