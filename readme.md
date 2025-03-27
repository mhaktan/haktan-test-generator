1- npm install --legacy-peer-deps //Uygun bağımlılıkları indirir.

npx haktan-test-generator generate --projectPath ./src
npx jest --json --outputFile=jest-results.json
npx haktan-test-generator clean-broken --projectPath ./src
