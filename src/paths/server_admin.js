$(document).ready(function() {
  var SA = generatedTiles["ServerAdmin"];
  var newTile = generateCourseTile(SA["href"], SA["title"], SA["image"], SA["desc"], SA["tags"], "_blank");
  $(newTile).insertAfter("a[data-oid='2ga8e77oxfnji']");
});
