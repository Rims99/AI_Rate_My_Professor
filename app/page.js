"use client"; 
import { useState } from "react"; // Import React's useState hook

export default function Home() {
  // State for storing user input query and the answer received from the API
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  // State for storing the URL submitted by the user and the scrape status message
  const [url, setUrl] = useState("");
  const [scrapeMessage, setScrapeMessage] = useState("");

  // Function to handle the submission of a professor query
  const handleSubmitQuery = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Make a POST request to the /api/query endpoint with the user's query
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userQuery: query }),
    });

    // Get the answer from the response and update the state
    const data = await response.json();
    setAnswer(data.answer);
  };

  // Function to handle the submission of a URL for scraping
  const handleSubmitUrl = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Make a POST request to the /api/scrape endpoint with the URL
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    // Get the scrape status message from the response and update the state
    const data = await response.json();
    setScrapeMessage(data.message);
  };

  return (
    <div>
      <h1>Rate My Professor AI Assistant</h1>

      {/* Form to submit a professor query */}
      <form onSubmit={handleSubmitQuery}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about a professor..."
        />
        <button type="submit">Ask</button>
      </form>

      {/* Display the answer received from the API */}
      <div>
        <h2>Answer:</h2>
        <p>{answer}</p>
      </div>

      {/* Form to submit a URL for scraping */}
      <h2>Submit a Professor's Page URL</h2>
      <form onSubmit={handleSubmitUrl}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Rate My Professors URL..."
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display the scrape status message */}
      <div>
        <h2>Scrape Status:</h2>
        <p>{scrapeMessage}</p>
      </div>
    </div>
  );
}
