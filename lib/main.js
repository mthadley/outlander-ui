'use babel'

import ModalHandler from './ModalHandler'

export default {
  config: {
    showBlur: {
      default: true,
      description: 'Show a blur effect when modals are shown',
      title: 'Show Blur',
      type: 'boolean'
    }
  },

  activate() {
    this.modalHandler = new ModalHandler()
  },

  deactivate() {
    this.modalHandler.destroy()
  }
}
