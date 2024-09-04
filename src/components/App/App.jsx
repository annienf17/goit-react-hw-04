import { useState } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import css from "./App.module.css";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async (searchQuery, pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchQuery,
            page: pageNumber,
            per_page: 12,
            client_id: UNSPLASH_ACCESS_KEY,
          },
        }
      );

      const results = response.data.results;

      if (results.length === 0) {
        setError("No images found for the given search query.");
        return [];
      }

      return results.map((img) => ({
        id: img.id,
        src: img.urls.regular,
        alt: img.alt_description,
      }));
    } catch (err) {
      setError(`Failed to fetch images: ${err.message}`);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (word) => {
    setQuery(word);
    setPage(1);
    setImages([]); // Resetuje stan images do pustej tablicy
    const fetchedImages = await fetchImages(word, 1);
    setImages(fetchedImages);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const moreImages = await fetchImages(query, nextPage);
    setImages((prevImages) => [...prevImages, ...moreImages]);
    setPage(nextPage);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className={css.container}>
        <SearchBar onSubmit={handleSearchSubmit} />
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <div>
            <ImageGallery images={images} onImageClick={handleImageClick} />
            {images.length > 0 && !loading && (
              <LoadMoreBtn onClick={handleLoadMore} />
            )}
          </div>
        )}
        {loading && <Loader />}
        {isModalOpen && selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            image={selectedImage}
          />
        )}
        <Toaster />
      </div>
    </>
  );
}

export default App;
