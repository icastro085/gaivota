const { log } = console;

function loadHandler(event, callback) {
  const text = event.target.result;
  callback(text);
}

function errorHandler(evt) {
  if (evt.target.error.name === 'NotReadableError') {
    log('Canno\'t read file !');
  }
}

export default function readAsText(fileToRead, callback = () => {}) {
  const reader = new FileReader();
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);

  reader.onload = (e) => loadHandler(e, callback);
  reader.onerror = errorHandler;
}
