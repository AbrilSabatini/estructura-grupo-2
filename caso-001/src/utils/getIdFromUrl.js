/**
 * The function `getIdFromUrl` extracts an ID from a URL string.
 * @param url - The `getIdFromUrl` function takes a URL as input and extracts the numeric ID from the
 * end of the URL. The URL should be in the format "/{id}", where {id} is a numeric value.
 * @returns The `getIdFromUrl` function ireturns the ID extracted from the URL
 * If the URL matches, return the parsed integer ID. Otherwise, it will return `null`.
 */
const getIdFromUrl = (url) => {
  const match = url.match(/^\/(\d+)$/);
  return match ? parseInt(match[1]) : null;
};

module.exports = { getIdFromUrl };
