const Category = use('App/Models/Category')

class CategoryController {
	async index ({ request, response }) {
		const categorys = await Category.all()

		return response.json(categorys)
	}

	async view ({ request, response }) {
		try {
			const category = await Category
				.query()
				.where('id', request.params.id)
				.with('products')
				.fetch()

			return response.json(category)
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

	async create ({ request, response }) {
		const info = request.only([
			'name',
			'group_id'
		])

		if (info.name === '')
			return response
				.status(400)
				.json({ message: 'Name should not be empty' })

		const category = new Category()

		category.merge(info)

		try {
			await category.save()
		} catch (err) {
			console.error(err)

			return response
				.status(500)
				.json({ message: 'Error while saving category' })
		}

		return response
			.status(201)
			.json(category)
	}

	async update ({ request, response }) {
		const info = request.only([
			'name',
		])

		if (info.name === '')
			return response
				.status(400)
				.json({ message: 'Name should not be empty' })

		try {
			var category = await Category.find(request.params.id)
		} catch (err) {
			console.error(err)

			if (err.code === 'E_MISSING_DATABASE_ROW') {
				return response
					.status(404)
					.json({ message: 'Category not found' })
			} else {
				return response
					.status(500)
					.json({ message: 'Internal server error' })
			}
		}

		category.merge(info)

		try {
			await category.save()
			await category.reload()
		} catch (err) {
			console.error(err)

			return response
				.status(500)
				.json({ message: 'Error while saving category' })
		}

		return response
			.status(201)
			.json(category)
	}

	async remove ({ request, response }) {
		try {
			var category = await Category.find(request.params.id)
		} catch (err) {
			console.error(err)

			if (err.code === 'E_MISSING_DATABASE_ROW') {
				return response
					.status(404)
					.json({ message: 'Category not found' })
			} else {
				return response
					.status(500)
					.json({ message: 'Internal server error' })
			}
		}

		try {
			await category.delete()
			return response
				.status(200)
				.json(category)
		} catch (err) {
			return response
				.status(500)
				.json({ message: 'Error while deleting category' })
		}
	}
}

module.exports = CategoryController
