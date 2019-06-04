const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
	async signIn ({ request, auth }) {
		const { email, password } = request.all()

		const token = await auth.attempt(email, password)

		const user = await User.find(1)

		return {
			user,
			token
		}
	}
}

module.exports = UserController