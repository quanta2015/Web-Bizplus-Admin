import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from 'model/user/store'
import jwt from 'util/token'
import getNode from 'util/getNode'
import log from 'util/log'

class EduActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async updateVal(id,pid,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].edu.table_list[id].clist[pid] = val
  }

}

export default new EduActions(store)