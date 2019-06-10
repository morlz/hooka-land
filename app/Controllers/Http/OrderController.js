const nodemailer = require('nodemailer')
const Product = use('App/Models/Product')

const fromUser = {
	email: 'den404arra@gmail.com',
	pass: 'FL7sP4404'
}

const mailTransport = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: fromUser.email, // generated ethereal user
		pass: fromUser.pass // generated ethereal password
	}
})

const toUser = {
	email: 'mostmanchik@gmail.com',
}

const tpl = `
<!DOCTYPE html>
<html lang="en" dir="ltr">

<body>
    <div class="">
        <h1>Товар: { products }</h1>
        <h1>Имя: { name }</h1>
        <h1>Номер: { phone }</h1>
        <h1>Стоимость: { price } руб.</h1>
    </div>
</body>

</html>
`

function interpolate (str) {
	return function interpolate (o) {
		return str.replace(/{([^{}]*)}/g, function (a, b) {
			let r
			with (o) {
				r = eval(b)
			}
			return r
		});
	}
}

class OrderController {
	async create ({ request, response }) {
		const info = request.only([
			'name',
			'phone',
			'products'
		])

		if (!info.name || !info.phone)
			return response
				.status(400)
				.json({ message: 'Name and phone should not be empty' })

		const productIDs = info.products.reduce((acc, el) => {
			if (acc[el])
				acc[el]++
			else
				acc[el] = 1

			return acc
		}, {})

		const { rows } = await Product
			.query()
			.whereIn('id', Object.keys(productIDs))
			.fetch()

		const { price, productString } = rows.reduce((acc, el) => {
			acc.price += +el.price * +productIDs[el.id]
			if (acc.productString)
				acc.productString += ', '

			acc.productString += `${el.name} (${productIDs[el.id]})`

			return acc
		}, {
				price: 0,
				productString: ''
			})


		await mailTransport.sendMail({
			from: `"Hooka Land" <${fromUser.email}>`, // sender address
			to: toUser.email, // list of receivers
			subject: `${info.name} - Новый заказ`, // Subject line
			text: "Hello world?", // plain text body
			html: interpolate(tpl)({
				products: productString,
				name: info.name,
				phone: info.phone,
				price
			})
		})



		return response
			.status(200)
			.send('OK')
	}
}

module.exports = OrderController
