'use babel'

import ModalHandler from './ModalHandler'

export default {
  activate() {
    this.modalHandler = new ModalHandler()
  },

  deactivate() {
    this.modalHandler.destroy()
  }
}
