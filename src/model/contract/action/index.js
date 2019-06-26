import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from 'model/user/store'
import jwt from 'util/token'
import getNode from 'util/getNode'
import log from 'util/log'

class ContractActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async addAccess(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].access.map_list[id].access_list.push("xxx")
  }

  @action
  async updateContract(id,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].access.map_list[id][type] = val
  }

  @action
  async updateChildContract(id,pid,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].access.map_list[id].access_list[pid] = val
  }


  @action
  async delContract(id,pid) {
    let lang = this.store.cur
    this.store.user.langdb[lang].access.map_list[id].access_list.splice(pid,1)
  }

}

export default new ContractActions(store)