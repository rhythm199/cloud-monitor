export const uiConfig = {
    tabs: [
      { id: "services", label: "Services" },
      { id: "incidents", label: "Incidents" }
    ],
  
    incidentTable: {
      columns: [
        { id: "id", label: "ID", type: "text" },
        { id: "title", label: "Title", type: "link" },
        { id: "serviceName", label: "Service", type: "chip" },
        { id: "severity", label: "Severity", type: "badge" },
        { id: "status", label: "Status", type: "statusChip" },
        { id: "assignee", label: "Assignee", type: "text" },
        { id: "createdAt", label: "Created", type: "time" },
        { id: "priority", label: "Priority", type: "chip" }
      ],
  
      actions: [
        {
          id: "acknowledge",
          label: "Acknowledge",
          variant: "outlined",
          nextStatus: "Acknowledged"
        },
        {
          id: "resolve",
          label: "Resolve",
          variant: "contained",
          nextStatus: "Resolved"
        }
      ]
    },
  
    sidePanel: {
      sections: [
        { id: "details", label: "Details" },
        { id: "description", label: "Description" },
        { id: "notes", label: "Notes" }
      ]
    },
  
    filters: [
      { id: "severity", type: "multi", options: ["Critical", "High", "Medium", "Low"] },
      { id: "status", type: "multi", options: ["Open", "Acknowledged", "Resolved"] }
    ],

    
  };