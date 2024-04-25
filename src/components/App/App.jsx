import SearchBar from "../SearchBar/SearchBar";
import { getPhotos } from "../../api";
import { useState, useEffect } from "react";
import css from "./App.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LastPage from "../LastPage/LastPage";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ url: "", alt: "" });

  const onFormSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
  };

  useEffect(() => {
    if (!query) return;
    const photosFromApi = async () => {
      setLoader(true);
      try {
        const { results, total_pages } = await getPhotos(query, page);
        if (results.length === 0) {
          noResults();
          return;
        }
        setTotalPages(total_pages);
        setPhotos((prevPhotos) => [...prevPhotos, ...results]);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    photosFromApi(query, page);
  }, [query, page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const emptyString = () =>
    toast.error("The field is empty", {
      duration: 4000,
      position: "top-right",
    });

  const noResults = () =>
    toast.error("There is no results on your query", {
      duration: 4000,
      position: "top-right",
    });

  const onModalOpen = (imageUrl, imageAlt) => {
    setModalInfo({ url: imageUrl, alt: imageAlt });
    setIsOpen(true);
  };

  return (
    <div className={css.all}>
      <SearchBar onFormSubmit={onFormSubmit} onEmptyString={emptyString} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onModalOpen={onModalOpen} />
      )}
      {loader && <Loader />}
      {photos.length > 0 && !loader && page < totalPages && (
        <LoadMoreBtn onLoadMore={onLoadMore} />
      )}
      {page === totalPages && <LastPage />}
      <Toaster />
      {error && <ErrorMessage />}
      {modalIsOpen && (
        <ImageModal
          onClose={() => {
            setIsOpen(false);
          }}
          modalIsOpen={modalIsOpen}
          urlBig={modalInfo.url}
          alt={modalInfo.alt}
        />
      )}
    </div>
  );
}

export default App;
