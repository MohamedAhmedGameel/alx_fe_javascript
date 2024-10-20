// Initial array of quotes
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
];

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

    // Clear the form inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert('Quote added successfully!');
  } else {
    alert('Please fill in both fields.');
  }
}

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Dynamically generate the form on page load
createAddQuoteForm();
