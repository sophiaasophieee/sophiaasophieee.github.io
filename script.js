$(document).ready(function() {
  var snowflakeCount = 100;
  var snowflakeImages = [
    'https://i.imgur.com/RDSMKvt.png', // Image 1
    'https://media.tenor.com/aW_E-EO9smoAAAAM/halloween-happy.gif', // GIF 1
  ];

  for (var i = 0; i < snowflakeCount; i++) {
    var isImageSnowflake = Math.random() < 0.5; // 50% chance to be an image snowflake
    var size = Math.random() * 25 + 5; // Size between 20px and 50px
    var snowflake = $('<div class="snowflake"></div>').css({
      left: Math.random() * 100 + 'vw',
      top: '-' + (Math.random() * 20 + 10) + 'px',
      width: size + 'px',
      height: size + 'px',
      animationDuration: Math.random() * 3 + 2 + 's',
      animationDelay: Math.random() * 2 + 's',
    });

    if (isImageSnowflake) {
      var randomImage = snowflakeImages[Math.floor(Math.random() * snowflakeImages.length)];
      snowflake.addClass('snowflake-image').css({
        backgroundImage: 'url(' + randomImage + ')'
      });
    }

    $('#snowflakes').append(snowflake);
  }
});
