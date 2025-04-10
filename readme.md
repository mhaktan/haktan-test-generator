**TEST GENERATOR**

utils.ts dosyası içerisinde projelerde sık kullanılan yapıların mock'ları eklenmiştir. ihtiyaca göre yeni mock'lar eklebilir.
 
**Generator içerisinde yapılacaklar**
 
- bağımlılıkları yükle
  **npm install --legacy-peer-deps**
- Projeyi derle dist klasörü oluşmalı
  **npm run build**
- globalde kullanabilmek için paketi link'le
  **npm link**
 
 
**Testi yazılacak proje için yapılacaklar.**

1- package.json'da devDependencies içerisinde aşağıdaki paketlerin eklenmesi gerekmektedir. Sonrasında standart npm install komutu ile bu paketlerin kurulumu sağlanır.
 
    "@babel/preset-typescript": "^7.26.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^29.5.14",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "ts-jest": "^29.2.6",
    "ts-node": "^10.9.2"
 
Ayrıca
scripts tag'i içerisine aşağıdaki komut eklenmelidir. Bu komut Jest ile testlerin çalıştırılmasını ve sonar taramalarına yansımasını sağlar

**"test": "jest --coverage --coverageReporters=lcov",**
 
2- ekli dosyalar test edilecek proje path içerisine eklenir.Bunlar:
 
- test-config klasörü
- babel.config.js
- jest.config.js
- jest.setup.ts
- mocks klasörü
 
**KOMUTLAR**

_proje klasörü içerisinde çalıştırıldığında ts dosyalarıyla aynı dizine snapshot test dosyalarını oluşturur_

**npx haktan-test-generator generate --projectPath ./src**
 
_proje klasörü içerisine boş bir jest-result.json dosyası oluşturulduktan sonra aşağıdaki komut çalıştırılır. Bu komut test dosyalarını çalıştırır ve hatalı çalışan test dosyalarını işaretler._

**npx jest --json --outputFile=jest-results.json**
 
_bu komut hatalı çalışan test dosyalarını temizler ve sadece çalışan test dosyalarının projede kalmasını sağlar_

**npx haktan-test-generator clean-broken --projectPath ./src**
 