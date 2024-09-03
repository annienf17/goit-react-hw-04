import { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [word, setWord] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (word.trim() === "") {
      toast.error("Enter search query");
      return;
    }
    onSubmit(word);
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
