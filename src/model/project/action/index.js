import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from 'model/user/store'
import jwt from 'util/token'
import getNode from 'util/getNode'
import log from 'util/log'

class ProjectActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async addProject() {
    let lang = this.store.cur
    this.store.user.langdb[lang].achieve.list.push({
      "title": "xxx",
      "tl1": "システム概要",
      "vl1": "xxx",
      "tl2": "開発規模",
      "vl2": "<span>xxx</span>",
      "tl3": "作業内容",
      "vl3": "xxx",
      "tl4": "開発環境",
      "vl4": "<span class='m-os'>xxx</span>"
    })
  }

  @action
  async delProject(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].achieve.list.splice(id,1)
  }

  @action
  async updateProject(id,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].achieve.list[id][type] = val
  }

  @action
  async addElement(id,type,val,cls) {
    let lang = this.store.cur
    this.store.user.langdb[lang].achieve.list[id][type] += `<span class='${cls}'>${val}</span>`
  }

  @action
  async delElement(id,eid,type) {
    let lang = this.store.cur
    let val = this.store.user.langdb[lang].achieve.list[id][type]
    let nodes = getNode(val);
    let data = []
    let html = []
    for(var i=0;i<nodes.length;i++) {
      data.push({val:nodes[i].innerText, cls:`${nodes[i].className}`})
    }
    data.splice(eid,1)
    for(var i=0;i<data.length;i++) {
      html.push(`<span class='${data[i].cls}'>${data[i].val}</span>`)
    }
    html = html.join('')
    this.store.user.langdb[lang].achieve.list[id][type] = html
  }

}

export default new ProjectActions(store)