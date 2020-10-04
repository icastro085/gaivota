const DEFAULT_SEPARATOR = ',';
const { log } = console;

function processData(csv) {
  const allTextLines = csv.split(/\r\n|\n/);
  const lines = [];

  for (let i = 0; i < allTextLines.length; i += 1) {
    const data = allTextLines[i]
      .replace(/(\d+)+,(\d+)+/g, '$1.$2')
      .split(DEFAULT_SEPARATOR);

    const tarr = [];
    let value;

    for (let j = 0; j < data.length; j += 1) {
      value = data[j].replace(/^["]|["]$/g, '');
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(Number(value))) {
        value = Number(value);
      }

      tarr.push(value);
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
    log('Canno\'t read file !');
  }
}

export default function loadCsv(fileToRead, callback = () => {}) {
  const reader = new FileReader();
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);

  reader.onload = (e) => loadHandler(e, callback);
  reader.onerror = errorHandler;
}
