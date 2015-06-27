ModalHandler = require './ModalHandler'

module.exports =
	activate: (state) ->
		@modalHandler = new ModalHandler

	deactivate: ->
		@modalHandler.destroy()


