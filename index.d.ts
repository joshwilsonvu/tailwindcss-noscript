declare function plugin(
  options?: { strategy?: "class"; className?: string } | { strategy: "media" }
): {
  handler: () => void;
};

declare namespace plugin {
  const __isOptionsFunction: true;
}

export = plugin;
