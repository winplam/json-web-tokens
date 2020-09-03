### Tutorial: [JSON Web Tokens (JWTs) in Express.js](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)
To start, run:

```nodemon index.js```

#### Generate access token
curl -X POST -H "Content-Type:application/json" http://localhost:3000/api/createNewUser -d '{"username": "slimshady"}'

### Authenticating access token
TOKEN=
TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNsaW1zaGFkeSIsImlhdCI6MTU5OTA5NDc3OSwiZXhwIjoxNTk5MDk2NTc5fQ.YnUFEpnPvC-W39KLtNhhbwUouZeYd8bqsyCUa8FKTMs
echo $TOKEN
curl -i http://localhost:3000/api/userOrders -H "Authorization:Bearer ${TOKEN}"
curl -i http://localhost:3000/api/userOrders -H "Authorization:Bearer ${TOKEN}"  -d '{"user": "slimshady"}'

### Client-Side Token Handling Using Cookies
// get token from fetch request
const token = await res.json();

// set token in cookie
document.cookie = `token=${token}`

### Client-Side Token Handling Using sessionStorage / localStorage
const token = await res.json();
localStorage.setItem('token', token);
