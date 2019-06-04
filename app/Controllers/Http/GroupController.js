const Group = use('App/Models/Group')

class GroupController {
	async index ({ request, response }) {
		const groups = await Group
			.query()
			.with('categories')
			.fetch()

		return response.json(groups)
	}

	async create ({ request, response }) {
		console.log('req')
		const info = request.only([
			'name',
		])

		if (info.name === '')
			return response
				.status(400)
				.json({ message: 'Name should not be empty' })

		const group = new Group()

		group.merge(info)

		try {
			await group.save()
		} catch (err) {
			console.error(err)

			return response
				.status(500)
				.json({ message: 'Error while saving group' })
		}

		return response
			.status(201)
			.json(group)
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
			var group = await Group.find(request.params.id)
		} catch (err) {
			console.error(err)

			if (err.code === 'E_MISSING_DATABASE_ROW') {
				return response
					.status(404)
					.json({ message: 'Group not found' })
			} else {
				return response
					.status(500)
					.json({ message: 'Internal server error' })
			}
		}

		group.merge(info)

		try {
			await group.save()
			await group.reload()
		} catch (err) {
			console.error(err)

			return response
				.status(500)
				.json({ message: 'Error while saving group' })
		}

		return response
			.status(201)
			.json(group)
	}

	async remove ({ request, response }) {
		try {
			var group = await Group.find(request.params.id)
		} catch (err) {
			console.error(err)

			if (err.code === 'E_MISSING_DATABASE_ROW') {
				return response
					.status(404)
					.json({ message: 'Group not found' })
			} else {
				return response
					.status(500)
					.json({ message: 'Internal server error' })
			}
		}

		try {
			await group.delete()
			return response
				.status(200)
				.json(group)
		} catch (err) {
			return response
				.status(500)
				.json({ message: 'Error while deleting group' })
		}
	}
}

module.exports = GroupController
