import aqp from 'api-query-params'
import Joi from 'joi'

export const fetchOrderItemsHandler = async (req, res) => {
	try {
		const orderItems = req.db.collection('orderItems')
		let { filter, skip, limit, sort, projection, population } = aqp(req.query)
		console.log({ filter, skip, limit, sort, projection, population })
		if (!sort) {
			sort = { price: 1 }
		}
		if (filter.offset || filter.offset >= 0) {
			skip = Number(filter.offset)
			delete filter.offset
		} else {
			skip = 0
		}
		if (!limit) limit = 20

		if (limit && limit > 100) limit = 100
		console.log({ filter, skip, limit, sort, projection, population })
		const total = await orderItems.countDocuments(filter)
		const result = await orderItems.find(filter).skip(skip).sort(sort).limit(limit).toArray()
		res.status(200).json({
			success: true,
			message: 'Operation Successful',
			total,
			limit,
			offset: skip || 0,
			data: result
		})
	} catch (error) {
		console.error(error)
		res.status(400).json({
			success: false,
			message: error.message || 'An Error Occurred'
		})
	}
}

export const deleteOrderItemsHandler = async (req, res) => {
	try {
		const orderItems = req.db.collection('orderItems')

		const _id = req.params.id
		if (!_id) throw new Error('ID required in request parameter')
		const result = await orderItems.deleteMany({ _id })
		res.status(204).json({
		})
	} catch (error) {
		console.error(error)
		res.status(400).json({
			success: false,
			message: error.message || 'An Error Occurred'
		})
	}
}

const validateSellerUpdateData = Joi.object({
	seller_city: Joi.string().trim().optional(),
	seller_state: Joi.string().trim().optional()
}).xor('seller_city', 'seller_state')

export const updateSellerAccountHandler = async (req, res) => {
	try {
		const sellers = req.db.collection('sellers')
		const data = req.body
		const { error } = validateSellerUpdateData.validate(data)
		if (error) throw new Error(error)
		await sellers.updateOne({ seller_id: req.user.seller_id },
			{ $set: { ...data } }, { new: true, returnOriginal: false })
		const result = await sellers.findOne({ seller_id: req.user.seller_id })
		if (!result) throw new Error('Error')
		res.status(200).json({
			success: true,
			data: result
		})
	} catch (error) {
		console.error(error)
		res.status(404).json({
			success: false,
			message: error.message || 'An Error Occurred'
		})
	}
}
