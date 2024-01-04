module.exports = {
    module: {
      rules: [
        {
          test: /\.mp3$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'timer.mp3',
                outputPath: '../audio/timer.mp3', // adjust the output path as needed
              },
            },
          ],
        },
      ],
    },
  };