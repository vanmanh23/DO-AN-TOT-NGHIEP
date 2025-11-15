import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-screen min-h-screen box-border">
          <Outlet />
        </div>
        </QueryClientProvider>
    </Provider>
  );
}

export default App;
