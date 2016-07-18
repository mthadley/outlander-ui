'use babel'

import {CompositeDisposable} from 'atom'

/**
 * Data attribute showing if a modal is currently visible
 * @type {string}
 */
const DATA_STATUS = 'outlander-visible-modal'

/**
 * Class responsible for updating a data attribute on the main
 * atom workspace node indicating if a modal us currently open
 */
class ModalHandler {
  /**
   * Create a ModalHandler instance
   */
  constructor() {
    this._disposables = new CompositeDisposable()
    this._modals = []
    this._workspaceNode = document.querySelector('atom-workspace')

    if (this._workspaceNode) {
      this._updateModalStatus(false)

      this._handleNewModals()
    }
  }

  /**
   * Bind event handlers for newly added Modals
   */
  _handleNewModals() {
    const modalContainer = atom.workspace.panelContainers.modal
    this._modals = modalContainer.panels

    this._disposables.add(
      modalContainer.onDidAddPanel(({panel}) => {
        this._updateModalStatus(true)

        this._disposables.add(
          panel.onDidChangeVisible(() => this._checkModals())
        )
      })
    )
  }

  /**
   * Checks if any modals are visible and updates the
   * current status
   */
  _checkModals() {
    this._updateModalStatus(this._modals.some(modal => modal.visible))
  }

  /**
   * Updates the modal status by setting the data attribute on the
   * main atom workspace
   * @param {boolean}
   */
  _updateModalStatus(next) {
    if (this._workspaceNode.getAttribute(DATA_STATUS) !== next) {
      this._workspaceNode.setAttribute(DATA_STATUS, next)
    }
  }

  /**
   * Destroys the ModalHandler instance
   */
  destroy() {
    this._disposables.dispose()
  }
}

export default ModalHandler
