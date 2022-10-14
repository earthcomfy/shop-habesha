import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import CustomSearchBox from "./custom-search-box"
import CustomHits from "./custom-hits"

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_SEARCH_APP_ID,
  process.env.NEXT_PUBLIC_SEARCH_API_KEY
);

export default function Search() {
  return (
    <div className="relative">
      <InstantSearch searchClient={searchClient} indexName="products">
        <CustomSearchBox />
        <CustomHits />
      </InstantSearch>
    </div>
  );
}
