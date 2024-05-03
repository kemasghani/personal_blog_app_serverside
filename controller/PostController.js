const multer = require('multer');
const path = require('path');
const { Post, User } = require('../models'); // Assuming your model file is in the 'models' directory

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Save uploads to 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});

const upload = multer({ storage });

// Create a new post with image upload
exports.createPost = async (req, res) => {
    try {
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading image:', err);
                return res.status(400).json({ error: 'Error uploading image' });
            }

            if (!req.file) {
                console.error('No file uploaded');
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const { title, content, category, user_id } = req.body;
            const image = req.file.filename; // Multer stores uploaded file details in req.file
            const post = await Post.create({ title, content, category, user_id, image });
            res.status(201).json(post);
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Error creating post' });
    }
};


// Get all posts with associated username
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                as: 'author',
                attributes: ['username'] // Include only the username attribute
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
};


// Get a single post by ID
exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id, {
            include: {
                model: User,
                as: 'author',
                attributes: ['username'] // Include only the username attribute
            }
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Error fetching post' });
    }
};

// Get posts by user ID
exports.getPostsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Post.findAll({
            where: { user_id: userId }, // Filter posts by user_id
            include: {
                model: User,
                as: 'author',
                attributes: ['username'] // Include only the username attribute
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts by user ID:', error);
        res.status(500).json({ error: 'Error fetching posts by user ID' });
    }
};


// Update a post without changing the image
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const { title, content, category } = req.body;
        const updatedData = { title, content, category };

        const updatedPost = await Post.findByPk(id); // Use 'Post' instead of 'Posts'
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Update post data
        await updatedPost.update(updatedData);

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Error updating post' });
    }
};


// Delete a post
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Post.destroy({ where: { id } }); // Use 'Post' instead of 'Posts'
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(204).end(); // No content
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error deleting post' });
    }
};
