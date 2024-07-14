document.getElementById('loadVerses').addEventListener('click', () => {
    fetch('*.csv')
        .then(response => response.text())
        .then(data => {
            const verses = parseCSV(data);
            displayVerses(verses);
        })
        .catch(error => console.error('Error loading verses:', error));
});

function parseCSV(data) {
    const lines = data.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
    }

    return result;
}

function displayVerses(verses) {
    const container = document.getElementById('versesContainer');
    container.innerHTML = '';

    verses.forEach(verse => {
        const verseElement = document.createElement('div');
        verseElement.classList.add('verse');
        verseElement.innerHTML = `<strong>${verse.Book} ${verse.Chapter}:${verse.Verse}</strong> - ${verse.Text}`;
        container.appendChild(verseElement);
    });
}

