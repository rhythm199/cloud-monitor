import dayjs from "dayjs";

export const incidents = Array.from({ length: 30 }).map((_, i) => ({
  id: `INC-${i + 1}`,
  title: `Incident ${i + 1}`,
  serviceName: ["Auth", "Payments", "Search"][i % 3],
  severity: ["Critical", "High", "Medium", "Low"][i % 4],
  status: ["Open", "Acknowledged", "Resolved"][i % 3],
  assignee: "John Doe",

  priority: ["P1", "P2", "P3"][i % 3],
  description: `Service issue affecting ${["Auth", "Payments", "Search"][i % 3]} system.`,
  updatedAt: dayjs().subtract(i * 2, "minute").toISOString(),

  createdAt: dayjs().subtract(i * 5, "minute").toISOString(),
  notes: ""
}));

export const services = [
  {
    id: "svc-1",
    name: "Auth Service",
    status: "Healthy",
    uptime: "99.98%",
    lastChecked: new Date().toISOString(),
    incidents: 1
  },
  {
    id: "svc-2",
    name: "Payments",
    status: "Degraded",
    uptime: "97.12%",
    lastChecked: new Date().toISOString(),
    incidents: 3
  },
  {
    id: "svc-3",
    name: "Search",
    status: "Down",
    uptime: "92.45%",
    lastChecked: new Date().toISOString(),
    incidents: 5
  }
];