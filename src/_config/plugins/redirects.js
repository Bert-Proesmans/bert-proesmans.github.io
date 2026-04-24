/**
 * Eleventy Redirects Plugin
 * 
 * Generates redirect pages for URLs specified in page data via `redirect_from`.
 * This plugin processes all pages and creates HTML redirect files that forward
 * visitors to the new URL using both JavaScript and meta refresh.
 * 
 * Usage in page frontmatter:
 *   redirect_from: "/old-url/"
 *   or
 *   redirect_from: 
 *     - "/old-url-1/"
 *     - "/old-url-2/"
 */

export const redirects = (eleventyConfig) => {
  // Add a collection that contains all redirects
  eleventyConfig.addCollection('_redirects', (collection) => {
    const redirects = [];
    const allPages = collection.getAll();

    allPages.forEach((page) => {
      if (Array.isArray(page.data.redirect_from)) {
        for (let url of page.data.redirect_from) {
          redirects.push({ to: page.url, from: url });
        }
      } else if (typeof page.data.redirect_from === 'string') {
        redirects.push({ to: page.url, from: page.data.redirect_from });
      }
    });

    return redirects;
  });
};
