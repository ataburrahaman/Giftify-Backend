const { extend } = require('lodash');
const { concat } = require('lodash');
const Address = require('../../Schema/address/address');


const getAddressById = async (req, res, next) => {
	try {
		const address = await Address.findById(req.userId);
		if (!address) {
			const userAddress = new Address({
				_id: req.userId,
			});
			await userAddress.save();
			return res.json({ response: userAddress.addresses });
		}
		req.address = address;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getAddress = async (req, res) => {
	const { address } = req;
	try {
		res.json({ response: address.addresses });
	} catch {
		res.status(401).json({ response: error.message });
	}
};

const addAddress = async (req, res) => {
	const { address } = req;
	const { addAddress } = req.body;
	try {
		const updatedAddress = extend(address, {
			addresses: concat(address.addresses, addAddress),
		});
		await updatedAddress.save();
		res.json({ response: updatedAddress.addresses });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

const updateAddress = async (req, res) => {
	const { address } = req;
	const { addressId } = req.params;
	const { addressFromBody } = req.body;
	let updateAddress = address.addresses.id(addressId);
	updateAddress = extend(updateAddress, { ...addressFromBody });
	address.addresses = extend(address.addresses, { updateAddress });
	try {
		await address.save();
		res.json({ success: true, response: address });
	} catch (error) {
		res.json({ success: false, response: error.message });
	}
};

const deleteAddress = async (req, res) => {
	const { address } = req;
	const { addressId } = req.params;
	try {
		await address.addresses.id(addressId).remove();
		await address.save();
		res.json({ response: address.addresses });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

module.exports = {
	getAddress,
	addAddress,
	updateAddress,
	deleteAddress,
    getAddressById
};