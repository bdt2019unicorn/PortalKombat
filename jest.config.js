module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '@testing-library/react/cleanup-after-each',
  ],
};
