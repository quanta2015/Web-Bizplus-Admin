import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,DatePicker,message } from 'antd';
import getNode from 'util/getNode'
import log from 'util/log'
import * as urls from 'constant/urls'
import './index.less'


@inject('eduActions', 'userStore')
@observer
class Edu extends React.Component {

  constructor(props) {
    super(props)
    this.actions = props.eduActions
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
    var pid  = e.target.attributes['data-pid'].value
    var val  = e.target.value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateVal(id,pid,val)
  }

  render() {

    var cur = this.store.cur
    var user = JSON.parse(JSON.stringify(this.store.user))
    var list = getValue(user, `langdb.${cur}.edu.table_list`, '')
    list = (list=='')?[]:list
    log(list)

    return (
      <div className='g-edu'>
        
        {list.map((e,i)=>{
          return(
            <div className="m-benefit-row" key={i}>
              {e.clist.map((f,j)=>{
                if ((i===0)||(j==0)) {
                  return (
                    <div className="m-col" key={j}>
                      <span>{f}</span>
                    </div>
                  )
                }else{
                  return(
                    <div className="m-col" key={j}>
                      <Input type="text" data-type="tl" value={f} data-id={i} data-pid={j} onChange={this.changeVal}/>
                    </div>
                  )
                }
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Edu