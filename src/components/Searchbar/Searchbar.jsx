import { useState } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setInput(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (input === '') {
      return;
    }
    onSubmit(input);
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          name="input"
          value={input}
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
