import { Order } from "@/type/order/order";

type Props = {
  row: Order;
};
export default function OrderRowDetail({ row }: Props) {
  return (
    <>
      <div className="pl-5">Row Details</div>
    </>
  );
}
