# build-a-troll-tweet

The tweets.csv file from https://www.kaggle.com/vikasg/russian-troll-tweets/data was too big for github so it will need to be added manually to the root directory of this repo.

I wasn't able to get around to doing any sort of production build so it'll have to be run from a terminal:

```
npm install
npm start
```

and you should be good to go! Unfortunately, the application does take a substaintial amount of time ( ~ 1m) to load. It's building a rather large data structure in a background process so performance isn't great. Once it loads, though, you'll have the power of 200k troll tweets at your fingertips!
