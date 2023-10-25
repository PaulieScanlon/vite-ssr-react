import { glob } from 'glob';
import { build } from 'vite';

const viteBuild = async (params) => {
  // console.log('');
  // console.log(params);
  await build({
    build: {
      ...params,
    },
  });
};

// setup
await viteBuild({ minify: true, emptyOutDir: true });

// client
await viteBuild({ outDir: 'dist/client' });

// server
await viteBuild({
  minify: true,
  ssr: true,
  rollupOptions: {
    input: 'src/entry-server.jsx',
    output: {
      dir: 'dist/server',
    },
  },
});

const functions = await glob('./src/pages/*/function.js');

await functions.forEach(async (file) => {
  await viteBuild({
    minify: true,
    ssr: true,
    rollupOptions: {
      input: file,
      output: {
        dir: `dist/functions/${file.split('/')[2]}`,
      },
    },
  });
});
