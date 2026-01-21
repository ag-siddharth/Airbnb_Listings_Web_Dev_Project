# Airbnb Listings Web Dev Project

This project is a simple web page that loads the first 50 Airbnb listings from a JSON file using JavaScript `fetch` and `await` (AJAX), based on the assignment for the web development class.

## Live Demo

GitHub Pages deployment:

https://ag-siddharth.github.io/Airbnb_Listings_Web_Dev_Project/

## What the Page Shows

For each of the first 50 listings, the page displays:[web:89][web:100][web:101]

- Listing **name**
- **Description**
- **Amenities** (a subset of the amenities list)
- **Host** name and host **photo**
- **Price**
- **Thumbnail** image of the listing
- A **creative rating badge** whose color changes based on the review score (high / medium / low)

## How It Works

- Uses **AJAX** with JavaScript `fetch` and `async/await` to load the `airbnb_sf_listings_500.json` file.[web:11][web:112]
- Parses the JSON and selects the first 50 listings.
- Dynamically creates listing cards in the DOM using JavaScript and populates them with the required fields (name, description, amenities, host info, price, thumbnail, rating badge).
- Basic layout and styling are done with plain **HTML** and **CSS**.

## Files in This Repo

- `index.html` – main page structure
- `style.css` – styles for layout and listing cards
- `script.js` – JavaScript logic (fetch, processing JSON, creating cards)
- `airbnb_sf_listings_500.json` – Airbnb listings data used by the page
