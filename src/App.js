import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import BGParticles from "./components/bgParticles/BGParticles";

function App() {
  return (
    <div className="App">
      <BGParticles />

      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
