"use client";

import ExpandableGrid, {
  GridColumnConfig,
} from "@/components/global/expandable-grid";
import OrderRowDetail from "@/components/order/order-row-detail";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { columns, orderData } from "@/constant/order";
import {
  OrderPageProvider,
  useOrderPageContext,
} from "@/providers/order/order-page-provider";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";

export default function OrdersPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { selectedOrders } = useOrderPageContext();

  const fetchData = async () => {
    const filteredOrders = orderData.filter((order) => {
      return (
        date && new Date(order.orderDate).toDateString() === date.toDateString()
      );
    });
    return filteredOrders;
  };

  return (
    <OrderPageProvider>
      <h1>Orders</h1>
      <div className="flex">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
            }}
            className="rounded-md border"
          />
        </div>
        <div className="flex-1 ml-4">
          <div className="mb-4">
            <Button variant="outline" size="sm" className="mr-2">
              <Plus className="mr-1" />
              New
            </Button>
            <Button variant="outline" size="sm" className="mr-2">
              <Check className="mr-1" />
              Accept
            </Button>
            <Button variant="outline" size="sm">
              <X className="mr-1" />
              Decline
            </Button>
          </div>
          <ExpandableGrid
            columns={columns}
            fetchData={fetchData}
            getRowDetailComponent={(row) => <OrderRowDetail row={row} />}
          />
        </div>
      </div>
    </OrderPageProvider>
  );
}
