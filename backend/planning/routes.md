# Blog Posts
BROWSE
- GET /api/posts                    <!-- Retrieve a list of all published blog posts -->
READ
- GET /api/posts/:postId           <!-- Retrieve the full content of a specific blog post, including comments -->
CREATE
- POST /api/posts                  <!-- Create a new blog post -->
UPDATE
- PUT /api/posts/:postId           <!-- Edit an existing blog post -->
DELETE
- DELETE /api/posts/:postId        <!-- Delete an existing blog post -->

# User Authentication(users)
LOGIN
- POST /api/login                  <!-- Authenticate a user and generate a session token --> <!-- Done✅✅ -->
REGISTER
- POST /api/register               <!-- Register a new user account --> <!-- Done✅✅ -->