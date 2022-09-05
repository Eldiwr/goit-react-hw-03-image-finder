import { Component } from "react";
import './App.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";


export class App extends Component {

  state = {
    imageName: '',
  };

  handleFormSubmit = (value) => {
    this.setState({ imageName: value });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
      </div>
    );
  };
};
