import { useState } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import "./App.css";

const UNSPLASH_ACCESS_KEY = "k8EuQkjlDfP4iPJx0oYeVUvLtljhK7vsYim5eKYHuYE";

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
      return response.data.results.map((img) => ({
        id: img.id,
        src: img.urls.regular, // Use the 'regular' URL for the image source
        alt: img.alt_description,
      }));
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (word) => {
    setQuery(word);
    setPage(1);
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
      <SearchBar onSubmit={handleSearchSubmit} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {images.length > 0 && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
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
    </>
  );
}

export default App;
