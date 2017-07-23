$(function(){
	var id = twitterData.id;
	var name = twitterData.name;
	var userid = twitterData.userid;
	var aliasid = twitterData.aliasid;
	var profile_pic = twitterData.profile_pic;
	var description = twitterData.description;
	var location = twitterData.location;
	var joined = twitterData.joined;
	var following = twitterData.following;
	var followers = twitterData.followers;
	var background_img = twitterData.background_img;
	var favorite_followers = twitterData.favorite_followers;
	var tweets = twitterData.tweets;

    var currentTwitterUser = new TwitterUser(id, name, userid, aliasid, profile_pic, description, location, joined, following, followers, background_img, favorite_followers);
	
	var currentTweets = [];
	for (var i = 0; i < tweets.length; i++) {
		var obj = tweets[i]["details"];
		var detailObj = new User(obj.id, obj.name, obj.userid, obj.aliasid, obj.profile_pic);
		var tweet = new Tweet(tweets[i]["type"], detailObj, tweets[i]["messsage"], tweets[i]["timestamp"], tweets[i]["replyto"], tweets[i]["retweetedby"]);
		currentTweets.push(tweet);
	}
	
	var currentTwitterPage = new TwitterPage(currentTwitterUser, currentTweets);
	currentTwitterPage.render();
});