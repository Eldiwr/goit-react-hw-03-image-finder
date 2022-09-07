import { Component } from "react";
import imagesApi from '../services/services';
import { ImageGalleryItem } from "./ImageGalleryItem";
import { Button } from "./Button";
import { Loader } from "./Loader";
import { Modal } from "components/Modal/Modal";

export class ImageGallery extends Component {
    state = {
        images: [],
        totalHits: 0,
        page: 1,
        status: 'idle',
        showModal: false,
        modalImage: [],
    };

    componentDidUpdate(prevProps, prevState) {

        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;
        const prevPage = prevState.page;
        const nextPage = this.state.page;

        if (prevName !== nextName || prevPage !== nextPage) {

            this.setState({ status: 'pending'});
            
            imagesApi.fetchImages(nextName, nextPage).then(response => {
                if (response.totalHits === 0) {
                    this.setState({ status: 'empty' });
                } else{
                    this.setState({
                        images: this.state.images.concat(response.hits),        
                        status: 'resolved',
                    });
                };

                if (prevName !== nextName) {
                    this.setState({images: response.hits, totalHits: response.totalHits,})
                };
            });
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

        const { status, images, showModal, modalImage } = this.state;

        if (status === 'idle') {
            return <div></div>
        };

        if (status === 'pending') {
            return <Loader />
        };

        if (status === 'empty') {
            return <span>Not found (-__-)</span>
        };

        if (status === 'resolved') {
            return (
                <>               
                <ul className="ImageGallery">        
                    {images.map((image) => {
                        return <ImageGalleryItem key={image.id} image={image.webformatURL} alt={image.tag} openModal={this.openModal} />
                    })}
                </ul>  
                    
                <Button onClick={this.loadMore} />

                {showModal && (
                    <Modal toggleModal={this.toggleModal}>
                        <img src={modalImage.largeImageURL} alt={modalImage.tags} />
                    </Modal>
                )}                                          
                </>              
                );    
            };     
        };  
    };
