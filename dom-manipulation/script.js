// Array to store quotes
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Opportunity" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = ''; // Clear the display

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Create new elements to display the quote and category
  const quoteText = document.createElement('p');
  const quoteCategory = document.createElement('p');

  quoteText.textContent = `"${randomQuote.text}"`;
  quoteCategory.textContent = `Category: ${randomQuote.category}`;

  // Append the elements to the quoteDisplay div
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Add event listener to show a new quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText === '' || newQuoteCategory === '') {
    alert('Please enter both quote text and category.');
    return;
  }

  // Add the new quote to the array
  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);

  // Clear the input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  alert('New quote added successfully!');
}
