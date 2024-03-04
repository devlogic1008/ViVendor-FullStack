const express = require('express');
const router = express.Router();


const { createTag, getAllTags,deleteTag } = require('../../controllers/tags.controller');

router.get('/tags', getAllTags);
router.post('/tags', createTag);
router.delete('/tags/:id', deleteTag);

module.exports = router;