# build-a-troll-tweet

# What is this?
Build a Troll Tweet is a React Redux application that allows you to make your own Russian troll tweet word by word!

# But how?
Using over 200,000 tweets from confirmed Russian trolls, Build a Troll Tweet (which really needs a better name) will suggest words for you to compose your own tweet. Nowhere else can aspiring trolls like yourself leverage the power of seasoned, Kremlin-trained tweeters. Think of the elections you could meddle with!

# Okay, how do I start?

The tweets.csv file from https://www.kaggle.com/vikasg/russian-troll-tweets/data was too big for github so it will need to be added manually to the root directory of this repo.

I wasn't able to get around to doing any sort of production build so it'll have to be run from a terminal:

```
npm install
npm start
```

and you should be good to go! Unfortunately, the application does take a substaintial amount of time ( ~ 1m) to load. It's building a rather large data structure in a background process so performance isn't great. Once it loads, though, you'll have the power of 200k troll tweets at your fingertips!
