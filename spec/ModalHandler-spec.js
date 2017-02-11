'use babel'

import ModalHandler, {CLASSNAME} from '../lib/ModalHandler'

describe('ModalHandler', () => {
  let modalHandler

  beforeEach(() => {
    modalHandler = new ModalHandler()
    expect(modalHandler).toBeTruthy()
  })

  afterEach(() => {
    modalHandler.destroy()
  })

  it('should not add the class by default', () => {
    const workspaceElement = atom.views.getView(atom.workspace)
    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(false)
  })

  it('should add attribute with value of true when a modal is open', () => {
    atom.config.set('outlander-ui.showBlur', true)

    const workspaceElement = atom.views.getView(atom.workspace)
    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(false)

    const testModal = atom.workspace.addModalPanel({item: document.createElement('div')})

    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(true)
    testModal.destroy()
    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(false)
  })

  it('should not add attribute if setting is disabled', () => {
    atom.config.set('outlander-ui.showBlur', false)

    const workspaceElement = atom.views.getView(atom.workspace)
    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(false)

    const testModal = atom.workspace.addModalPanel({item: document.createElement('div')})

    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(false)
  })

  it('should not add class when the new panel is not visible', () => {
    atom.config.set('outlander-ui.showBlur', true)

    const workspaceElement = atom.views.getView(atom.workspace)
    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(false)

    const testModal = atom.workspace.addModalPanel({
      item: document.createElement('div'),
      visible: false
    })

    expect(workspaceElement.classList.contains(CLASSNAME)).toBe(false)
  })
})
