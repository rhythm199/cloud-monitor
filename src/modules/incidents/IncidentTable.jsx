import { uiConfig } from "../../config/ui.config";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import CellRenderer from "./cells/CellRenderer";

export default function IncidentTable({ data, onRowClick }) {
  const { columns, actions } = uiConfig.incidentTable;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.id}>{col.label}</TableCell>
          ))}

          {/* ✅ Dynamic Actions Column */}
          {actions && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id} hover>
            {columns.map((col) => (
              <TableCell key={col.id}>
                <CellRenderer
                  type={col.type}
                  value={row[col.id]}
                  row={row}
                  onRowClick={onRowClick}
                />
              </TableCell>
            ))}

            {/* ✅ Dynamic Actions */}
            {actions && (
              <TableCell>
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => onRowClick(row)}
                    style={{ marginRight: 8 }}
                  >
                    {action.label}
                  </button>
                ))}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}