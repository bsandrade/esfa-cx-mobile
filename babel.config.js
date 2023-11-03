module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@themes': './src/themes',
          '@src': './src',
          '@animations': './src/animations',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
