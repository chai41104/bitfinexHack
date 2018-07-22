# bitfinexHack

## INTRODUCTION

Zingzing Solution: 

We propose a health indicator:

1) to provide baseline statistical analysis for the Exchanger to 

a. Understand the "health" of the coins Bitfinex already engaged with, in enabling self-regulating and risk management aspects.

b. To review and assess whether a new Coin is "healthy" to be introduced to the Bitfinex platform, either to accept or reject or on "probation".

2) the "integrated" health indicator solution is based on several keys analysis as follows: 

a. Financial Analysis
b. Risk Analysis
c. Sentiment Analysis
d. Others

These analysis can be combined and customised for different entities (e.g. major <IOC> trading organisations, private investors, exchangers or individual). 

The idea is for Bitfinex to take the "leading role" and be the 1st Exchanger to engage in this model (Dapp or software) which can reshape the future ICO exchange or trading activity - towards a standardisation of health model, which can be packaged as a "defactor" case for current and future ICO exchangers.


### Statistics

According to EY, more than 80% ICO / cryptocurrencies are potentially scam related. 

Of the 20% remaining, 25% of a non-scam ICO startups die within 1st year. 71% within next 10yrs. The alarming figure could be reduced if early signs of problem can be detected for intervention (According to forbes)


## HOW TO RUN THE DEMO

The folders are structured as follows:

    express/ - contains the servers that stream bitfinix trading (server.js) and margin (margin_server.js) data
    hypercore/ - streams and aggregates hypercore data to the platform
    public/ - contains the theme used for demo purposes
    pydata_analysis/ - contains python script used to analyse volume and lending data
    vue - A Vue.js project that contains the tables used for
```

Run the trading and margin servers used for streaming data

```
cd express
npm install
node server.js
```

```
cd express
npm install
node margin_server.js
```

Run the vue.js application that interacts with the streaming data:

```
cd vue
npm install
npm run dev
```

