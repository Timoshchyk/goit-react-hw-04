import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

function ImageGallery({ photos, onModalOpen }) {
  return (
    <ul className={css.gallery}>
      {photos.map(({ alt_description, urls, id }) => {
        return (
          <li className={css.item} key={id}>
            <ImageCard
              alt={alt_description}
              url={urls.small}
              urlBig={urls.regular}
              onModalOpen={onModalOpen}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
