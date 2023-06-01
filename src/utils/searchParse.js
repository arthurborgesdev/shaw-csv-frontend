export default function SearchParse(searchTerm) {
  const searchQuery = searchTerm
    .split(",")
    .map((term) => term.trim())
    .join(",");

  return searchQuery;
}