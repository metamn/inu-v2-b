import { useQuery } from "./index";

/**
 * Loads data from database
 *
 * Example: `useData(defaultValues, query, 'generalSettings')` where:
 *
 * - defaultValues: {title: "Ioan Chivu", url: "http://inu.ro"}
 *
 * - query:
 * ```
 * query siteInfo {
 * 	generalSettings {
 * 		title
 * 		url
 *  }
 * }
 * ```
 *
 * - filter: 'generalSettings'
 *
 * @param  Object defaultValues The default values to return while loading data from the DB
 * @param  Object query         The GraphQL query to execute
 * @param  String filter        The part of the data to return
 * @param  Array  variables     The query variable
 * @return Object               The data returned
 */
const useData = (defaultValues, query, filter, variables = {}) => {
  /**
   * Queries the database
   */
  const { data, error, loading } = useQuery(query, variables);

  /**
   * Returns default data while real data is loaded from the database
   */
  if (loading) {
    return defaultValues;
  }

  /**
   * Logs to console when there is an error
   */
  if (error) {
    console.log("useQuery error:" + error);
    return;
  }

  /**
   * Returns data
   */
  return data[filter];
};

export default useData;
