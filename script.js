// GET ELEMENT FROM THE DOM
const reviewWrapper = document.querySelector('.review-wrapper');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');


// REVIEW CAROUSEL NAVIGATION
const carousel = document.getElementById('carousel');
let itemWidth; // match your image width

if (window.innerWidth < 768) {
  itemWidth = 344;
} else {
  itemWidth = 1024;
}

nextBtn.addEventListener('click', () => {
  reviewWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
  reviewWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
});


// ==================================== TASK DONE WITH MOCK DATA ===========================================
// Mock reviews data --- You can comment this when using real API
function createReviewCard({ author, rating, text }) {
  // Wrapper
  const review = document.createElement("div");
  review.classList.add("reviews");

  // Profile (first letter of name)
  const profile = document.createElement("div");
  profile.classList.add("profile");
  profile.textContent = author.charAt(0).toUpperCase();

  // Rating
  const ratingDiv = document.createElement("div");
  ratingDiv.classList.add("rating");

  // full stars
  const fullStars = Math.floor(rating);
  // check if there is half star
  const hasHalfStar = rating % 1 >= 0.5;
  // remaining empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa-solid", "fa-star");
    ratingDiv.appendChild(star);
  }

  // Add half star if needed
  if (hasHalfStar) {
    const halfStar = document.createElement("i");
    halfStar.classList.add("fa-solid", "fa-star-half-stroke");
    ratingDiv.appendChild(halfStar);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa-regular", "fa-star");
    ratingDiv.appendChild(star);
  }

  // Review text
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review");

  const reviewText = document.createElement("p");
  if (text.length > 260) {
    reviewText.textContent = text.slice(0, 260) + "...";
  } else {
  reviewText.textContent = text;
  }
  reviewDiv.appendChild(reviewText);

  // Author
  const authorDiv = document.createElement("div");
  authorDiv.classList.add("name");
  authorDiv.innerHTML = `&mdash; ${author}`;

  // Build card
  review.appendChild(profile);
  review.appendChild(ratingDiv);
  review.appendChild(reviewDiv);
  review.appendChild(authorDiv);

  return review;
}

mockReviews.forEach(review => {
  const reviewCard = createReviewCard(review);
  reviewWrapper.appendChild(reviewCard);
});

// ==================================== TASK DONE WITH REAL TIME DATA ======================================
// Fetch reviews from a real API endpoint --- You can uncomment this when using real API
// -------------- GOOGLE PLACES API --------------

/*
async function fetchGoogleReviews(placeId, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.result.reviews) {
      return data.result.reviews; // array of reviews
    } else {
      console.warn("No reviews found or API error:", data.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

fetchGoogleReviews('YOUR_PLACE_ID', 'YOUR_API_KEY').then(reviews => {
  reviews.forEach(review => {
    const reviewCard = createReviewCard(review);
    reviewWrapper.appendChild(reviewCard);
  });
});
*/