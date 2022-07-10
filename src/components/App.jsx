import { useState, useEffect, useRef, useCallback } from 'react';
import { getPhoto } from '../shared/services/pixabayApi';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Modal from '../shared/components/Modal/Modal';
import Loader from './Loader';
import Button from './Button';

export default function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      setLoading(true);
      try {
        const data = await getPhoto(search, page);
        setItems(prevState => {
          return [...prevState, ...data.hits];
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (!firstRender.current) {
      fetchPhoto();
    } else {
      firstRender.current = false;
    }
  }, [search, page]);

  const handleFormSubmit = useCallback(
    input => {
      if (input !== search) {
        setSearch(input);
        setItems([]);
        setPage(1);
      }
    },
    [search]
  );

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const showModal = useCallback((url, tags) => {
    setOpenModal(true);
    setModalContent({
      src: url,
      alt: tags,
    });
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {!error && <ImageGallery items={items} onClick={showModal} />}
      {loading && <Loader />}
      {!loading && items.length >= 12 && (
        <Button onClick={loadMore} title="Load more" />
      )}
      {openModal && (
        <Modal onClose={closeModal}>
          <img src={modalContent.src} alt={modalContent.alt} />
        </Modal>
      )}
    </div>
  );
}
