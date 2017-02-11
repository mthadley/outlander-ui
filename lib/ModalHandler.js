'use babel'

import {CompositeDisposable} from 'atom'

/**
 * Classname showing if a modal is currently visible
 * @type {string}
 */
export const CLASSNAME = 'outlander-visible-modal'

/**
 * Class responsible for updating a attribute on the main
 * atom workspace node indicating if a modal us currently open
 */
class ModalHandler {
  /**
   * Create a ModalHandler instance
   */
  constructor() {
    this._disposables = new CompositeDisposable()
    this._modals = []
    this._workspaceElement = atom.views.getView(atom.workspace)

    if (this._workspaceElement) {
      this._handleNewModals()
      this._checkModals()
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
        this._updateModalStatus(panel.visible)

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
   * Updates the modal status by setting the attribute on the
   * main atom workspace
   * @param {boolean}
   */
  _updateModalStatus(next) {
    if (next && this._shouldShow()) {
      this._workspaceElement.classList.add(CLASSNAME)
    } else {
      this._workspaceElement.classList.remove(CLASSNAME)
    }
  }

  /**
   * Whether or not the blur effect should be shown
   * @return {boolean}
   */
  _shouldShow() {
    return atom.config.get('outlander-ui.showBlur')
  }

  /**
   * Destroys the ModalHandler instance
   */
  destroy() {
    this._disposables.dispose()
  }
}

export default ModalHandler
