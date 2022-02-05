const express = require("express");
const {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressById
} = require("../../Controllers/address/address");

const router = express.Router();

router.get("/", getAddressById, getAddress);
router.post("/", getAddressById, addAddress);
router.post("/:addressId", getAddressById, updateAddress);
router.delete("/:addressId", getAddressById, deleteAddress);

module.exports = router;
