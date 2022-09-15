import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, alt, openModal }) => {
    return (
        <li className="ImageGalleryItem" onClick={()=> openModal(image, alt)}>
            <img className="ImageGalleryItem-image" src={image} alt={alt} />
        </li>
    );  
};

ImageGalleryItem.propType = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};