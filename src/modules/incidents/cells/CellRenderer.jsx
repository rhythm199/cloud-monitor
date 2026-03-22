import { Chip } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const map = {
  text: (v) => v,

  chip: (v) => <Chip label={v} />,

  badge: (v) => <Chip color="error" label={v} />,

  statusChip: (v) => <Chip color="success" label={v} />,

  link: (v, row, onRowClick) => (
    <span
      onClick={() => onRowClick?.(row)}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {v}
    </span>
  ),

  time: (v) => dayjs(v).fromNow()
};

export default function CellRenderer({ type, value, row, onRowClick }) {
  const renderer = map[type];
  return renderer ? renderer(value, row, onRowClick) : value;
}