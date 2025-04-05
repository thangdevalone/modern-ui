import {cn} from "@/lib/utils";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/modern-ui/table";
import {ColumnDef, flexRender, Table as ITable} from "@tanstack/react-table";

interface DataTableBodyProps<TData, TValue> {
  table: ITable<TData>;
  columns: ColumnDef<TData, TValue>[];
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  actionPerRow?: (data: TData) => void;
}

export default function DataTable<TData, TValue>(props: DataTableBodyProps<TData, TValue>) {
  const {
    table,
    className,
    rowClassName,
    columns,

    headerClassName,
    actionPerRow,
  } = props;
  return  <Table className={cn(className)}>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow className={cn('hover:bg-background', headerClassName)} key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody>
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row, index) => (
          <TableRow
            key={row.id}
            className={cn('hover:bg-muted', rowClassName)}
            onClick={() => {
              if (actionPerRow) {
                actionPerRow(row.original)
              }
            }}
            data-state={row.getIsSelected() ? 'selected' : undefined}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
}