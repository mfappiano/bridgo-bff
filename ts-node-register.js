// Registro para TypeScript y paths de tsconfig
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS'
  }
});

// Registrar soporte para los alias de rutas definidos en tsconfig.json
require('tsconfig-paths').register();
