// Initial array of quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
];

// Load existing quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Updating the DOM directly using innerHTML
  document.getElementById('quoteDisplay').innerHTML = `
    <p>"${randomQuote.text}" - <strong>${randomQuote.category}</strong></p>
  `;
}

// Function to create a form for adding new quotes
function createAddQuoteForm() {
  // Adding form dynamically to the DOM using innerHTML
  document.body.innerHTML += `
    <div id="quoteFormContainer">
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
      <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
      <button onclick="exportToJson()">Export Quotes</button>
    </div>
  `;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    // Adding the new quote to the quotes array
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);

    // Append the new quote to the quoteDisplay area
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteElement = document.createElement('p');
    newQuoteElement.innerHTML = `"${newQuote.text}" - <strong>${newQuote.category}</strong>`;
    quoteDisplay.appendChild(newQuoteElement);

    // Save quotes to local storage
    saveQuotes();

    // Clear the form inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert('Quote added successfully!');
  } else {
    alert('Please fill in both fields.');
  }
}

// Function to export quotes to JSON file
function exportToJson() {
  const dataStr = JSON.stringify(quotes);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();  // Save updated quotes to local storage
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Load quotes from local storage on page load
loadQuotes();

// Dynamically generate the form on page load
createAddQuoteForm();
