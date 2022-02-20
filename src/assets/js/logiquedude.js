$("#dice-color").val("#000000");
      $("#dot-color").val("#ffd700");
      let rnd;
      let x, y;
      $("#spin").click(function(e) {
        e.preventDefault();
        rnd = Math.floor(Math.random() * 6 + 1);
        switch (rnd) {
          case 1:
            x = 720;
            y = 810;
            break;
          case 6:
            x = 720;
            y = 990;
            break;
          default:
            x = 720 + (6 - rnd) * 90;
            y = 900;
            break;
        }
 $(".dice").css(
 "transform",
 "translateZ(-100px) rotateY(" + x + "deg) rotateX(" + y + "deg)"
  );
});
$("#dot-color").change(function() {
  const dot = $("#dot-color").val();
  $(".dot").css("background-color", dot);
});
$("#dice-color").change(function() {
  const dice = $("#dice-color").val();
  $(".side").css("background-color", dice);
});