import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

function App() {
  return (
    <Provider store={store}>
        <div className="max-w-screen min-h-screen box-border">
          <Outlet />
        </div>
    </Provider>
  );
}

export default App;
