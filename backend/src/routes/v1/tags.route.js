const express = require('express');
const router = express.Router();


const { createTag, getAllTags,deleteTag } = require('../../controllers//tags.controller');

router.post('/createTag', createTag);
router.get('/getAllTags', getAllTags);
router.delete('/deleteTag/:id', deleteTag);

module.exports = router;