/**
 * Page Availability Plugin
 * Provides a way to check if pages exist before rendering navigation links
 * Uses collections which are available during template rendering
 * 
 * Usage in templates:
 * {% if item.url | isPageAvailable %}
 *   <a href="{{ item.url }}">{{ item.text }}</a>
 * {% endif %}
 * 
 * WARN; Cannot use hooks because those are render-lifecycle dependant and provide an indeterminate view of available pages.
 */
export const pageAvailability = eleventyConfig => {
  // Add a filter that checks if a URL exists in the collections
  eleventyConfig.addFilter('isPageAvailable', function(url) {
    // 'this.ctx.collections' gives access to all collections during rendering
    const collections = this.ctx?.collections;
    
    if (!collections) {
      return true; // Show by default if collections not available
    }
    
    // Check if any page has this URL
    const allPages = collections.all || [];
    return allPages.some(page => page.url === url);
  });
};



