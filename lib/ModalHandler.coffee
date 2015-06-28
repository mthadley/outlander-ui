DATA_STATUS = 'outlander-visible-modal';

class ModalHandler
	visibleModal: false

	disposables: []

	constructor: ->
		workspace = document.querySelector('atom-workspace')

		if workspace
			@workspace = workspace
			@toggleOverlayStatus()

			modalContainer = atom.workspace.panelContainers.modal
			@modals = modalContainer.panels

			modalContainer.onDidAddPanel (panel) =>
				modal = panel.panel

				@visibleModal = true
				@toggleOverlayStatus()

				@disposables.push modal.onDidChangeVisible => @checkModals()

	checkModals: ->
		visibleModal = false

		for modal in @modals
			if modal.visible
				visibleModal = true
				break

		@visibleModal = visibleModal
		@toggleOverlayStatus()

	toggleOverlayStatus: ->
		modalStatus = @workspace.getAttribute DATA_STATUS

		if modalStatus isnt @visibleModal
			@workspace.setAttribute DATA_STATUS, @visibleModal

	destroy: ->
		disposable.dispose() for disposoable in @disposables

module.exports = ModalHandler