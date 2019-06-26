import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,DatePicker } from 'antd';
import getNode from 'util/getNode'
import './index.less'
import { message } from 'antd'
import log from 'util/log'
import moment from 'moment'
import * as urls from 'constant/urls'

@inject('styleActions', 'userStore')
@observer
class Style extends React.Component {

  constructor(props) {
    super(props)
    this.actions = props.styleActions
    this.store = props.userStore
  }

  handleAdd = () => {
    this.actions.addStyle()
  }

  handleDel = (e) => {
    var id = e.currentTarget.id
    this.actions.delStyle(id)
  }

  changeVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var val  = e.target.value
    var type = e.target.attributes['data-type'].value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateStyle(id,type,val)
  }

  changeChildVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var pid  = e.target.attributes['data-pid'].value
    var val  = e.target.value
    var type = e.target.attributes['data-type'].value
    // console.log(`${id} - ${pid} - ${type} - ${val}`)
    this.actions.updateChildStyle(id,pid,type,val)
  }

  changeDescVal= (e) => {
    var id   = e.target.attributes['data-id'].value
    var pid  = e.target.attributes['data-pid'].value
    var val  = e.target.value
    // console.log(`${id} - ${pid} - ${val}`)
    this.actions.updateDescStyle(id,pid,val)
  }

  addPic =(e)=>{
    var id   = e.target.attributes['data-id'].value
    this.actions.addPic(id)
  }

  delPic =(e)=>{
    var id   = e.target.attributes['data-id'].value
    var pid  = e.target.attributes['data-pid'].value
    this.actions.delPic(id,pid)
  }

  addDesc =(e)=>{
    var id   = e.target.attributes['data-id'].value
    this.actions.addDesc(id)
  }

  delDesc =(e)=>{
    var id   = e.target.attributes['data-id'].value
    var pid  = e.target.attributes['data-pid'].value
    this.actions.delDesc(id,pid)
  }

  upload = async(e) => {
    if (e.currentTarget.files.length < 1) return;
    var id   = e.currentTarget.attributes['data-id'].value
    var pid  = e.target.attributes['data-pid'].value
    var type = e.currentTarget.attributes['data-type'].value
    // console.log(`${id} - ${pid} - ${type}`)
    var file = e.currentTarget.files[0]
    let r = await this.actions.uploadImg(file,id,pid,type)
  }

  render() {

    var cur = this.store.cur
    var user = JSON.parse(JSON.stringify(this.store.user))
    var list = getValue(user, `langdb.${cur}.style.news_list`, '')
    var pre = urls.HOST_IMG
    list = (list=='')?[]:list
    // log(list)

    return (
      <div className='g-style'>
        {list.map((e,i)=>{
          return (
            <div className="m-style-item" key={i}>
              <div className="m-del" id={i} onClick={this.handleDel}></div>
              <div className="m-style-title">
                <Input type="text" data-type="title" data-id={i} value={e.title} onChange={this.changeVal}/>
                <Input type="text" data-type="date"  data-id={i} value={e.date}  onChange={this.changeVal}/>
                <button className="m-add" data-id={i} onClick={this.addPic}>PIC</button>
                <button className="m-add" data-id={i} onClick={this.addDesc}>DESC</button>
              </div>
              <div className="m-style-list">
                {e.img_list.map((m,j)=>{
                  return(
                    <div className="m-style-pic" key={j}>
                      <i className="m-pic-del" data-type="img_list" data-id={i} data-pid={j} onClick={this.delPic}></i>
                      <div className="m-wrap">
                        <input type="file" data-type="url" data-id={i} data-pid={j}className="m-upload" accept="image/*" onChange={this.upload}/>
                        <img src={pre+m.url} alt=""/>
                      </div>
                      <span>
                        <Input type="text" data-type="tl" value={m.tl} data-id={i} data-pid={j} onChange={this.changeChildVal}/>
                      </span>
                    </div>
                  )
                })}
                
              </div>
              <div className="m-style-content">
                {e.desc_list.map((n,k)=>{
                  return(
                    <span key={k}>
                      <i className="m-pic-del m-desc-del"     data-id={i} data-pid={k} onClick ={this.delDesc}></i>
                      <Input type="text" value={n} data-id={i} data-pid={k} onChange={this.changeDescVal}/>
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
        <div className="m-style-item">
          <div className="m-style-add" onClick={this.handleAdd}></div>
        </div>
      </div>
    )
  }
}

export default Style