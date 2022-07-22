import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Give it a try.
      </p>
      <div className="flex w-70 center form pa4 br3">
        <input type="text" className="f4 pa2 w-70" onChange={onInputChange} />
        <button
          className="w-30 grow f4 dib link ph3 pv2 white bg-light-purple"
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
