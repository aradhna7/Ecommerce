const express = require('express');

const router = express.Router();

const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {create, remove, update, read, list} = require('../controllers/category');
const {userById} = require('../controllers/user');
const {categoryById} = require('../controllers/category');


router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.get('/categories', list);


router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;