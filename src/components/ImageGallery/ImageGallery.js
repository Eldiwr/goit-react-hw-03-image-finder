import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import PropTypes from 'prop-types';


export const ImageGallery = ({status, images, openModal, loadMore}) => {
    
    return (

        <>
            {status === 'idle' && (<div></div>)}
            {status === 'pending' && (<Loader />)}
            {status === 'empty' && (<span>Not found (-__-)</span>)}
            {status === 'resolved' && (
            <>               
                <ul className="ImageGallery">        
                    {images.map((image) => {
                        return <ImageGalleryItem key={image.id} image={image.webformatURL} alt={image.tags} openModal={openModal}/>
                    })}
                </ul>         
                <Button onClick={loadMore} />                                          
            </>)}
        </>
    );    
};
  
ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    ),
    status: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired
}