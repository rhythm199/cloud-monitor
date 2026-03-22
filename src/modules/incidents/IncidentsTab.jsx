import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Pagination, Snackbar } from "@mui/material";
import { fetchIncidents } from "../../services/api";
import { applyFilters } from "../../utils/filter.utils";
import CreateIncidentDialog from "./CreateIncidentDialog";

import Filters from "./Filters";
import IncidentTable from "./IncidentTable";
import IncidentDrawer from "./IncidentDrawer";
import TableSkeleton from "./TableSkeleton";

export default function IncidentsTab() {
  const [filters, setFilters] = useState({});
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [snackbar, setSnackbar] = useState("");
  const [openCreate, setOpenCreate] = useState(false)
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetching,
    error
  } = useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents
  });

  const filteredData = useMemo(() => {
    return applyFilters(data || [], filters);
  }, [data, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  const handleCreate = (newIncident) => {
    queryClient.setQueryData(["incidents"], (old = []) => [
      {
        id: `INC-${old.length + 1}`,
        serviceName: "Auth",
        severity: "Low",
        status: "Open",
        assignee: "John Doe",
        createdAt: new Date().toISOString(),
        notes: "",
        ...newIncident
      },
      ...old
    ]);
  };

  if (isLoading) return <TableSkeleton />;
  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <p>Something went wrong</p>
      </Box>
    );
  }

  return (
    <Box>
      <Filters onChange={handleFilterChange} />

      <Button
        variant="contained"
        onClick={() => setOpenCreate(true)}
      >
        + New Incident
      </Button>

      {filteredData.length === 0 && data.length > 0 ? (
        <Box textAlign="center" mt={4}>
          No results match your filters
        </Box>
      ) : data.length === 0 ? (
        <Box textAlign="center" mt={4}>
          No incidents available
        </Box>
      ) : (
        <>
          {isFetching && (<Box fontSize={12} color="gray" mb={1}>Updating data...</Box>)}

          <IncidentTable data={paginatedData} onRowClick={setSelectedIncident} />
          <CreateIncidentDialog
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            onCreate={handleCreate}
          />

          <IncidentDrawer open={!!selectedIncident} incident={selectedIncident} onClose={() => setSelectedIncident(null)} onSuccess={(msg) => setSnackbar(msg)} />

          <Snackbar open={!!snackbar} message={snackbar} autoHideDuration={2000} onClose={() => setSnackbar("")} />

          <Pagination count={Math.ceil(filteredData.length / PAGE_SIZE)} page={page} onChange={(_, value) => setPage(value)} />
        </>
      )}
    </Box>
  );
}
