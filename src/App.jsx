import { AppProvider } from "./app/providers";
import Dashboard from "./modules/Dashboard/Dashboard";

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}