"use client";

import { useOrderPageContext } from "@/providers/order/order-page-provider";
import { CircleMinus, CirclePlus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  columns: GridColumnConfig[];
  fetchData: () => Promise<any>;
  selectedRows?: any[];
  getRowDetailComponent?: (row: any) => React.ReactNode;
};

export type GridColumnConfig = {
  dataType: GridColumnDataType;
  fieldName?: string;
  displayName?: string;
  isPrimaryKey?: boolean;
  isShowExpandIcon?: boolean;
};

export type GridColumnDataType =
  | "string"
  | "number"
  | "time"
  | "datetime"
  | "checkbox";

export default function ExpandableGrid({
  columns,
  fetchData,
  getRowDetailComponent: rowDetails,
}: Props) {
  const [data, setData] = useState([]);
  const { dispatch } = useOrderPageContext();

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, [fetchData]);

  const onToggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch({ type: "selectAll", orders: data });
    } else {
      dispatch({ type: "clearAll" });
    }
  };

  return (
    <>
      <GridHeader columns={columns} onToggleCheckbox={onToggleCheckbox} />
      <GridBody
        columns={columns}
        data={data}
        getRowDetailComponent={rowDetails}
      />
    </>
  );
}

export function GridHeaderColumn({
  column,
  onToggleCheckbox,
}: {
  column: GridColumnConfig;
  onToggleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      {column.dataType === "checkbox" ? (
        <div className="flex-none border-r border-primary-foreground px-1">
          <input type="checkbox" onChange={(e) => onToggleCheckbox(e)} />
        </div>
      ) : (
        <div className="flex-1 border-r border-primary-foreground px-1">
          {column.displayName}
        </div>
      )}
    </>
  );
}

export function GridHeader({
  columns,
  onToggleCheckbox,
}: {
  columns: GridColumnConfig[];
  onToggleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-row bg-primary text-primary-foreground">
      {columns.map((column, index) => {
        return (
          <GridHeaderColumn
            key={index}
            column={column}
            onToggleCheckbox={onToggleCheckbox}
          />
        );
      })}
    </div>
  );
}

export function GridBody({
  columns,
  data,
  getRowDetailComponent,
}: {
  columns: GridColumnConfig[];
  data: any[];
  getRowDetailComponent?: (row: any) => React.ReactNode;
}) {
  return (
    <>
      {data.map((row, rowIndex) => {
        return (
          <GridRow
            key={rowIndex}
            columns={columns}
            row={row}
            getRowDetailComponent={getRowDetailComponent}
          />
        );
      })}
    </>
  );
}

export function GridRow({
  columns,
  row,
  getRowDetailComponent,
}: {
  columns: GridColumnConfig[];
  row: any;
  getRowDetailComponent?: (row: any) => React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div className="border-t">
        <div className="flex flex-row">
          {columns.map((column, columnIndex) => {
            return (
              <GridCell
                key={columnIndex}
                column={column}
                row={row}
                isExpanded={isExpanded}
                onToggleExpand={() => setIsExpanded(!isExpanded)}
              />
            );
          })}
        </div>
        {isExpanded && (
          <div>{getRowDetailComponent && getRowDetailComponent(row)}</div>
        )}
      </div>
    </>
  );
}

export function GridCell({
  column,
  row,
  onToggleExpand,
  isExpanded,
}: {
  column: GridColumnConfig;
  row: any;
  onToggleExpand?: () => void;
  isExpanded?: boolean;
}) {
  const { selectedOrders, dispatch } = useOrderPageContext();

  const isSelected = selectedOrders.some(
    (order) => order.orderNo === row.orderNo
  );

  return (
    <>
      {column.dataType === "checkbox" ? (
        <div className="flex-none border-r border-black px-1 py-1 items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch({ type: "add", order: row });
              } else {
                dispatch({ type: "remove", order: row });
              }
            }}
          />
        </div>
      ) : (
        <div className="flex items-center flex-1 border-r border-black px-1 py-1">
          {column.isShowExpandIcon && (
            <>
              {isExpanded ? (
                <CircleMinus className="size-4 mr-2" onClick={onToggleExpand} />
              ) : (
                <CirclePlus className="size-4 mr-2" onClick={onToggleExpand} />
              )}
            </>
          )}
          <span>{row[column.fieldName as string]}</span>
        </div>
      )}
    </>
  );
}
