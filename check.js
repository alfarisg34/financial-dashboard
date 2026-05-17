const fs = require('fs');
const lines = fs.readFileSync('transactions.csv', 'utf8').split('\n');
lines.forEach((line, i) => {
  if (i === 0) return;
  const trimmed = line.trim();
  if (trimmed === '') return;
  const cols = trimmed.split(',');
  const date = cols[0] ? cols[0].trim() : '';
  if (date === '' || date.indexOf('/') === -1) {
    console.log('Row ' + (i+1) + ': [' + date + '] -> ' + trimmed.substring(0, 80));
  }
});
