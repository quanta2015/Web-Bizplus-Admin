import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from 'model/user/store'
import jwt from 'util/token'
import getNode from 'util/getNode'
import fileToBlob from 'util/fileToBlob'
import log from 'util/log'

class ConfigActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async updateConfig(type,val) {
    this.store.user.config.mail[type] = val
  }

}

export default new ConfigActions(store)