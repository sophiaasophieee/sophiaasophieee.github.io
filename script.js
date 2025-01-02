$(document).ready(function() {
  var snowflakeCount = 100;
  var snowflakeImage = 'https://i.imgur.com/your-snowflake-image.png'; // Customize with your own image URL

  for (var i = 0; i < snowflakeCount; i++) {
    var snowflake = $('<div class="snowflake"></div>').css({
      left: Math.random() * 100 + 'vw',
      width: Math.random() * 5 + 5 + 'px',
      height: Math.random() * 5 + 5 + 'px',
      animationDuration: Math.random() * 3 + 2 + 's',
      animationDelay: Math.random() * 2 + 's',
      backgroundImage: 'url(' + snowflakeImage + ')', // Using the custom snowflake image
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    });
    $('#snowflakes').append(snowflake);
  }
});
