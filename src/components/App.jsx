import './App.css';
import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import imagesApi from './services/services';
import { Modal } from "components/Modal/Modal";


export class App extends Component {

  state = {
    imageName: '',
    images: [],
    totalHits: 0,
    page: 1,
    status: 'idle',
    showModal: false,
    modalImage: [],
  };

  handleFormSubmit = (value) => {
    this.setState({
      imageName: value,
      images: [],
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {

    const { imageName, page, images } = this.state;
    

    if (prevState.imageName !== imageName) {

        this.setState({ status: 'pending'});
            
        imagesApi.fetchImages(imageName, page).then(response => {
            if (response.totalHits === 0) {
                this.setState({ status: 'empty' });
            } else {
              const resDes = response.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }));
              this.setState({
                images: [...images, ...resDes],        
                    status: 'resolved',
                });
            };   
        });
    };

    if (prevState.page !== page) {
        
      imagesApi.fetchImages(imageName, page).then(response => {
        this.setState({images: this.state.images.concat(response.hits)})
      })
    };
  };
  

  loadMore = () => {
      this.setState((prevState) => ({
      page: prevState.page + 1
    }));    
  };
  
  toggleModal = () => {
      this.setState({ showModal: !this.state.showModal })
  };
            
  openModal = (image) => {
      const modalImg = this.state.images.filter(e => {return e.webformatURL === image});

      this.setState({ modalImage: modalImg[0] });

      this.toggleModal();        
  };
  
  render() {
    const { status, showModal, modalImage, images } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery status={status} images={images} openModal={this.openModal} loadMore={this.loadMore} />
        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={modalImage.largeImageURL} alt={modalImage.tags} />
          </Modal>
        )}
      </div>
    );
  };
};
