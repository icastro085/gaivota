const DEFAULT_SEPARATOR = ',';

function processData(csv) {
  const allTextLines = csv.split(/\r\n|\n/);
  const lines = [];

  for (let i = 0; i < allTextLines.length; i += 1) {
    const data = allTextLines[i].split(DEFAULT_SEPARATOR);
    const tarr = [];

    for (let j = 0; j < data.length; j += 1) {
      tarr.push(data[j]);
    }

    lines.push(tarr);
  }

  return lines;
}

function loadHandler(event, callback) {
  const csv = event.target.result;
  const lines = processData(csv);

  callback(lines);
}

function errorHandler(evt) {
  if (evt.target.error.name === 'NotReadableError') {
    console.log('Canno\'t read file !');
  }
}

export default function loadCsv(fileToRead, callback = () => {}) {
  const reader = new FileReader();
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);

  reader.onload = (e) => loadHandler(e, callback);
  reader.onerror = errorHandler;
}
