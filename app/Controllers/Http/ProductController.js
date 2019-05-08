const Product = use('App/Models/Product')

class ProductController {
	async index({ request, response }) {
		const products = await Product.all()

		return response.json(products)
	}

	async view({ request, response }) {
		try {
			const product = await Product.findOrFail(request.params.id)

			return response.json(product)
		} catch (err) {
			console.error(err)

			if (err.code === 'E_MISSING_DATABASE_ROW') {
				return response
					.status(404)
					.json({ message: 'Product not found' })
			} else {
				return response
					.status(500)
					.json({ message: 'Internal server error' })
			}
		}
	}

	async create({ request, response }) {
		const productInfo = request.only([
			'name',
			'description',
			'price',
			'category_id',
			'price',
			'count',
			'unit',
			'img'
		])



		if (productInfo.name === '')
			return response
				.status(400)
				.json({ message: 'Name should not be empty' })

		const product = new Product()

		product.merge(productInfo)

		try {
			await product.save()
		} catch (err) {
			console.error(err)

			return response
				.status(500)
				.json({ message: 'Error while saving product' })
		}

		return response
			.status(201)
			.json(product)
	}

	async update({ request, response }) {
		const productInfo = request.only([
			'name',
			'description',
			'price',
			'category_id',
			'price',
			'count',
			'unit',
			'img'
		])

		if (productInfo.name === '')
			return response
				.status(400)
				.json({ message: 'Name should not be empty' })

		try {
			var product = await Product.find(request.params.id)
		} catch (err) {
			console.error(err)

			if (err.code === 'E_MISSING_DATABASE_ROW') {
				return response
					.status(404)
					.json({ message: 'Product not found' })
			} else {
				return response
					.status(500)
					.json({ message: 'Internal server error' })
			}
		}

		product.merge(productInfo)

		try {
			await product.save()
			await product.reload()
		} catch (err) {
			console.error(err)

			return response
				.status(500)
				.json({ message: 'Error while saving product' })
		}

		return response
			.status(201)
			.json(product)
	}

	async remove({ request, response }) {
		try {
			var product = await Product.find(request.params.id)
		} catch (err) {
			console.error(err)

			if (err.code === 'E_MISSING_DATABASE_ROW') {
				return response
					.status(404)
					.json({ message: 'Product not found' })
			} else {
				return response
					.status(500)
					.json({ message: 'Internal server error' })
			}
		}

		try {
			await product.delete()
			return response
				.status(200)
				.json(product)
		} catch (err) {
			return response
				.status(500)
				.json({ message: 'Error while deleting product' })
		}
	}
}

module.exports = ProductController
