import React from 'react'
import { observer, inject } from 'mobx-react'
import './index.less'
import * as urls from 'constant/urls'
import { Input } from 'antd';

@inject('carlActions', 'userStore')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.carlActions
    this.store = props.userStore
  }

  handleAdd = () => {
    this.actions.addCarl()
  }

  handleDel = (e) => {
    var id = e.currentTarget.id
    this.actions.delCarl(id)
  }

  changeVal = (e) => {
    var id   = e.target.parentNode.attributes['data-id'].value
    var val  = e.target.value
    var type = e.target.attributes['data-type'].value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateCarl(id,type,val)
  }

  upload = async(e) => {
    if (e.currentTarget.files.length < 1) return;
    var id   = e.currentTarget.parentNode.parentNode.parentNode.attributes['data-id'].value
    var type = e.currentTarget.attributes['data-type'].value
    // console.log(`${id} - ${type} `)

    var file = e.currentTarget.files[0]
    let r = await this.actions.uploadImg(file,id,type)
  }


  render() {
    var cur = this.store.cur
    var user = JSON.parse(JSON.stringify(this.store.user))
    var carl = getValue(user, `langdb.${cur}.home_carousels`, '')
    var pre = urls.HOST_IMG
    // console.log(carl)
    carl = (carl=='')?[]:carl
   
    return (
      <div className='g-carl'>
        {carl.map((e,i)=>{
          return (
            <div className="m-carl" key={i} data-id={i}>
              <div className="m-carl-del" id={i} onClick={this.handleDel}></div>
              <div className="m-carl-img">
                <div className="m-wrap">
                  <input type="file" data-type="imgw" className="m-carl-upload" accept="image/*" onChange={this.upload}/>
                  <img src={pre+e.imgw} alt="" className="m-carl-imgw"/>
                </div>
                <div className="m-wrap">
                  <input type="file" data-type="imgm" className="m-carl-upload" accept="image/*" onChange={this.upload}/>
                  <img src={pre+e.imgm} alt="" className="m-carl-imgm"/>
                </div>
              </div>
              <Input type="text" data-type="title" value={e.title} onChange={this.changeVal}/>
              <Input type="text" data-type="desc"  value={e.desc}  onChange={this.changeVal}/>
            </div>
          )
        })}
        <div className="m-carl">
          <div className="m-card-add" onClick={this.handleAdd}></div>
        </div>
      </div>
    )
  }
}


export default Home