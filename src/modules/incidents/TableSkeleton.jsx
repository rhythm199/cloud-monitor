import { Skeleton, Table, TableBody, TableRow, TableCell } from "@mui/material";

export default function TableSkeleton() {
  return (
    <Table>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            {[...Array(6)].map((_, j) => (
              <TableCell key={j}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}