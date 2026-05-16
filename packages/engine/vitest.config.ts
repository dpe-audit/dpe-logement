import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    conditions: ['development', 'import', 'module', 'default'],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
})
