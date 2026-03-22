import { useState } from "react";
import { Box, Chip, Button, Select, MenuItem } from "@mui/material";
import { uiConfig } from "../../config/ui.config";

export default function Filters({ onChange }) {
  const [filters, setFilters] = useState({});

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange(updated);
  };

  const clearAll = () => {
    setFilters({});
    onChange({});
  };

  return (
    <Box mb={2}>
      {uiConfig.filters.map(f => (
        <Select
          key={f.id}
          multiple={f.type === "multi"}
          value={filters[f.id] || []}
          onChange={e => handleChange(f.id, e.target.value)}
          sx={{ mr: 2, minWidth: 150 }}
        >
          {f.options.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      ))}

      <Button onClick={clearAll}>Clear All</Button>

      <Box mt={1}>
        {Object.entries(filters).map(([key, values]) =>
          values.map(v => (
            <Chip
              key={v}
              label={`${key}: ${v}`}
              onDelete={() => {
                const updated = {
                  ...filters,
                  [key]: filters[key].filter(x => x !== v)
                };
                setFilters(updated);
                onChange(updated);
              }}
              sx={{ mr: 1 }}
            />
          ))
        )}
      </Box>
    </Box>
  );
}