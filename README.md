# By-Bits

### Assumptions:

- Policy data is sensitive so do not want to be logged in indefinitely
- Do not want to expose access_token to the browser

### Decisions:

- Create a server so that access_token is not available to browser side code to avoid XSS vulnerabilities
- Store access_token in a cookie instead of browser local storage
- Give the cookie a maxAge of 15 minutes
- Give cookie sameSite 'Strict' and secure attributes to increase protection from CSRF attacks

### Estimated time spent

- Research: 3 hours
- Build: 3 hours

# Getting Started

1. Clone the repo

```
git clone https://github.com/Matt-Hurst/By-Bits.git
cd By-Bits
```

2. Install dependecies in root, client, and server

```
Root:
npm install
Client:
cd client
npm install
Server:
cd server
npm install
```

3. Start server

```
cd server
node index.js
```

4. Start client

```
cd client
npm start
```
