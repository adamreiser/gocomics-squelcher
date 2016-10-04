// ==UserScript==
// @name        GoComics Squelcher
// @namespace   https://www.defensivecomputing.io/
// @description	Hides comments on gocomics.com that match a regex or are by a particular user.
// @include     http://www.gocomics.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @version     1
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_xmlhttpRequest
// ==/UserScript==


function seedLists() {
	//console.log("Seeding blacklist and banlist...");
	GM_xmlhttpRequest({
		method: "GET",
		// hide comments matching this regex
		url: "https://www.example.com/regex.txt",
		onload: function(response) {
			GM_setValue("blacklist", response.responseText);
		}
	});

	GM_xmlhttpRequest({
		method: "GET",
		// comma separated usernames sanitized by encodeURIComponent
		url: "https://www.example.com/ignored_users.txt",
		onload: function(response) {
			GM_setValue("banlist", response.responseText);
		}
	});
}

seedLists();

var blacklist = new RegExp(GM_getValue("blacklist"), "i");
var banlist = GM_getValue("banlist").split(",").map(decodeURIComponent);

var num_comments = 0;

function hidePost(jNode) {
  com = jNode['context'];
  auth = com.getElementsByClassName('comment-top-orphan') [0].getElementsByTagName('img') [0].getAttribute('title');
  if (contains(banlist, auth) || blacklist.test(com.innerHTML)) {
    jNode.css('display', 'none')
    //console.log("Squelching comment from " + auth)
  }
  else {
    num_comments++;
  }
}

function contains(a, obj) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

// comment filter
waitForKeyElements('.comment-thread li.comment', hidePost);

// number of comments currently displayed (goes up when more are loaded)
document.getElementById("comment-count-display").innerHTML = num_comments;
