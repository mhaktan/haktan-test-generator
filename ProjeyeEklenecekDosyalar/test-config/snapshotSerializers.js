module.exports = {
  test: val => typeof val === 'string',
  print: val => {
      let newVal = val.replace(/mui-\d+/g, 'mui-fixed'); // Material-UI'nin random class'larını sabitliyor
      newVal = newVal.replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/g, '2025-03-17T09:30'); // Tarihleri sabitliyor
      return `"${newVal}"`;
  },
};