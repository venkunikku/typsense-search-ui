"use client";
import SearchResults from "@/components/search_results";
import { useState, useEffect } from "react";
import EnglishWordCorrection from "./english_word_correction";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState();
  const [searchData, setSearchData] = useState({});
  const [searchDataCorrection, setSearchDataCorrection] = useState({});

  const getSearchData = async (term) => {
    try {
      if (term && term.length > 2) {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: term,
            query_by: "item_desc,item_number_str",
            // filter_by : "store_unit:>9600",
            // sort_by: "store_unit:desc",
            include_fields: "store_unit,item_desc,item_number,rating",
            facet_by: "store_unit,rating",
            prioritize_exact_match: false,
            prioritize_num_matching_fields: false,
            query_by_weights: "1,4",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Search error:", error);
      throw error; // Propagate error to be handled by the caller
    }
  };

  const getSearchDataCorrection = async (term) => {
    try {
      if (term && term.length > 2) {
        const response = await fetch("/api/english_words", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: term,
            limit: 4,
            query_by: "word",
            collection: "english_words",
            sort_by: "popularity:desc",
            include_fields: "word",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Search error:", error);
      throw error; // Propagate error to be handled by the caller
    }
  };

  const getMultiSearchData = async (term) => {
    try {
      if (term && term.length > 2) {
        const response = await fetch("/api/multi_search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searches: [
              {
                q: term,
                query_by: "item_desc,item_number_str",
                collection: "inv",
                // filter_by : "store_unit:>9600",
                // sort_by: "store_unit:desc",
                include_fields: "store_unit,item_desc,item_number,rating",
                facet_by: "store_unit,rating",
                prioritize_exact_match: false,
                prioritize_num_matching_fields: false,
                query_by_weights: "1,4",
              },
              {
                q: term,
                collection: "english_words",
                limit: 4,
                query_by: "word",
                collection: "english_words",
                sort_by: "popularity:desc",
                include_fields: "word",
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Search error:", error);
      throw error; // Propagate error to be handled by the caller
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearchData(searchTerm);
      setSearchData(data);
    };

    const fetchDataCorrection = async () => {
      const dataCorrection = await getSearchDataCorrection(searchTerm);
      setSearchDataCorrection(dataCorrection);
    };
    const fetchMultiSearchData = async () => {
      const data = await getMultiSearchData(searchTerm);
      if (data) {
        setSearchData(data?.results[0]);
        setSearchDataCorrection(data?.results[1]);
      }
    };
    // fetchDataCorrection();
    // fetchData();
    fetchMultiSearchData();
  }, [searchTerm]);

  const onInputChange = (event) => {
    const value = event.target.value;
    // console.log(value);
    setSearchTerm(value);
  };

  return (
    <>
      <div className="">
        <input
          className="rounded-md m-10 p-1 text-sky-500"
          type="search"
          placeholder="Items"
          onChange={onInputChange}
        />
      </div>
      <div>
        <EnglishWordCorrection data={searchDataCorrection} />
      </div>

      <div>
        <SearchResults data={searchData}></SearchResults>
      </div>
    </>
  );
}
