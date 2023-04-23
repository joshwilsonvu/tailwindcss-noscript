const plugin = require("tailwindcss/plugin");

module.exports = plugin.withOptions((options) => {
  const strategy = (options && options.strategy) || "class";
  const className = (options && options.className) || ".noscript";
  return ({ addVariant }) => {
    if (strategy === "media") {
      addVariant("noscript", "@media not (scripting: enabled)");
      addVariant("script", "@media (scripting: enabled)");
    } else {
      addVariant("noscript", `:is(${className} &)`);
    }
  };
});
