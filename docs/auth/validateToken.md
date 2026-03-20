> Part of Kronos -> Developer Productivity Guardian


# Validate Token

## About
Basically this is a route gated by a middle ware, we use to check the validity of our access-tokens stored in our redux state

<br>

### Code Preview 

```js
//protected routes
router.use(authMiddleware)
router.post("/validate-token",
   (req, res) => {res.json({ valid: true, user: req.user })   
  });
  ```
