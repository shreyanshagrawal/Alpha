"use client";

import { useState, memo } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
  useReactTable,
  VisibilityState,
  OnChangeFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Product } from "@/features/products/types/product";

import { columns } from "./product-columns";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Settings2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  data: Product[];
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
}

function ProductTable({
  data,
  sorting,
  setSorting,
  pagination,
  setPagination,
}: Props) {
  const router = useRouter();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination,
      columnVisibility,
      columnOrder,
    },

    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    autoResetPageIndex: false,
  });

  const moveColumn = (columnId: string, direction: "left" | "right") => {
    const currentOrder = table.getState().columnOrder;
    const allLeafColumns = table.getAllLeafColumns();
    const defaultOrder = allLeafColumns.map((d) => d.id);
    const order = currentOrder.length > 0 ? currentOrder : defaultOrder;

    const index = order.indexOf(columnId);
    if (index === -1) return;

    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;

    const newOrder = [...order];
    newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, columnId);
    setColumnOrder(newOrder);
  };

  const getFriendlyColumnName = (id: string) => {
    switch (id) {
      case "thumbnail":
        return "Image";
      case "title":
        return "Product Name";
      case "category":
        return "Category";
      case "price":
        return "Price";
      case "stock":
        return "Stock";
      case "rating":
        return "Rating";
      default:
        return id;
    }
  };

  return (
    <div className="space-y-4">
      {/* Settings Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground font-semibold">
          Showing {table.getFilteredRowModel().rows.length} products
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-xl text-xs font-semibold h-9 shadow-sm">
              <Settings2 className="h-4 w-4" />
              Customize Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-lg border">
            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground px-2 py-1.5">
              Toggle Columns
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <div key={column.id} className="flex items-center justify-between w-full rounded-lg hover:bg-muted/50 transition-colors pr-2">
                  <DropdownMenuCheckboxItem
                    className="capitalize text-xs font-medium focus:bg-transparent flex-1 cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {getFriendlyColumnName(column.id)}
                  </DropdownMenuCheckboxItem>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveColumn(column.id, "left");
                      }}
                      className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-all"
                      title="Move Left/Up"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveColumn(column.id, "right");
                      }}
                      className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-all"
                      title="Move Right/Down"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="group cursor-pointer select-none py-3.5 text-xs font-semibold hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                          {canSort && (
                            <span className="transition-all">
                              {isSorted === "asc" ? (
                                <ArrowUp className="h-3.5 w-3.5 text-primary" />
                              ) : isSorted === "desc" ? (
                                <ArrowDown className="h-3.5 w-3.5 text-primary" />
                              ) : (
                                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/80 transition-colors" />
                              )}
                            </span>
                          )}
                        </div>

                        {/* Reorder Buttons on Header */}
                        <div className="hidden group-hover:flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveColumn(header.column.id, "left");
                            }}
                            className="p-1 hover:bg-muted rounded text-muted-foreground/60 hover:text-foreground transition-all"
                            title="Move Left"
                          >
                            <ChevronLeft className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveColumn(header.column.id, "right");
                            }}
                            className="p-1 hover:bg-muted rounded text-muted-foreground/60 hover:text-foreground transition-all"
                            title="Move Right"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => router.push(`/products/${row.original.id}`)}
                  className="cursor-pointer transition-colors hover:bg-muted/50 border-b last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="rounded-xl shadow-sm text-xs font-semibold"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="rounded-xl shadow-sm text-xs font-semibold"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default memo(ProductTable);
