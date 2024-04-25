import css from "./ImageCard.module.css";

function ImageCard({ alt, url, urlBig, onModalOpen }) {
  return (
    <div>
      <img
        src={url}
        alt={alt}
        className={css.image}
        onClick={() => onModalOpen(urlBig, alt)}
      />
    </div>
  );
}

export default ImageCard;
