const express = require("express");
const posts = require("../data/db.js");

const router = express.Router();

//          Setting up API
router.get("/", (req, res) => {
  posts
    .find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

// server.get("users", (req, res) => {});
// server.get("users/:id", (req, res) => {});
// server.post("users", (req, res) => {});
// server.put("users/:id", (req, res) => {});
// server.delete("users/:id", (req, res) => {});

//--------------------------------------------------------------------------
//          READ data
//--------------------------------------------------------------------------

// GET /api/posts     Returns an array of all the post objects contained in the database.
router.get("/api/posts", (req, res) => {
  posts
    .find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
});

// GET  /api/posts/:id  Returns the post object with the specified id.
router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the post",
      });
    });
});

// GET  /api/posts/:id/comments  Returns an array of all the comment objects associated with the post with the specified id.
router.get("api/posts/:id/comments", (req, res) => {
  posts
    .findCommentById(req.params.id)
    // .findPostComments(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the comments",
      });
    });
});

//--------------------------------------------------------------------------
//        CREATE data
//--------------------------------------------------------------------------

// POST  /api/posts  Creates a post using the information sent inside the `request body`.
router.post("api/id/posts", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Missing post id or comment id",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the post",
      });
    });
});

// POST    /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`.

router.post("/api/posts/:id/comments", (req, res) => {
  if (!req.body.post || !req.body.comment) {
    return res.status(400).json({
      message: "Missing post or comment text",
    });
  }

  posts
    .findPostComments(req.params.id)
    .insertComment(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the post",
      });
    });
});

//--------------------------------------------------------------------------
//           DELETE data
//--------------------------------------------------------------------------

// DELETE /api/posts/:id     Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.

router.delete("/api/posts/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The post has been removed",
        });
      } else {
        res.status(404).json({
          message: "The post could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the post",
      });
    });
});

//--------------------------------------------------------------------------
//              UPDATE data
//--------------------------------------------------------------------------

//  PUT   /api/posts/:id     Updates the post with the specified `id` using data from the `request body`.
router.put("/api/posts/:id", (req, res) => {
  if (!req.body.name || !req.body.id) {
    return res.status(400).json({
      message: "Missing post name or id",
    });
  }

  posts
    .update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post could not be found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the post",
      });
    });
});

module.exports = router;
