<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
</head>
<body>

<h1>Bookstore API</h1>

<h2 id="project-overview">Project Overview</h2>
<p>In this simple project, I have implemented authentication, MongoDB database implementation and CURD operations. User can register, login, add, edit, update and remove books in a library and are able to edit their user information. The backend is hosted by Render and the front end is hosted by Vercel. The project is publically available here: https://bookstore-api-git-main-timothyroybds-projects.vercel.app 
<strong>Please note that the backend engine is turned off to save money. If you are interested then I can turn it on</strong></p>

<h2 id="installation-instructions">Installation Instructions</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js</li>
  <li>npm</li>
</ul>

<h3>Clone the Repository</h3>
<pre><code>git clone https://github.com/timothyroybd/bookstore_api.git
cd bookstore_api/frontend
</code></pre>

<h3>Install Dependencies</h3>
<pre><code>npm install
</code></pre>

<h3>Environment Variables</h3>
<p>Create a <code>.env</code> file in the <code>frontend</code> directory and add the following:</p>
<pre><code>REACT_APP_API_BASE_URL=https://bookstore-api-n50c.onrender.com
</code></pre>

<h3>Run the Application</h3>
<pre><code>npm start
</code></pre>

<h2 id="usage-guide">Usage Guide</h2>
<p>To use the application, navigate to <code>http://localhost:3000</code> in your browser.</p>
<ul>
  <li><strong>Login</strong>: Enter your credentials to log in.</li>
  <li><strong>Browse Books</strong>: Explore the available book listings.</li>
  <li><strong>Search</strong>: Use the search bar to find specific books.</li>
</ul>

<h2 id="api-documentation">API Documentation</h2>

<h3>Endpoints</h3>
<ul>
  <li><strong>GET /api/books</strong>: Retrieve a list of books.</li>
  <li><strong>POST /api/auth/login</strong>: User login.</li>
</ul>

<h3>Request and Response Examples</h3>


<p><strong>POST /auth/login</strong></p>
<pre><code>{
  "email": "email",
  "password": "pass"
}
</code></pre>
<p><strong>POST /auth/signup</strong></p>
<pre><code>{
  "username": "username"
  "email": "email",
  "password": "pass"
}
</code></pre>


<h2 id="license">License</h2>
<p>This project is licensed under the MIT License.</p>

<h2 id="contact-information">Contact Information</h2>
<p>For inquiries, please contact Timothy Roy at timothyroy2011@gmail.com.</p>

</body>
</html>
