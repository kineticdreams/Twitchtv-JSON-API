$(document).ready(function() {
  let streamArr = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
    "monstercat",
    "brunofin",
    "comster404"
  ];

  streamArr.forEach(function(el) {
    $.getJSON(
      `https://wind-bow.gomix.me/twitch-api/streams/${el}?callback=?`,
      data => {
        // console.log(data.error);
        if (data.stream === null) {
          $.getJSON(
            `https://wind-bow.gomix.me/twitch-api/channels/${el}?callback=?`,
            channelData => {
              if (channelData.status === 404) {
                $("#streams").prepend(
                  `<li class=" offline shadowCenter roundBorder"><img class="icon roundBorder" src="https://dummyimage.com/50x50/8f8f8f/ff0000.png&text=invalid">Account <a>${el}</a> <span>never existed</span></li>`
                );
              } else if (channelData.status === 422) {
                $("#streams").prepend(
                  `<li class=" offline shadowCenter roundBorder"><img class="icon roundBorder" src="https://dummyimage.com/50x50/8f8f8f/ff0000.png&text=closed">Channel <a>${el}</a> is <span>closed</span></li>`
                );
              } else {
                $("#streams").prepend(
                  `<li class=" offline shadowCenter roundBorder"><img class="icon roundBorder" src=${channelData.logo}>Channel <a href=${channelData.url}  target="_blank">${el}</a> is currently <span class="status">offline</span></li>`
                );
              }
            }
          );
        } else {
          let status = data.stream.channel.status;
          if (status.length > 33) {
            status = status.substring(0, 30);
            status += "...";
          }
          $("#streams").prepend(
            `<li class=" online shadowCenter roundBorder"><img class="icon roundBorder" src= ${data.stream.channel.logo}>Channel <a href=${data.stream.channel.url}  target="_blank">${el} </a> is currently streaming <span>${status}</span></li>`
          );
        }
      }
    );
  });

  $(".menu").click(e => {
    let clicked = e.target.id;
    if (clicked === "all") {
      $(".menu").removeClass("selected all on off");
      $("#all").toggleClass("selected all");
      $(".online, .offline").css("display", "inline-flex");
    } else if (clicked === "on") {
      $(".menu").removeClass("selected all on off");
      $("#on").addClass("selected on");
      $(".offline").css("display", "none");
      $(".online").css("display", "inline-flex");
    } else {
      $(".menu").removeClass("selected all on off");
      $("#off").addClass("selected off");
      $(".online").css("display", "none");
      $(".offline").css("display", "inline-flex");
    }
  });
});
