import { createContext, useState, useCallback } from "react";
import { db } from "../utils/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import debounce from "lodash.debounce"; // Install using npm install lodash.debounce

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (term) => {
    const trimmedSearch = term.trim();
    if (!trimmedSearch) {
      setSearchResults([]);
      return;
    }

    try {
      const usersCollection = collection(db, "users");

      // Prepare queries
      const nameQuery = query(
        usersCollection,
        where("name", ">=", trimmedSearch),
        where("name", "<=", trimmedSearch + "\uf8ff")
      );
      const emailQuery = query(
        usersCollection,
        where("email", ">=", trimmedSearch),
        where("email", "<=", trimmedSearch + "\uf8ff")
      );
      const scoreQuery = !isNaN(trimmedSearch)
        ? query(usersCollection, where("score", "==", parseInt(trimmedSearch, 10)))
        : null;

      // Execute all queries
      const [nameSnap, emailSnap, scoreSnap] = await Promise.all([
        getDocs(nameQuery),
        getDocs(emailQuery),
        scoreQuery ? getDocs(scoreQuery) : Promise.resolve({ docs: [] }),
      ]);

      // Collect results
      const allResults = [
        ...nameSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ...emailSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ...(scoreQuery
          ? scoreSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          : []),
      ];

      // Deduplicate results by ID
      const uniqueResults = Array.from(
        new Map(allResults.map((item) => [item.id, item])).values()
      );

      setSearchResults(uniqueResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  // Debounce the search function to avoid frequent API calls
  const debouncedSearch = useCallback(
    debounce((term) => handleSearch(term), 300), 
    []
  );

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        handleInputChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
