import Tilt from "react-parallax-tilt";
import "./logo.css";
import brain from "./brain-logo.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" tiltReverse={true} style={{ height: 150, width: 150 }}>
        <div className="Tilt-inner flex h-100">
          <img alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
