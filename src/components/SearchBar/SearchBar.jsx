import { useState } from "react";
import css from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

function SearchBar({ onFormSubmit, onEmptyString }) {
  const [text, setText] = useState("");

  function changeText(e) {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      onEmptyString();
      return;
    } else {
      onFormSubmit(text);
      e.target.reset();
    }
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
          onChange={changeText}
        />
        <button type="submit" className={css.button}>
          <IoSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
