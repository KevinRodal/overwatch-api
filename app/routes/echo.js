const express = require('express');
const router = express.Router();

router.post('/json', (req, res) => {
	console.log('--- echo ---');
	console.log(req.body);
});

export default router;