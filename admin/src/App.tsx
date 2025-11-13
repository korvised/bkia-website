import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { routers } from "@/routes";
import { store } from "@/app/store.ts";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  );
}

export default App;
