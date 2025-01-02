$(document).ready(function() {
  var snowflakeCount = 100;
  var snowflakeImages = [
    'https://i.imgur.com/RDSMKvt.png', // Image 1
    'https://i.imgur.com/another-image.gif', // GIF 1
    'https://i.imgur.com/yet-another-image.gif' // GIF 2
  ];

  for (var i = 0; i < snowflakeCount; i++) {
    var isGifSnowflake = Math.random() < 0.5; // 50% chance to be a GIF snowflake
    var size = Math.random() * 30 + 20; // Size between 20px and 50px
    var snowflake = $('<div class="snowflake"></div>').css({
      left: Math.random() * 100 + 'vw',
      top: '-' + (Math.random() * 20 + 10) + 'px', // Spawn slightly above the screen
      width: size + 'px',
      height: size + 'px',
    });

    if (isGifSnowflake) {
      var randomGif = snowflakeImages[Math.floor(Math.random() * snowflakeImages.length)];
      snowflake.addClass('snowflake-image').css({
        backgroundImage: 'url(' + randomGif + ')',
        animationDuration: Math.random() * 5 + 7 + 's', // Slower fall duration for GIFs
      });
    } else {
      var randomImage = 'https://i.imgur.com/RDSMKvt.png'; // Default image for other snowflakes
      snowflake.addClass('snowflake-image').css({
        backgroundImage: 'url(' + randomImage + ')',
        animationDuration: Math.random() * 3 + 2 + 's', // Faster fall duration for images
      });
    }

    $('#snowflakes').append(snowflake);
  }
});
