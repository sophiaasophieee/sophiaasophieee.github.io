$(document).ready(function() {
  var snowflakeCount = 100;
  for (var i = 0; i < snowflakeCount; i++) {
    var snowflake = $('<div class="snowflake"></div>').css({
      left: Math.random() * 100 + 'vw',
      width: Math.random() * 5 + 5 + 'px',
      height: Math.random() * 5 + 5 + 'px',
      animationDuration: Math.random() * 3 + 2 + 's',
      animationDelay: Math.random() * 2 + 's'
    });
    $('#snowflakes').append(snowflake);
  }
});
