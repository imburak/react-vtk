import "@kitware/vtk.js/Rendering/Profiles/All";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ImageProvider } from "./contexts/ImageContext.tsx";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ImageProvider>
      <NextUIProvider>
        <App />
        <ToastContainer />
      </NextUIProvider>
    </ImageProvider>
  </StrictMode>
);
