import {
  Drawer,
  Box,
  Typography,
  Chip,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Notes from "./Notes";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQueryClient } from "@tanstack/react-query";
import { updateIncidentStatus } from "../../services/api";
import { uiConfig } from "../../config/ui.config";

dayjs.extend(relativeTime);

const STATUS_COLORS = {
  Open: "error",
  Acknowledged: "warning",
  Resolved: "success",
};

export default function IncidentDrawer({ open, onClose, incident, onSuccess }) {
  const queryClient = useQueryClient();

  if (!incident) return null;

  const handleStatusChange = (newStatus) => {
    updateIncidentStatus(incident.id, newStatus).then(() => {
      queryClient.setQueryData(["incidents"], (old = []) =>
        old.map((item) =>
          item.id === incident.id ? { ...item, status: newStatus } : item
        )
      );

      onSuccess?.(`Marked as ${newStatus}`);
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={380} display="flex" flexDirection="column" height="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={1.5}
          borderBottom="1px solid #e5e7eb"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight={600}>{incident.id}</Typography>
            <Chip
              size="small"
              label={incident.status}
              color={STATUS_COLORS[incident.status] || "default"}
            />
          </Box>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box flex={1} overflow="auto" px={2} py={2}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            {incident.title}
          </Typography>

          <Box display="flex" flexDirection="column" gap={1} mb={2}>
            <Typography variant="body2">
              <b>Service:</b> {incident.serviceName}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2"><b>Severity:</b></Typography>
              <Chip size="small" label={incident.severity} color="error" />
            </Box>

            <Typography variant="body2">
              <b>Assigned to:</b> {incident.assignee}
            </Typography>

            <Typography variant="body2">
              <b>Created:</b> {dayjs(incident.createdAt).fromNow()}
            </Typography>

            <Typography variant="body2">
              <b>Updated:</b> {dayjs(incident.createdAt).fromNow()}
            </Typography>
          </Box>
          
          <Divider />
          
          <Box mt={2}>
            <Typography fontWeight={600} mb={1}>
              Description
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Database cluster not responding, affecting all CRM services.
            </Typography>
          </Box>

          <Box mt={3}>
            <Typography fontWeight={600} mb={1}>
              Notes
            </Typography>
            <Notes incident={incident} onSuccess={onSuccess} />
          </Box>
        </Box>

        <Box display="flex" gap={1} p={2} borderTop="1px solid #e5e7eb">
          {uiConfig.incidentTable.actions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              fullWidth
              onClick={() => handleStatusChange(action.nextStatus)}
              disabled={incident.status === action.nextStatus}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}