export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  genreFilter,
  setGenreFilter,
  genres,
}) {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />

      <select
        value={genreFilter}
        onChange={(e) => setGenreFilter(e.target.value)}
        className="input"
      >
        <option value="All">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
