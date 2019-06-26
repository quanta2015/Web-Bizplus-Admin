import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input } from 'antd';
import getNode from 'util/getNode'
import './index.less'
import { message } from 'antd'

@inject('contractActions', 'userStore')
@observer
class Contract extends React.Component {

  constructor(props) {
    super(props)
    this.actions = props.contractActions
    this.store = props.userStore
  }

  addAccess = (e) => {
    var id   = e.target.attributes['data-id'].value
    this.actions.addAccess(id)
  }

  delContract = (e) => {
    var id   = e.target.attributes['data-id'].value
    var pid  = e.target.attributes['data-pid'].value

    console.log(id + '   ' + pid)
    this.actions.delContract(id,pid)
  }

  changeVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var val  = e.target.value
    var type = e.target.attributes['data-type'].value
    this.actions.updateContract(id,type,val)
  }

  changeChildVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var pid  = e.target.attributes['data-pid'].value
    var val  = e.target.value
    this.actions.updateChildContract(id,pid,val)
  }

  render() {

    var cur = this.store.cur
    var user = JSON.parse(JSON.stringify(this.store.user))
    var list = getValue(user, `langdb.${cur}.access.map_list`, '')
    list = (list=='')?[]:list

    console.log(list)

    return (
      <div className='g-contract'>
        {list.map((e,i)=>{
          return(
            <div className="m-map-item" key={i}>
              <h1><Input type="text" data-type="name" data-id={i} value={e.name} onChange={this.changeVal}/></h1>
              <div className="m-map-row">
                <span>邮编</span>
                <Input type="text" data-type="code" data-id={i} value={e.code}  onChange={this.changeVal}/>
              </div>
              <div className="m-map-row">
                <span>电话</span>
                <Input type="text" data-type="tel" data-id={i} value={e.tel}  onChange={this.changeVal}/>
              </div>
              <div className="m-map-row">
                <span>传真</span>
                <Input type="text" data-type="fax" data-id={i} value={e.fax} onChange={this.changeVal}/>
              </div>
              <div className="m-map-row">
                <span>住址</span>
                <Input type="text" data-type="addr" data-id={i} value={e.addr} onChange={this.changeVal}/>
              </div>
              <div className="m-map-row m-acc-title">
                アクセス
                <label className="m-add" data-id={i} onClick={this.addAccess}>+</label>
              </div>
              <div className="m-map-row m-acc-wrap">
                {e.access_list.map((f,j)=>{
                  return (
                    <div key={j} >
                      <i className="m-contract-del" data-id={i} data-pid={j} onClick ={this.delContract}></i>
                      <Input type="text" data-id={i} data-pid={j} value={f} onChange={this.changeChildVal}/>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}




export default Contract