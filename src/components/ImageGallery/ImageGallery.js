import { Component } from "react";
import imagesApi from '../services/services';
import { ImageGalleryItem } from "./ImageGalleryItem";

export class ImageGallery extends Component {
    state = {
        images: [],
        status: 'idle',
        page: 1,
        totalHits: 0,
    };

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;

        if (prevName !== nextName) {
            this.setState({ status: 'pending', page: 1 });

            imagesApi.fetchImages(nextName, 1).then(response => {
                    if (response.totalHits === 0) {
                        this.setState({ status: 'empty' });
                    } else {
                        this.setState({
                            images: response.hits,
                            totalHits: response.totalHits,
                            status: 'resolved'
                        });
                    }
                });
        };

        // const prevPage = prevState.page;
        // const nextPage = this.state.page;

        // if (prevPage !== nextPage) {
        //     imagesApi.fetchImages(nextName, nextPage).then(response => {
        //             this.state({
        //                 images: this.state.images.concat(response.hits),
        //                 status: 'resolved'
        //             });
        //         });
        // };

    };

    render() {

        const { status, images } = this.state;

        if (status === 'idle') {
            return <div></div>
        };

        if (status === 'pending') {
            return <span>Load</span>
        };

        if (status === 'empty') {
            return <span>Not found (-__-)</span>
        };

        if (status === 'resolved') {
            return (
            <ul className="ImageGallery">
                {images.map((image, index) => {
                    return <ImageGalleryItem key={index} image={image.webformatURL} />
                })}
            </ul>
            );
        };  
    };
};