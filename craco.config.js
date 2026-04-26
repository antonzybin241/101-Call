module.exports = {
    babel: {
      // Ensure optional chaining / nullish coalescing in dependency output is transformed
      // left in dependency output when preset-env targets modern browsers. Force transforms
      // so emitted JS is safe for the bundler.
      plugins: [
        require.resolve("@babel/plugin-proposal-optional-chaining"),
        require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
      ],
    },
  };