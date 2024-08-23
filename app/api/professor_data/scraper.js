// Import required modules
const axios = require("axios"); // Used to make HTTP requests
const cheerio = require("cheerio"); // Used for parsing and extracting data from HTML

// Function to scrape professor data from the given URL
const scrapeProfessorData = async (url) => {
  try {
    // Fetch the HTML of the page
    const { data } = await axios.get(url);
    
    // Load the HTML into cheerio for parsing
    const $ = cheerio.load(data);

    // Extract the professor's name, department, rating, and number of ratings
    const name = $("h1").text().trim(); // Extract the professor's name
    const department = $(".Department").text().trim(); // Extract the professor's department
    const rating = parseFloat($(".RatingValue__Numerator-qw8sqy-2").text().trim()); // Extract and parse the rating
    const numRatings = parseInt($(".RatingValue__NumRatings-qw8sqy-3").text().trim()); // Extract and parse the number of ratings

    // Return the extracted data as an object
    return {
      name,
      department,
      rating,
      numRatings,
    };
  } catch (error) {
    // Log any errors that occur during scraping
    console.error("Error scraping professor data:", error);
    
    // Return null if scraping fails
    return null;
  }
};

// Export the scrapeProfessorData function so it can be used in other files
module.exports = { scrapeProfessorData };
