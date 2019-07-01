import { action, runInAction, toJS } from 'mobx'
import BaseActions from 'component/BaseActions'
import * as urls from 'constant/urls'
import store from 'model/user/store'
import jwt from 'util/token'
import fileToBlob from 'util/fileToBlob'

class UserActions extends BaseActions {
  constructor(store) {
    super()
    this.store = store
  }

  @action
  async addCarl() {
    let lang = this.store.cur
    this.store.user.langdb[lang].home_carousels.push({
      imgw: "imgs/image.svg",
      imgm: "imgs/image.svg",
      title: "",
      desc: ""
    })
  }

  @action
  async delCarl(id) {
    let lang = this.store.cur
    this.store.user.langdb[lang].home_carousels.splice(id,1)
  }

  @action
  async updateCarl(id,type,val) {
    let lang = this.store.cur
    this.store.user.langdb[lang].home_carousels[id][type] = val
  }

  @action
  async uploadImg(file,id,type) {
    let config = { w:0, h:0, p: 0.35 }
    if ( type === 'imgw') {
      config.w = 1920
      config.h = 1080
    }else{
      config.w = 1080
      config.h = 1080
    }

    let blob = await fileToBlob(file,config.w,config.h,config.p)
    let lang = this.store.cur
    let forms = new FormData()
    forms.append('file',blob,'upload.jpg')
    let r = await this.post(urls.API_UPLOAD_IMG, forms, true)
    if (r && r.code === 200) {
      runInAction(() => {
        this.store.user.langdb[lang].home_carousels[id][type] = r.data
      })
    }
    return r
  }



}

export default new UserActions(store)