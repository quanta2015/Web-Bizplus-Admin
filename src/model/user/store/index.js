import { observable } from 'mobx'

class Store {
  @observable user = null
  @observable cur = 'jp'
}

export default new Store()