// Initial array of quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
];

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

// Function to display a quote
function displayQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = ''; // Clear previous quotes
  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.innerText = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  displayQuotes([randomQuote]);
}

// Function to create a form for adding new quotes
function createAddQuoteForm() {
  document.body.innerHTML += `
    <div id="quoteFormContainer">
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
    </div>
  `;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes(); // Save to local storage
    displayQuotes(quotes); // Update displayed quotes
    populateCategories(); // Update categories in the dropdown
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
  } else {
    alert('Please fill in both fields.');
  }
}

// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`; // Reset the dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.innerText = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  displayQuotes(filteredQuotes); // Display filtered quotes
  localStorage.setItem('selectedCategory', selectedCategory); // Save the selected category
}

// Load quotes and populate categories on page load
window.onload = function() {
  loadQuotes();
  populateCategories();
  const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all'; // Get last selected category from local storage
  document.getElementById('categoryFilter').value = lastSelectedCategory; // Restore last selected category
  filterQuotes(); // Show quotes based on the selected category
};

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Dynamically generate the form on page load
createAddQuoteForm();
