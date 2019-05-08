'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
	categories() {
		return this.hasMany('App/Models/Category')
	}

	group() {
		return this.hasOne('App/Models/Group')
	}
}

module.exports = Group
