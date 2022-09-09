$(document).ready(function() {
  /* Banner Randomization */
  //randomly shuffles the banner elements that are in the banner container
  $(".banner_container").html($(".banner_container .banner").sort(function(){
    return Math.random()-0.5;
  }));
  //selects all banner elements in the container
  var bannerElements = $(".banner_container .banner").toArray();
  //get todays date and remove the time
  var today = new Date().setHours(0,0,0,0);
  //loop through each banner element in reverse order
  for (var i = (bannerElements.length - 1); i >= 0; i--)
  {
    //grab the start and end date from the banner element. if there isn't one, set it to today
    var tmpStart = new Date(Date.parse($(bannerElements[i]).data("start")));
    var tmpEnd = new Date(Date.parse($(bannerElements[i]).data("end")));
    if(!(tmpStart instanceof Date && !isNaN(tmpStart)))
      tmpStart = new Date().setHours(0,0,0,0);
    if(!(tmpEnd instanceof Date && !isNaN(tmpEnd)))
      tmpEnd = new Date().setHours(0,0,0,0);

    //if today is not in between the start and end date, remove this banner element from the list
    if(!((tmpStart <= today) && (today <= tmpEnd)))
    {
      $(bannerElements[i]).remove();
      bannerElements.splice(i, 1);
    }
  }

  var bannerCount = bannerElements.length;
  //if we have 3 or less banner elments, display them all
  if(bannerCount <= 3)
  {
    for (var i = 0; i < bannerElements.length; i++)
    {
      $(bannerElements[i]).removeClass("hidden_banner");
    }
  }
  else
  {
    //if there are more than 3 banner elements available, randomly select 3 of them and show them
    var bannerDisplayCount = 0;
    while(bannerDisplayCount < 3)
    {
      var tmp = Math.floor(Math.random() * bannerElements.length);
      $(bannerElements[tmp]).removeClass("hidden_banner");
      bannerElements.splice(tmp, 1);
      bannerDisplayCount++;
    }

    for (var i = (bannerElements.length - 1); i >= 0; i--)
    {
      $(bannerElements[i]).remove();
    }
  }
  /* End Banner Randomization */
}
