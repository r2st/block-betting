const express = require('express');
const router = express.Router();
const { readContractData } = require('../../contract/index');

router.get('/', readContractData);

module.exports = router;