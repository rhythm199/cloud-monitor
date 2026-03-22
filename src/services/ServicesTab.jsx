import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "./api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Skeleton
} from "@mui/material";
import dayjs from "dayjs";

const statusColorMap = {
  Healthy: "success",
  Degraded: "warning",
  Down: "error"
};

export default function ServicesTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices
  });

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3].map(i => (
          <Grid item xs={4} key={i}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {data.map(service => (
        <Grid item xs={4} key={service.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{service.name}</Typography>

              <Chip
                label={service.status}
                color={statusColorMap[service.status]}
                sx={{ mt: 1 }}
              />

              <Typography variant="body2" sx={{ mt: 1 }}>
                Uptime: {service.uptime}
              </Typography>

              <Typography variant="body2">
                Last Checked: {dayjs(service.lastChecked).format("HH:mm:ss")}
              </Typography>

              <Typography variant="body2">
                Open Incidents: {service.incidents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}