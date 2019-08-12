import React from "react";
import { useQuery as _useQuery } from "@apollo/react-hooks";

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
  const { data, loading, error } = _useQuery(schema, {
    variables,
    ...options
  });

  /**
   * Display error
   */
  if (error) return <p>ERROR: {error.message}</p>;

  /**
   * Return the data, the pagination handlers and more
   */
  return { data, loading };
};

export { useQuery };
