export const ImageGalleryItem = ({image }) => {
    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={image} alt={image} />
        </li>
    );  
};