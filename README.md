
<!-- 
<style>
@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}
</style> -->

<!-- navbar -->
<p align="center">
  <a href="#overview">README</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="docs/overview.md">Docs</a> •
  <a href="#license">License</a> •
  <a href="https://www.linkedin.com/in/david-chukwuemeka-870724289/">Linked in</a>
</p>


<!-- header -->
<p align="center">
  <img src="./public/kronosBanner.png" alt="Kronos Banner" width="100%" />
</p>


<p align="center">
 <h1 align='center'> Developer Productivity Guardian </h1>

<br>
 
 <!-- badges for license and status of project -->
<p align="center">
  <a href="https://creativecommons.org/licenses/by-nc/4.0/">
    <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=for-the-badge" alt="License: CC BY-NC 4.0">
  </a>
  <img src="https://img.shields.io/badge/Status-Work%20in%20Progress-orange?style=for-the-badge" alt="Project Status">
</p>

</p>

<!-- about -->
<br>
<br>

# About
Kronos is a developer productivity guardian for GitHub. It uses schedued tasks (cron-jobs) to collect activity metrics - commits, pull requests, lines of code, coding patterns, and module focus - and leverages AI via an LLM to generate text insights and visualizations. Kronos helps developers spot patterns, bottlenecks, and actionable ways to work smarter.

<br>
<br>

# Features

- **Authentication** - Secure sign-up and login with GitHub integration.  
- **Activity Metrics Tracking** - Automatically track commits, pull requests, lines of code, coding patterns, and module focus.  
- **Scheduled Data Collection** - Cron-jobs fetch GitHub metrics periodically for up-to-date analysis.  
- **AI-Driven Insights** - Use an LLM to generate text summaries highlighting productivity trends and bottlenecks.  
- **Visualizations** - Interactive charts display activity trends and module focus for easy analysis.  
- **Actionable Suggestions** - Receive recommendations to optimize workflow and improve development efficiency.

<br>
<br>
<br>

# Tech Stack
<!-- stack group 1 -->
![React](https://img.shields.io/badge/react-%2320232A.svg?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404D59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

<!-- stack group 2 -->
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DC382D.svg?style=for-the-badge&logo=redis&logoColor=white)
![JWT](https://img.shields.io/badge/jwt-%23F7DF1E.svg?style=for-the-badge&logo=jwt&logoColor=black)

<!-- stack group 3 -->
![Tailwind](https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%236646FF.svg?style=for-the-badge&logo=vite&logoColor=white)


<br>
<br>
<br>

# Demo

**Check out Kronos in action:**

<div align="center" style="width:full; height:225px; border:1px solid #cccccc20; display:flex; align-items:center; justify-content:center; border-radius:4px;background-color:#00000020">
  <p style="font-size:18px; font-weight:bold; animation: pulse 2s infinite;">Coming Soon</p>
</div>




<!-- [![Kronos Demo](./public/demoThumbnail.png)](./public/kronosDemo.mp4) -->
<!-- *Click the image to play the demo video.* -->


<br>
<br>
<br>

# Installation

Follow these steps to run Kronos locally:

## 1. Clone the repository
```bash
git clone https://github.com/yourusername/kronos.git
cd kronos
 ```
 

## 2. Install dependencies

### Backend

```bash
cd backend
npm install
```


### Frontend

```bash
cd ../
npm install
```



## 3. Setup MongoDB Atlas Cluster

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
- Create a database (e.g., `kronos`) and a user with access to it.
- Copy the connection string and add it to your backend `.env` as `MONGO_URI`.

**See [here] (https://learn.mongodb.com/courses/getting-started-with-mongodb-atlas) for more information on setting up MongoDB Atlas Cluster**


## 4. Set up variables

### Backend Example

```ini
PORT=5000
MONGO_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Frontend example

```ini
VITE_BACKEND_URL=http://localhost:5000
```

 <br>


## 5. Run the project

### Backend
```bash 
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

 <br>


## 6. Open in browser

Visit http://localhost:5173 to view Kronos.

**Make sure your GitHub OAuth app is configured properly for Oauth see** [Github's docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps).

<br>
<br>
<br>

# License
This project is licensed under the [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) License.

<br>
<br>
<br>

 # Docs
Full documentation coming soon [here](docs/overview.md).

