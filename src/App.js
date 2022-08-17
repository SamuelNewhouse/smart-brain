import "./App.css";
import Logo from "./components/logo/Logo";
import Navigation from "./components/navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from "./components/rank/Rank";
import Clarifai from "clarifai";
import BGParticles from "./components/bgParticles/BGParticles";
import { Component } from "react";

const app = new Clarifai.App({
  apiKey: "a73d20da20bf435d9de9a1d60e205db6",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: '',
			}
    };
  }

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			}
		})
	}

	// TEST URL: https://cdn.bleacherreport.net/images/team_logos/328x328/the_rock.png
  calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - faceData.right_col * width,
      bottomRow: height - faceData.bottom_row * height,
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({ box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .then(result => this.displayFaceBox(result))
			.then(_ => fetch('http://localhost:3000/image', {
				method: 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					id: this.state.user.id
				})
			}))
			.then(response => response.json())
			.then(count => {
				this.setState(Object.assign(this.state.user, {entries: count}))
			})
      .catch(err => console.log(err));
  };

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({isSignedIn: false})
		} else if (route === "home") {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

  render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <BGParticles />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
				{ route === 'home'
				?	<>
						<Logo />
						<Rank name={this.state.user.name} entries={this.state.user.entries}/>
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</>
				: (
					route === 'signin'
					? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
					: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
					)
				}
      </div>
    );
  }
}

export default App;
