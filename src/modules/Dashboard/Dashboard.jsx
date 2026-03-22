import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Tabs,
  Tab,
  Switch,
  Button,
  Typography,
} from "@mui/material";

import ServicesTab from "../../services/ServicesTab";
import IncidentsTab from "../incidents/IncidentsTab";
import { uiConfig } from "../../config/ui.config";
import { fetchIncidents } from "../../services/api";

export default function Dashboard() {
  const [tab, setTab] = useState("services");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const {
    refetch,
  } = useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents
  });

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      console.log("working")
      refetch();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [autoRefresh, refetch]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#1e3a8a",
          color: "white",
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography fontWeight={600}>
          ☁️ Cloud Service Monitor
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography fontSize={14}>Auto Refresh</Typography>

          <Switch
            size="small"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />

          <Button
            variant="contained"
            size="small"
            onClick={refetch}
            sx={{
              backgroundColor: "#2563eb",
              textTransform: "none",
            }}
          >
            Refresh Now
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          borderBottom: "1px solid #e5e7eb",
          px: 2
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
        >
          {uiConfig.tabs.map((t) => (
            <Tab
              key={t.id}
              value={t.id}
              label={t.label}
              sx={{ textTransform: "none" }}
            />
          ))}
        </Tabs>
      </Box>

      <Box p={2}>
        {tab === "services" && <ServicesTab />}
        {tab === "incidents" && (
          <IncidentsTab />
        )}
      </Box>
    </Box>
  );
}