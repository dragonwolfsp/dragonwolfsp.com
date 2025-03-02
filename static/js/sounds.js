// Get all links on the page
const links = document.querySelectorAll('a');

// Add event listener to each link
links.forEach(link => {
  link.addEventListener('click', (event) => {
    // Play the sound on link click
    theme-sound.play();
});
});