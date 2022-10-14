import { connectStateResults, Highlight } from "react-instantsearch-dom";
import Link from "next/link";
import ProductsCard from "./product-card";

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p className="absolute top-full w-full p-2 bg-white text-gray-900">
          Oops... No search results were found
        </p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <div className="absolute top-full w-full">
          {searchResults.hits.map((hit) => (
            <div
              key={hit.objectID}
              className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <Link href={{ pathname: `/product/[id]`, query: { id: hit.id } }}>
                <a className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                  <Highlight attribute="title" hit={hit} tagName="mark" />
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default connectStateResults(Hits);
