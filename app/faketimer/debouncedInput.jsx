import { useState, useEffect } from "react";

export default function DebouncedSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Set a timer to trigger onSearch after 500ms of inactivity
    const handler = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 500);

    // Clear previous timer if user types again before 500ms
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
