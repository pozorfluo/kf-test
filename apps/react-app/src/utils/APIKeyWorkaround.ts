/**
 * Return 'current URL' hash part, if any, with the # stripped.
 * 
 * @note Used to avoid commiting an API key to the repo while still being able 
 *       to hand a link to a live website for demonstration purposes.
 *       
 *       e.g. : https://myprofile.github.io/livedemo/#{API_key}
 */
export const getAPIKey = () => window.location.hash.slice(1) || '';
