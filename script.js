document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded. Ready to add AJAX.');
});

document.addEventListener('DOMContentLoaded', async function () {
    const loadingElement = document.getElementById('loading');
    const listingsContainer = document.getElementById('listings');
    const template = document.getElementById('listing-template');

    try {
        // 1. Fetch JSON
        const response = await fetch('./airbnb_sf_listings_500.json');
        if (!response.ok) {
            throw new Error("Unable to locate the JSON FILE");
        }

        // 2. Parse JSON
        const allListings = await response.json();

        // 3. Take first 50
        const first50 = allListings.slice(0, 50);
        console.log('First listing sample:', first50[0]);

        // 4. Hide loading message
        loadingElement.style.display = "none";

        // 5. Make cards
        first50.forEach(function (listing) {
            // Clone the template content
            const clone = template.content.cloneNode(true);

            // Get elements in the clone
            const thumbnailEl = clone.querySelector('.thumbnail');
            const nameEl = clone.querySelector('.name');
            const ratingBadgeEl = clone.querySelector('.rating-badge');
            const priceEl = clone.querySelector('.price');
            const descriptionEl = clone.querySelector('.description');
            const amenitiesEl = clone.querySelector('.amenities');
            const hostPhotoEl = clone.querySelector('.host-photo');
            const hostNameEl = clone.querySelector('.host-name');
            const linkEl = clone.querySelector('.view-link');

            // Data from JSON with fallbacks
            const name = listing.name || 'No title';
            const description = listing.description || 'No description provided.';
            const amenitiesList = Array.isArray(listing.amenities)
                ? listing.amenities.slice(0, 5).join(', ')
                : 'No amenities listed.';
            const price = listing.price || 'Price not available';

            const ratingValue = listing.review_scores_rating;
            const ratingText = (ratingValue !== null && ratingValue !== undefined)
                ? ratingValue + ' / 5'
                : 'No rating';

            const hostName = listing.host_name || 'Unknown host';
            const hostPhotoUrl = listing.host_picture_url || '';
            const thumbnailUrl = listing.picture_url || '';
            const url = listing.listing_url || '#';

            // Thumbnail image
            if (thumbnailUrl) {
                thumbnailEl.src = thumbnailUrl;
            } else {
                thumbnailEl.src = 'https://via.placeholder.com/120x120?text=No+Image';
            }
            thumbnailEl.alt=`Photo of ${name}`;
            // Host photo
            if (hostPhotoUrl) {
                hostPhotoEl.src = hostPhotoUrl;
            } else {
                hostPhotoEl.src = 'https://via.placeholder.com/32x32?text=?';
            }
            hostPhotoEl.alt = `Photo of host ${hostName}`;
            // Fill text fields
            nameEl.textContent = name;
            priceEl.textContent = `Price: ${price}`;
            descriptionEl.textContent = description;
            amenitiesEl.textContent = `Amenities: ${amenitiesList}`;
            hostNameEl.textContent = hostName;
            linkEl.href = url;

            // Creative rating badge
            ratingBadgeEl.textContent = ratingText;
            if (ratingValue >= 4.5) {
                ratingBadgeEl.classList.add('rating-high');
            } else if (ratingValue >= 3.5) {
                ratingBadgeEl.classList.add('rating-medium');
            } else {
                ratingBadgeEl.classList.add('rating-low');
            }

            // Add card to page
            listingsContainer.appendChild(clone);
        });

    } catch (error) {
        console.error(error);
        loadingElement.textContent = 'Error in loading listings';
        loadingElement.style.color = 'red';
    }
});
