"use client";

import { Order } from "@/type/order/order";
import { createContext, useContext, useReducer } from "react";

const OrderPageContext = createContext<{
  selectedOrders: Order[];
  dispatch: (action: any) => void;
}>({
  selectedOrders: [],
  dispatch: (action: any) => {},
});

export function OrderPageProvider({ children }: { children: React.ReactNode }) {
  const [selectedOrders, dispatch] = useReducer(selectedOrdersReducer, []);

  return (
    <OrderPageContext.Provider value={{ selectedOrders, dispatch }}>
      {children}
    </OrderPageContext.Provider>
  );
}

export function useOrderPageContext() {
  return useContext(OrderPageContext);
}

function selectedOrdersReducer(selectedOrders: Order[], action: any) {
  switch (action.type) {
    case "add":
      return [...selectedOrders, action.order];
    case "remove":
      return selectedOrders.filter(
        (order) => order.orderNo !== action.order.orderNo
      );
    case "selectAll":
      console.log("select all", action);
      return action.orders;
    case "clearAll":
      return [];
    default:
      return selectedOrders;
  }
}
