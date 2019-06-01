const Hash = use('Hash')

class UserController {
	async login ({ auth, request }) {
		const { email, password } = request.all()

		return await auth.attempt(email, password)
	}
}

module.exports = UserController