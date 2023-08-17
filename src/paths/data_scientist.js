$(document).ready(function() {
  var VA = generatedTiles["VA"];
  var newTile = generateCourseTile(VA["href"], VA["title"], VA["image"], VA["desc"], VA["tags"], "_blank");
  $(newTile).insertAfter("a[data-oid='2hgfr120dwfa2']");
});
