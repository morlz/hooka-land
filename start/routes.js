'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
	return { greeting: 'Hello world in JSON' }
})


Route.group(() => {
	Route.get('/products', 'ProductController.index')
	Route.get('/products/:id', 'ProductController.view')
	Route.get('/groups', 'GroupController.index')
	Route.get('/categories', 'CategoryController.index')
	Route.get('/categories/:id', 'CategoryController.view')

	Route.post('/login', 'UserController.login')
})
.middleware(['guest'])

Route.group(() => {
	Route.post('/products', 'ProductController.create')
	Route.put('/products/:id', 'ProductController.update')
	Route.delete('/products/:id', 'ProductController.remove')

	Route.post('/groups', 'GroupController.create')
	Route.put('/groups/:id', 'GroupController.update')
	Route.delete('/groups/:id', 'GroupController.remove')

	Route.post('/categories', 'CategoryController.create')
	Route.put('/categories/:id', 'CategoryController.update')
	Route.delete('/categories/:id', 'CategoryController.remove')
})
.middleware(['auth'])