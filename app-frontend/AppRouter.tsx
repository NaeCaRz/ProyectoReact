import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Home, } from "./src/components";
import { RoutesNotFound } from "./RoutesNotFound/RoutesNotFound";


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesNotFound>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Home />} />
      </RoutesNotFound>
    </BrowserRouter>
  );
};
