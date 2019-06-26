import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from 'model/user/store'
import jwt from 'util/token'
import getNode from 'util/getNode'
import fileToBlob from 'util/fileToBlob'
import log from 'util/log'

class ProjectActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async addStyle() {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list.push({
      "title": "xxx",
      "date": "20xx-01-01",
      "img_list": [{
        "tl": "xxx",
        "url": "imgs/image.svg"
      }],
      "desc_list": ["xxx", "xxx"]
    })
  }

  @action
  async delStyle(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list.splice(id,1)
  }

  @action
  async updateStyle(id,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list[id][type] = val
  }

  @action
  async updateChildStyle(id,pid,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list[id].img_list[pid][type] = val
  }

  @action
  async updateDescStyle(id,pid,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list[id].desc_list[pid] = val
  }

  @action
  async addPic(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list[id].img_list.push({
      "tl": "xxx",
      "url": "imgs/image.svg"
    })
  }

  @action
  async delPic(id,pid) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list[id].img_list.splice(pid,1)
  }

  @action
  async addDesc(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list[id].desc_list.push("xxx")
  }

  @action
  async delDesc(id,pid) {
    let lang = this.store.cur
    this.store.user.langdb[lang].style.news_list[id].desc_list.splice(pid,1)
  }


  @action
  async uploadImg(file,id,pid,type) {
    let blob = await fileToBlob(file,600,300,0.35)
    let lang = this.store.cur
    let forms = new FormData()
    forms.append('file',blob,'upload.jpg')
    let r = await this.post(urls.API_UPLOAD_IMG, forms, true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.user.langdb[lang].style.news_list[id].img_list[pid][type] = r.data
      })
    }
    return r
  }

}

export default new ProjectActions(store)