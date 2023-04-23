# Tailwind NoScript

A plugin that adds a `noscript:` variant so you can apply Tailwind classes only when scripting isn't supported.

## Motivation

On mostly static sites with a few JS-enabled interactions, you may wish to hide or visually alter
those interactions if scripting is disabled or unsupported. For example, if a dark mode toggle only
works with JS, it's a better user experience not to show it if it has not functionality.

```html
<button type="button" onClick="handleClick" class="noscript:hidden">
  Only shows with JS
</button>
```

## Installation

Install the plugin from npm:

```
npm install --save-dev tailwindcss-noscript
```

Then, add the plugin to your Tailwind configuration file:

```js
// tailwind.config.cjs
module.exports = {
  plugins: [require("tailwindcss-noscript")],
};
```

`noscript:{class}` classes will be applied whenever a `.noscript` class is present on an element
higher up in the HTML tree, just like with Tailwind's built-in `darkMode: 'class'` strategy.

**You must provide this `.noscript` class yourself.** If you have a `prefix` configured,
like `prefix: 'tw-'`, provide a `.tw-noscript` class instead.

When you have control over the full HTML, apply the class to a high-level element in the markup, and
include an inline script that removes it. Run the script as early as possible, to ensure that there's
no flash of unstyled content (FOUC).

```html
<html class="noscript">
  <head>
    <script>
      document.documentElement.classList.remove("noscript");
    </script>
  </head>
  <!-- body content -->
</html>
```

When using [Astro](https://astro.build), use the `<script is:inline>` directive.

If it isn't possible to apply the class to the root element, you may apply the class to a container
element you control, ex. `<div id="root" className="noscript">` during server side rendering. Remove
it as soon as possible on the client.

## Using a different class name

If you want to use a class name other than `.noscript`, pass a `className` option in your Tailwind
configuration file, like this:

```js
// tailwind.config.cjs
module.exports = {
  plugins: [
    require("tailwindcss-noscript")({
      className: ".no-js",
    }),
  ],
};
```

You may pass any selector, ex. `[data-noscript]`, as long as it can be removed with a script.

## Using the new "scripting" media query

The Media Queries Level 5 specification introduces a new media query, `@media (scripting: enabled)`.
**At the time of writing, it's only supported in Firefox beta/nightly.** See current browser support
[here](https://caniuse.com/mdn-css_at-rules_media_scripting).

If you configure the plugin to use this media query instead of a class name, you don't have to
alter your markup or insert a script. You also get access to a `script:` variant in addition to
`noscript:`, to apply classes only when scripting is _enabled_. Just set the `strategy` option to
`'media'` in your Tailwind config file.

```js
// tailwind.config.cjs
module.exports = {
  plugins: [
    require("tailwindcss-noscript")({
      strategy: "media",
    }),
  ],
};
```
