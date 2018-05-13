class Word{
    constructor(text, tweet){
        this.text = text;
        this.sourceTweets = [tweet];
        this.totalUses = 1;
    }

    addSourceTweet(tweet){
        //don't add to tweet list if used multiple times in a tweet
        if(!this.sourceTweets.includes(tweet)){
            this.sourceTweets.push(tweet);
        }
        
        this.totalUses++;
    }

    getNetEngagementScore(){
        let totalEngagementScore = 0;
        this.sourceTweets.forEach((tweet) => {
            totalEngagementScore += tweet.getEngagementScore();
        })

        return totalEngagementScore / this.totalUses;
    }
}

export default Word;