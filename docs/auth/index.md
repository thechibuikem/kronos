

> Part of Kronos -> Developer Productivity Guardian
# Auth OverView

## Introduction
The authentication system is a token based authentication system, leveraging JSON Web Tokens and follows best practices for security and user experience.

## The Tokens and Their Roles

### Access Token :
Lasts for 15 minutes, usualy sent with every API request in the Authentication header.
They grant imediate access to protected API routes.Minimizes damage if intercepted in case of a token hijacking. Its short lifespan makes it a less valuable target. 


### Refresh Token :
Lasts for 30 days, stored in the server-side cache (Redis) and an HTTP-Only Cookie to avoid interception from the front-end.
They are used only to obtain a new, valid Access Token after the old one expires. The long life provides a good user experience (30 days without re-login).

**To get more details regarding the Authentication System, check the various subsections of the docs in the list below**

<!-- navbar -->
<p >
  <a href="#overview">Index</a> <br>
  <a href="login.md">Log in</a> <br>
  <a href="signup.md">Sign up</a> <br>
  <a href="protectedRoutes.md">Protected routes</a> <br>
  <a href="axiosInterceptor.md">Axios interceptor</a> <br>
  <a href="refreshTokenSystem.md">Refresh tokens system</a> <br>
  <a href="authMiddleware.md">Auth MiddleWare</a> <br>
  <a href="validateToken.md">Validate token</a> <br>
  <a href="../comingSoon.md"> Oauth</a> <br>

</p>