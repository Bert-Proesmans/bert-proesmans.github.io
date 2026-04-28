/**
 * Most adjustments must be made in `./src/_config/*`
 *
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

// add yaml support
import yaml from 'js-yaml';

//  config import
import { getAllPosts, showInSitemap, tagList } from './src/_config/collections.js';
import events from './src/_config/events.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

export default async function (eleventyConfig) {
  // --------------------- Events: before build
  eleventyConfig.on('eleventy.before', async () => {
    await events.buildAllCss();
    await events.buildAllJs();
  });

  // --------------------- custom wtach targets
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  // --------------------- layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');

  //	---------------------  Collections
  eleventyConfig.addCollection('allPosts', getAllPosts);
  eleventyConfig.addCollection('showInSitemap', showInSitemap);
  eleventyConfig.addCollection('tagList', tagList);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(plugins.pageAvailability);
  eleventyConfig.addPlugin(plugins.redirects);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/webc/**/*.webc'],
    useTransform: true
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['webp', 'jpeg'],
    widths: ['auto'],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async'
      },
      pictureAttributes: {}
    }
  });

  // ---------------------  bundle
  eleventyConfig.addBundle('css', { hoist: true });

  // 	--------------------- Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('shuffle', filters.shuffleArray);
  eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  eleventyConfig.addFilter('slugify', filters.slugifyString);

  // --------------------- Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('imageKeys', shortcodes.imageKeysShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // --------------------- Events: after build
  eleventyConfig.on('eleventy.after', events.svgToJpeg);

  // --------------------- Passthrough File Copy

  // -- same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/og-images'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  eleventyConfig.addPassthroughCopy({
    // -- to root
    'src/assets/images/favicon/*': '/',

    // -- node_modules
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/components/`
  });

  // ----------------------  ignore test files
  if (process.env.ELEVENTY_ENV != 'test') {
    eleventyConfig.ignores.add('src/common/pa11y.njk');
  }

  // ----------------------  ignore support files
  if (process.env.ELEVENTY_ENV == 'production') {
  // if (true) {
    eleventyConfig.ignores.add('src/pages/accessibility.md');
    eleventyConfig.ignores.add('src/pages/built-with.njk');
    eleventyConfig.ignores.add('src/pages/get-started.md');
    eleventyConfig.ignores.add('src/pages/legal.md');
    eleventyConfig.ignores.add('src/pages/styleguide.njk');

    // -- ignore docs
    eleventyConfig.ignores.add('src/docs/platforms.md');
    eleventyConfig.ignores.add('src/docs/card.njk');
    eleventyConfig.ignores.add('src/docs/css.md');
    eleventyConfig.ignores.add('src/docs/docs.json');
    eleventyConfig.ignores.add('src/docs/javascript.md');
    eleventyConfig.ignores.add('src/docs/design-tokens.md');
    eleventyConfig.ignores.add('src/docs/pagination.md');
    eleventyConfig.ignores.add('src/docs/favicons.md');
    eleventyConfig.ignores.add('src/docs/what-delete.md');
    eleventyConfig.ignores.add('src/docs/video.md');
    eleventyConfig.ignores.add('src/docs/open-graph.md');
    eleventyConfig.ignores.add('src/docs/easteregg.md');
    eleventyConfig.ignores.add('src/docs/schema.md');
    eleventyConfig.ignores.add('src/docs/config.md');
    eleventyConfig.ignores.add('src/docs/masonry.md');
    eleventyConfig.ignores.add('src/docs/tags.md');
    eleventyConfig.ignores.add('src/docs/tests.md');
    eleventyConfig.ignores.add('src/docs/theme.md');
    eleventyConfig.ignores.add('src/docs/navigation.md');
    eleventyConfig.ignores.add('src/docs/svg.md');
    eleventyConfig.ignores.add('src/docs/details.md');
    eleventyConfig.ignores.add('src/docs/template-languages.md');
    eleventyConfig.ignores.add('src/docs/images.md');
    eleventyConfig.ignores.add('src/docs/fonts.md');

    // -- ignore demo posts
    eleventyConfig.ignores.add('src/posts/2025/2025-01-11-v-4.md');
    eleventyConfig.ignores.add('src/posts/2025/2025-01-09-post-with-image/post-with-image.md');
    eleventyConfig.ignores.add('src/posts/2022/2022-09-01-post-with-code.md');
    eleventyConfig.ignores.add('src/posts/2022/2022-11-02-markdown.md');
    eleventyConfig.ignores.add('src/posts/2022/2022-08-28-post-with301-redirects.md');
    eleventyConfig.ignores.add('src/posts/2022/2022-08-17-post-with-fetched.md');
    eleventyConfig.ignores.add('src/posts/2022/2022-10-31-post-with-video.md');
    eleventyConfig.ignores.add('src/posts/2023/2023-10-30-demos.md');
    eleventyConfig.ignores.add('src/posts/2023/2023-11-30-tailwind.md');
    eleventyConfig.ignores.add('src/posts/2023/2023-01-25-opengraph-images.md');
    eleventyConfig.ignores.add('src/posts/2024/2024-01-30-gallery.md');
    eleventyConfig.ignores.add('src/posts/2024/2024-02-01-v-2.md');
    eleventyConfig.ignores.add('src/posts/2024/2024-06-03-v-3.md');
    eleventyConfig.ignores.add('src/posts/2024/2024-07-21-draft.md');
  }

  // --------------------- general config
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}
