"use client";

import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter,
  TableHead, 
  TableRow, 
  TableCell,
  TableCaption
} from "@/components/modern-ui/table";

export function BasicTableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function TableWithCaptionAndFooterDemo() {
  return (
    <Table>
      <TableCaption>List of recent orders with their status.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">#12345</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>Shipped</TableCell>
          <TableCell className="text-right">$249.99</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#12346</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Processing</TableCell>
          <TableCell className="text-right">$149.99</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Orders: 2</TableCell>
          <TableCell className="text-right">$399.98</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
} 