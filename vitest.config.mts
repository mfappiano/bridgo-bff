import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['dotenv/config', './src/tests/vitest.setup.ts'],
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    include: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    // Configuración para transformar archivos TypeScript
    typecheck: {
      enabled: true,
    },
    // Usar SWC como transformador (más rápido que ts-node)
    deps: {
      interopDefault: true,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov' ],
      include: ['**/**/*.ts'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        '/node_modules/',
        '/build/',
        './interfaces',
        'src/__tests__/',
        './.eslintrc.js',
        './*.d.ts',
        './*.model.ts',
        '**/*.mock.ts',
        'main.ts',
        'src/cross-cutting/config/',
      ],
      thresholds: {
        global: {
          branches: 10,
          functions: 10,
          lines: 10,
          statements: 10,
        },
      },
    },
    chaiConfig: {
      truncateThreshold: 150,
    },
    clearMocks: true,
    testTimeout: 10000,
  },
});
