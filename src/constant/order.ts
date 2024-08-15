import { GridColumnConfig } from "@/components/global/expandable-grid";
import { Order } from "@/type/order/order";

export const orderData: Order[] = [
  {
    orderNo: "1",
    deliveryTime: "10:00",
    orderDate: "2024-07-18T00:00:00",
    subject: "Order 1",
    customer: "Customer 1",
  },
  {
    orderNo: "2",
    deliveryTime: "11:00",
    orderDate: "2024-07-19T00:00:00",
    subject: "Order 2",
    customer: "Customer 2",
  },
  {
    orderNo: "3",
    deliveryTime: "12:00",
    orderDate: "2024-07-20T00:00:00",
    subject: "Order 3",
    customer: "Customer 3",
  },
  {
    orderNo: "4",
    deliveryTime: "13:00",
    orderDate: "2024-07-20T00:00:00",
    subject: "Order 4",
    customer: "Customer 4",
  },
];

export const columns: GridColumnConfig[] = [
  {
    dataType: "checkbox",
  },
  {
    dataType: "string",
    fieldName: "orderNo",
    displayName: "Order No.",
    isPrimaryKey: true,
    isShowExpandIcon: true,
  },
  {
    dataType: "time",
    fieldName: "deliveryTime",
    displayName: "Delivery Time",
  },
  { dataType: "datetime", fieldName: "orderDate", displayName: "Order Date" },
  { dataType: "string", fieldName: "subject", displayName: "Subjedt" },
  { dataType: "string", fieldName: "customer", displayName: "Customer" },
];