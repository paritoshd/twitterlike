function User(id, name='', userid='', aliasid='', profile_pic='') {
	this.id = id;
	this.name = name;
	this.userid = userid;
	this.aliasid = aliasid;
	this.profile_pic = profile_pic;
}
User.prototype.getId = function() {
	return this.id;
}
User.prototype.getName = function() {
	return this.name;
}
User.prototype.getUserId = function() {
	return this.userid;
}
User.prototype.getAliasId = function() {
	return this.aliasid;
}
User.prototype.getProfilePic = function() {
	return this.profile_pic;
}



function TwitterUser(id, name='', userid='', aliasid='', profile_pic='', description='', location='', joined='', following=0, followers=0, background_img='', favorite_followers=[]) {
	User.call(this, id, name, userid, aliasid, profile_pic);
	this.description = description;
	this.location = location;
	this.joined = joined;
	this.following = following;
	this.followers = followers;
	this.background_img = background_img;
	this.favorite_followers = favorite_followers;
}
TwitterUser.prototype = Object.create(User.prototype);
TwitterUser.prototype.constructor = TwitterUser;

TwitterUser.prototype.getDescription = function() {
	return this.description;
}
TwitterUser.prototype.getLocation = function() {
	return this.location;
}
TwitterUser.prototype.getJoinedDate = function() {
	return this.joined;
}
TwitterUser.prototype.getNumberOfFollowing = function() {
	return this.following;
}
TwitterUser.prototype.getNumberOfFollowers = function() {
	return this.followers;
}
TwitterUser.prototype.getBackgroundImg = function() {
	return this.background_img;
}
TwitterUser.prototype.getFavoriteFollowers = function() {
	return this.favorite_followers;
}
TwitterUser.prototype.getFavoriteFollowersElements = function() {
	var recommendedFollowers = $('<div>').addClass("body-recommended-followers");
	var favorite_followers = this.getFavoriteFollowers();
	var followers_length = this.getFavoriteFollowers().length;
	for (var i = 0; i < followers_length; i++) {
		var followersDiv = $('<div>').addClass("followers-div");
		followersDiv.attr('data-userid', favorite_followers[i]["userid"]);
		var followersContentDiv = $('<div>').addClass("followers-content");
		var followerName = $('<span>').addClass("follower-name").append(favorite_followers[i]["name"]);
		var followerAlias = $('<span>').addClass("follower-alias").append("@" + favorite_followers[i]["aliasid"]);
		var followerImg = $('<img>').addClass("follower-img").attr('src', favorite_followers[i]["profile_pic"]);
		followersContentDiv.append(followerName);
		followersContentDiv.append(followerAlias);
		followersContentDiv.append(followerImg);
		followersDiv.append(followersContentDiv);
		recommendedFollowers.append(followersDiv);
	}
	
	recommendedFollowers.on('click', '.followers-div', function() {
		window.location = '/' + $(this).attr('data-userid');
	});
	
	return recommendedFollowers;
}



function Tweet(type='own', details={}, message='', timestamp='', replyto='', retweetedby='') {
	this.type = type;
	this.details = details;
	this.message = message;
	this.timestamp = timestamp;
	this.replyto = replyto;
	this.retweetedby = retweetedby;
}
Tweet.prototype.getType = function() {
	return this.type;
}
Tweet.prototype.getDetails = function() {
	return this.details;
}
Tweet.prototype.getMessage = function() {
	return this.message;
}
Tweet.prototype.getTimestamp = function() {
	return this.timestamp;
}
Tweet.prototype.getReplyTo = function() {
	return this.replyto;
}
Tweet.prototype.getRetweetedBy = function() {
	return this.retweetedby;
}
Tweet.prototype.getTweetElement = function() {
	var liElem = $('<li>').addClass("tweet");
	var tweetDiv = $('<div>').addClass("tweet-div");
	if (this.getType() === "retweet") {
		var tweetContextDiv = $('<div>').addClass("tweet-context");
		var spanContext = $('<span>').append(this.getRetweetedBy() + " retweeted");
		tweetContextDiv.append(spanContext);
		tweetDiv.append(tweetContextDiv);
	}
	var tweetContent = $('<div>').addClass("tweet-content");
	var tweetHeader = $('<div>').addClass("tweet-header");
	var tweetContentImg = $('<img>').addClass("tweet-content-img").attr('src', this.getDetails().getProfilePic());
	var tweeteName = $('<span>').addClass("tweete-name").append(this.getDetails().getName());
	var tweeteAlias = $('<span>').addClass("tweete-alias").append(this.getDetails().getAliasId());
	var tweeteSpacer = $('<span>').addClass("tweete-spacer").append(".");
	var tweeteTimestamp = $('<span>').addClass("tweete-timestamp").append(printDateInFormat(this.getTimestamp()));
	tweetHeader.append(tweetContentImg);
	tweetHeader.append(tweeteName);
	tweetHeader.append(tweeteAlias);
	tweetHeader.append(tweeteSpacer);
	tweetHeader.append(tweeteTimestamp);
	tweetContent.append(tweetHeader);
	if (this.getType() === "reply") {
		var tweetMeta = $('<div>').addClass("tweet-meta");
		var spanReply = $('<span>').append("Replying to " + this.getReplyTo());
		tweetMeta.append(spanReply);
		tweetContent.append(tweetMeta);
	}
	var tweetData = $('<div>').addClass("tweet-data");
	var pMessage = $('<p>').append(this.getMessage());
	tweetData.append(pMessage);
	tweetContent.append(tweetData);
	tweetDiv.append(tweetContent);
	liElem.append(tweetDiv);
	
	return liElem;
}




function TwitterPage(twitterUser={}, tweets=[]) {
	this.twitterUser = twitterUser;
	this.tweets = tweets;
}
TwitterPage.prototype.getTwitterUser = function() {
	return this.twitterUser;
}
TwitterPage.prototype.getTweets = function() {
	return this.tweets;
}
TwitterPage.prototype.getNumOfTweets = function() {
	return this.tweets.length;
}
TwitterPage.prototype.createModal = function() {
	if ($('#modal_box').length) {
		$('#modal_box').remove();
	}
	var modalBox = $('<div id="modal_box">').addClass("modal");
	var modalContent = $('<div>').addClass("modal-content");
	var modalHeader = $('<div>').addClass("modal-header");
	var spanClose = $('<span id="modal_close_button">').addClass("close").append("&times;");
	var h2header = $('<h3>').addClass("modal-header-class").append("Compose New Tweet");
	modalHeader.append(spanClose);
	modalHeader.append(h2header);
	var modalBody = $('<div>').addClass("modal-body");
	var textArea = $('<textarea id="tweet_area">').attr('name', 'textarea').attr('rows', '10').attr('cols', '77');
	modalBody.append(textArea);
	var modalFooter = $('<div>').addClass("modal-footer");
	var h3footer = $('<button id="compose_tweet_btn">').addClass("tweet-button tweet-button-default disabled");
	var buttonSpan = $('<span>').append("Tweet");
	h3footer.append(buttonSpan);
	modalFooter.append(h3footer);
	modalContent.append(modalHeader);
	modalContent.append(modalBody);
	modalContent.append(modalFooter);
	modalBox.append(modalContent);
	$('body').append(modalBox);
	
	$('#modal_close_button').on('click', function() {
		$('#modal_box').hide();
	});
	
	$('#tweet_area').on('keyup', function() {
		var text = $(this).val();
		if (text.length) {
			$('#compose_tweet_btn').removeClass("disabled");
		} else {
			$('#compose_tweet_btn').addClass("disabled");
		}
	});
	
	var self = this;
	$('#compose_tweet_btn').on('click', function() {
		var text = $('#tweet_area').val();
		var timestamp = new Date().toISOString();
		var id = self.getTwitterUser().getId();
		var name = self.getTwitterUser().getName();
		var userid = self.getTwitterUser().getUserId();
		var aliasid = self.getTwitterUser().getAliasId();
		var profile_pic = self.getTwitterUser().getProfilePic();
		var replyto = '';
		var type = 'own';
		if (currentUser !== loggedInUser) {
			replyto = '@' + aliasid;
			type = 'reply';
		}
		var dataObj = {message: text, timestamp: timestamp, userid: userid, replyto: replyto, type: type};
		$.ajax({
			type: "POST",
			url: "/savetweet",
			data: JSON.stringify(dataObj),
			contentType: "application/json; charset=utf-8",
			success: function(result){
			    var tempUser = new User('11', 'Paritosh Das', 'paritoshdas', 'ParitoshDas', '../static/images/paritoshprofile.jpg');
				var tempTweet = new Tweet(type, tempUser, text, timestamp, replyto, '');
				var newLiElem = tempTweet.getTweetElement();
				$('#timelines_ol').prepend(newLiElem);
				$('#modal_box').hide();
			}
		});
	});
}
TwitterPage.prototype.attachEventHandlers = function() {
	if ($('#default_tweet_button').length) {
		$('#default_tweet_button').on('click', function() {
			$('#modal_box').show();
		});
	}
	
	$(window).on('click', function(event) {
		if (event.target.id === "modal_box") {
			$('#modal_box').hide();
		}
	});
	
	if ($('#tweet_button_otherusers').length) {
		$('#tweet_button_otherusers').on('click', function() {
			$('#modal_box').show();
		});
	}
}
TwitterPage.prototype.render = function() {
	$('#profile_background_img').attr('src', this.getTwitterUser().getBackgroundImg());
	$('#profile_avatar_img').attr('src', this.getTwitterUser().getProfilePic());
	
	$('#user_num_tweets').empty();
	$('#user_num_tweets').text(this.getNumOfTweets());
	$('#user_num_following').empty();
	$('#user_num_following').text(this.getTwitterUser().getNumberOfFollowing());
	$('#user_num_followers').empty();
	$('#user_num_followers').text(this.getTwitterUser().getNumberOfFollowers());
	
	$('#profile_side_name').empty();
	$('#profile_side_name').text(this.getTwitterUser().getName());
	$('#profile_side_aliasname').empty();
	$('#profile_side_aliasname').text("@" + this.getTwitterUser().getAliasId());
	$('#profile_side_description').empty();
	$('#profile_side_description').text(this.getTwitterUser().getDescription());
	$('#profile_side_location').empty();
	$('#profile_side_location').text(this.getTwitterUser().getLocation());
	$('#profile_side_join_date').empty();
	$('#profile_side_join_date').text("Joined " + printDateInDateAndMonth(this.getTwitterUser().getJoinedDate()));
	
	var recommendedFollowers = this.getTwitterUser().getFavoriteFollowersElements();
	$('#body_followers_div').append(recommendedFollowers);
	
	var olElem = $('#timelines_ol');
	var tweets = this.getTweets();
	var totalTweets = tweets.length;
	for (var j = 0; j < totalTweets; j++) {	
		var liTweetElem = tweets[j].getTweetElement();
		olElem.append(liTweetElem);
	}
	
	this.createModal();
	this.attachEventHandlers();
}
