import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from 'model/user/store'
import jwt from 'util/token'
import getNode from 'util/getNode'
import log from 'util/log'

class JobActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async updateVal(id,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part1_item[id][type] = val
  }

  @action
  async updateChildVal(id,pid,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part1_item[id][type][pid] = val
  }

  @action
  async updateQualVal(id,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part2_item[id] = val
  }

  @action
  async updateGiveVal(id,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part3_list[id][type] = val
  }

  

  @action
  async addQual() {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part2_item.push("xxx")
  }

  @action
  async addType() {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part1_item.push({
      "label": "xxx xx名",
      "list": ["xxx", "xxx"]
    })
  }

  @action
  async delType(id,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part1_item.splice(id,1)
  }

  @action
  async delQual(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part2_item.splice(id,1)
  }


  @action
  async addTypeChild(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part1_item[id].list.push("xxx")
  }

  @action
  async delTypeChild(id,pid) {
    let lang = this.store.cur
    this.store.user.langdb[lang].careers.part1_item[id].list.splice(pid,1)
  }

}

export default new JobActions(store)