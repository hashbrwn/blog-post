DROP TABLE IF EXISTS Comments CASCADE;
CREATE TABLE Comments (
    CommentID INT PRIMARY KEY,
    CommentUserID INT,
    CommentPostID INT,
    Text TEXT NOT NULL,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CommentUserID) REFERENCES Users(Id),
    FOREIGN KEY (CommentPostID) REFERENCES BlogPosts(PostID)
);
