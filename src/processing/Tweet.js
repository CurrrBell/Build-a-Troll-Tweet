class Tweet{
    constructor(jsonRow){
        this.userId = jsonRow.user_id;
        this.createdAt = jsonRow.created_at;
        this.retweeted = this.checkForNull(jsonRow.retweeted, 'boolean');
        this.retweetCount = this.checkForNull(jsonRow.retweet_count, 'number');
        this.favoriteCount = this.checkForNull(jsonRow.favorite_count, 'number');
        this.text = jsonRow.text;
        this.source = this.checkForNull(jsonRow.source);
        this.hashtags = this.checkForNull(jsonRow.hashtags);
        this.mentions = this.checkForNull(jsonRow.mentions);
        this.urls = this.checkForNull(jsonRow.expanded_urls);      
    }

    getEngagement(){ 
        return this.retweet_count + this.favorite_count;
    }

    checkForNull(field, type = 'object'){
        switch (type){
            case 'number':
                return field === '' ? 0 : parseInt(field);
            case 'boolean':
                return field === '' ? false : field === 'true';
            case 'object':
                return field === '' || field === '[]' ? undefined : field;
        }
    }
}

export default Tweet;