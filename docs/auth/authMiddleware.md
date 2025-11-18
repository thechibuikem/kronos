> Part of Kronos -> Developer Productivity Guardian


# AUTH MIDDLEWARE

<br>

## Retrieve Auth Header

<br>


```jsx
  // 1. Access the header
  const authHeader = req.headers.authorization;
```

<br>


## Check it auth header is present?

<!-- <br> -->

- No

```jsx
  //2. Check if auth Header is absent
  if (!authHeader) {
    console.log("No token provided at AuthMiddleWare")
    return res.status(401).json({error:"No token in header at authMiddle-ware"});
  }
```

- Yes - Parse token then verfy jwt

```jsx
  //. If authHeader starts with the Bearer we set access the authToken
  if (authHeader.startsWith("Bearer ")){
    
    const token = authHeader.substring(7);//"Strings after the first 7 characters i.e Bearer + White space"

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Token expired or invalid" });
```

<br>


## Allow passage of next route or operation
<br>


```jsx
  next();
```