// source - https://www.geeksforgeeks.org/star-rating-using-html-css-and-javascript/

// To access the stars
const stars = document.getElementsByClassName("star");
let rating = '';
   
// Funtion to set the rating
function setRating(n) {
    remove();
    
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
}

// To remove the pre-applied styling
    function remove() {
        let i = 0;
        while (i < 5) {
            stars[i].className = "star";
            i++;
        }
}
    let userRating = '';
    const ratingHandler = async (n, id) => {
    setRating(n);
    rating = n;
   
    const response = await fetch(`/api/business/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ rating }),
            headers: { 'Content-Type': 'application/json' },
        });

        
    if (response.ok) {
        //document.location.replace(`/api/business/${id}`);
        const data = response.json();
        await data.then(res => {           
            userRating = res.rating;
        })   
    } else {
            alert('Failed to add rating');
        }  
  };

$(document).ready(function () {
    setRating(userRating);
    $('.rating').on('click', ratingHandler);
});