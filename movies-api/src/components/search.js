import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./card";

function Search() {
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=0a14e28062847d0d8d59959339cfbc66&query=${encodeURIComponent(query)}`
      )
        .then((res) => res.json())
        .then((data) => setResults(data.results || []));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.query.value;
    setSearchParams({ query: value });
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input
          name="query"
          type="text"
          placeholder="Search for a movie..."
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>
      <div className="list__cards">
        {results.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;