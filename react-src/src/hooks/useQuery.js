import { useState } from "react";
import { useQuery as _useQuery } from "react-apollo-hooks";

/**
 * Pagination for the query
 * See https://github.com/trojanowski/react-apollo-hooks/issues/182
 *
 * @param  {[type]} fetchMore The pagination handler
 * @param  {[type]} data      The data returned by the query
 * @param  {[type]} variables The query variables
 * @return {[type]}           The pagination handler and status
 */
const useLoadMore = (fetchMore, data, variables) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  function loadMore() {
    setIsLoadingMore(true);

    fetchMore({
      variables: {
        ...variables,
        skip: data.list.length
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        setIsLoadingMore(false);

        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          ...fetchMoreResult,
          edges: [...previousResult.edges, ...fetchMoreResult.edges]
        };
      }
    });
  }

  return [isLoadingMore, loadMore];
};

/**
 * The query hook
 *
 * @param  {[type]} schema         The graphql schema
 * @param  {Object} [variables={}] The graphql variables
 * @param  {Object} [options={}]   Additional options
 * @return {[type]}                The data and additional stuff
 */
const useQuery = (schema, variables = {}, options = {}) => {
  /**
   * Run the query
   */
  const { fetchMore, data, ...other } = _useQuery(schema, {
    variables,
    ...options
  });

  /**
   * Handle pagination
   */
  const [isLoadingMore, loadMore] = useLoadMore(fetchMore, data, variables);

  /**
   * Return the data, the pagination handlers and more
   */
  return { isLoadingMore, loadMore, fetchMore, data, ...other };
};

export { useQuery, useLoadMore };
