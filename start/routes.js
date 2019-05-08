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

Route.get('/products', 'ProductController.index')
Route.get('/products/:id', 'ProductController.view')
Route.post('/products', 'ProductController.create')
Route.put('/products/:id', 'ProductController.update')
Route.delete('/products/:id', 'ProductController.remove')

Route.get('/groups', 'GroupController.index')
Route.post('/groups', 'GroupController.create')
Route.put('/groups/:id', 'GroupController.update')
Route.delete('/groups/:id', 'GroupController.remove')

Route.get('/categories', 'CategoryController.index')
Route.get('/categories/:id', 'CategoryController.view')
Route.post('/categories', 'CategoryController.create')
Route.put('/categories/:id', 'CategoryController.update')
Route.delete('/categories/:id', 'CategoryController.remove')