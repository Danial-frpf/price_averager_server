### Price Averager Server

NodeJs bot that returns average price of amazon searches.

## Setup

1. Download source code for server using link.
2. Open terminal in folder containing package.json.
3. Run command:

```
npm install
```

4. Run command:

```
npm run dev
```

5. Server runs on "http://localhost:5000".

## Note

1. Works only on amazon.com search pages.

## About

## Guidelines

1. To make a search send a get request to server.
2. Template "http://localhost:5000/<maxPage>/<search>".
3. <maxPage> is maximum pagination it will search.
4. <search> is the search string.
5. i.e "http://localhost:5000/3/Ram 32GB".
6. Returns json object {averagePrice, message}.

## Limitations:

1. Multi page bot cannot pass "are you human" check.
2. If there is "are you human" check the request fails.

## Tips:

1. Try to make the search as specific as possible.
2. "Pakistan cricket jersey 2022" rather than "cricket jersey".
3. Less number of pages means faster request.
