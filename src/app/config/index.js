import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,DatePicker } from 'antd';
import getNode from 'util/getNode'
import './index.less'
import { message } from 'antd'
import log from 'util/log'
import moment from 'moment'
import * as urls from 'constant/urls'

@inject('configActions', 'userStore')
@observer
class Config extends React.Component {

  constructor(props) {
    super(props)
    this.actions = props.configActions
    this.store = props.userStore
  }

  changeVal = (e) => {
    var val  = e.target.value
    var type = e.target.attributes['data-type'].value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateConfig(type,val)
  }


  render() {

    var cur = this.store.cur
    var user = JSON.parse(JSON.stringify(this.store.user))
    log(user)
    var list = getValue(user, `config.mail`, '')
    list = (list=='')?[]:list
    log(list)

    return (
      <div className='g-config'>
        <div className="m-config-item">
          <div className="m-config-server">
            <div className="m-config-row">
              <span>SMTP服务器地址</span>
              <Input type="text" data-type="host" value={list.host}  onChange={this.changeVal}/>
            </div>
            <div className="m-config-row">
              <span>SMTP服务器Port</span>
              <Input type="text" data-type="port" value={list.port}  onChange={this.changeVal}/>
            </div>
            <div className="m-config-row">
              <span>用户名</span>
              <Input type="text" data-type="code" value={list.user}  onChange={this.changeVal}/>
            </div>
            <div className="m-config-row">
              <span>密码</span>
              <Input type="password" data-type="pwd" value={list.pwd}  onChange={this.changeVal}/>
            </div>
          </div>
          <div className="m-config-email">
            <div className="m-config-row">
              <span>人事部门email</span>
              <Input type="text" data-type="careerMail" value={list.careerMail}  onChange={this.changeVal}/>
            </div>
            <div className="m-config-row">
              <span>事业部门email</span>
              <Input type="text" data-type="bussinessMail" value={list.bussinessMail}  onChange={this.changeVal}/>
            </div>
            <div className="m-config-row">
              <span>其他部门email</span>
              <Input type="text" data-type="otherMail" value={list.otherMail}  onChange={this.changeVal}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Config