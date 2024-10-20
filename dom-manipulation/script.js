// Initial array of quotes
let quotes = [];

// Load quotes from local storage
function loadQuotes() {
  const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
  if (storedQuotes) {
    quotes = storedQuotes;
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Simulated server interaction
const mockServer = {
  data: [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
    { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
  ],
  fetchData: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 1000);
    });
  },
  postData: function (newQuote) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data.push(newQuote);
        resolve(newQuote);
      }, 1000);
    });
  },
  updateData: function (newQuotes) {
    this.data = newQuotes;
  }
};

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  const serverQuotes = await mockServer.fetchData();
  mockServer.updateData(serverQuotes); // Update server data
  return serverQuotes; // Return the fetched quotes
}

// Function to sync with server
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
  if (JSON.stringify(serverQuotes) !== JSON.stringify(quotes)) {
    // Simple conflict resolution: Server data takes precedence
    quotes = serverQuotes; // Sync local data with server data
    saveQuotes(); // Save to local storage
    displayQuotes(quotes); // Update displayed quotes
    alert('Data has been updated from the server.');
  }
}

// Function to display quotes
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = ''; // Clear previous quotes
  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Function to add a new quote
async function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes(); // Save to local storage
    await mockServer.postData(newQuote); // Simulate posting to the server
    displayQuotes(quotes); // Update displayed quotes
    alert('Quote added successfully!');
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please fill in both fields.');
  }
}

// Load quotes and sync with the server on page load
window.onload = function() {
  loadQuotes();
  syncWithServer(); // Sync data on load
};

// Periodically check for new data from the server every 5 seconds
setInterval(syncWithServer, 5000);
