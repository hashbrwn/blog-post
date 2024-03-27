
# User Authentication(users)
LOGIN
- POST /api/login                  <!-- Authenticate a user and generate a session token --> <!-- Done✅✅ -->
REGISTER
- POST /api/register               <!-- Register a new user account --> <!-- Done✅✅ -->

# Blog Posts
BROWSE
- GET /api/posts                    <!-- Retrieve a list of all published blog posts --> <!-- Done✅✅ -->
READ
- GET /api/posts/:postId           <!-- Retrieve the full content of a specific blog post, including comments -->
CREATE
- POST /api/posts                  <!-- Create a new blog post --> <!-- Done✅✅ -->
UPDATE
- PUT /api/posts/:postId           <!-- Edit an existing blog post --> <!-- Done✅✅ -->
DELETE
- DELETE /api/posts/:postId        <!-- Delete an existing blog post --> <!-- Done✅✅ -->

# Comments 
# Blog Posts
BROWSE
- GET /api/comments/:postId            <!-- Retrieve a list of all published blog posts --> <!-- Done✅✅ -->
READ
- GET /api/comment/:postId                <!-- Retrieve a specific comment>
CREATE
- POST /api/createComment              <!-- Create a new comment --> <!-- Done✅✅ -->
UPDATE
- PUT /api/comments/:commentId/update    <!-- Edit an existing comment --> <!-- Done✅✅ -->
DELETE
- DELETE /api/comments/:commentId/delete  <!-- Delete an existing comments --> <!-- Done✅✅ -->


# For testing purposes

# register newUser
curl -X POST   -H "Content-Type: application/json"   -d '{"userName":"Testing1", "email":"testing1@example.com", "password":"123456"}'   http://localhost:8080/users/register
