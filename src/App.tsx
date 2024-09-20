import Uploader from "./components/Uploader";
import Views from "./components/Views";
import { useImage } from "./contexts/ImageContext";

function App() {
  const { image } = useImage();

  return (
    <main className="h-screen w-full flex justify-center items-center">
      {image ? <Views /> : <Uploader />}
    </main>
  );
}

export default App;
