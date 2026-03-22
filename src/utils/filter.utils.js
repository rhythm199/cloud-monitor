export function applyFilters(data, filters) {
    return data.filter(item => {
      if (filters.severity && filters.severity.length && !filters.severity.includes(item.severity)) {
        return false;
      }
  
      if (filters.status && filters.status.length && !filters.status.includes(item.status)) {
        return false;
      }
  
      return true;
    });
  }