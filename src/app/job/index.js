import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input,DatePicker,message } from 'antd';
import getNode from 'util/getNode'
import log from 'util/log'
import * as urls from 'constant/urls'
import './index.less'


@inject('jobActions', 'userStore')
@observer
class Job extends React.Component {

  constructor(props) {
    super(props)
    this.actions = props.jobActions
    this.store = props.userStore
  }

  addQual = () => {
    this.actions.addQual()
  }

  addType = () => {
    this.actions.addType()
  }

  delType = () => {
    this.actions.delType()
  }

  addTypeChild = (e) => {
    var id   = e.target.attributes['data-id'].value
    this.actions.addTypeChild(id)
  }

  delType = (e) => {
    var id = e.currentTarget.id
    this.actions.delType(id)
  }

  delTypeChild = (e) => {
    var id   = e.target.attributes['data-id'].value
    var pid   = e.target.attributes['data-pid'].value
    this.actions.delTypeChild(id,pid)
  }

  delQual = (e) => {
    var id   = e.target.attributes['data-id'].value
    this.actions.delQual(id)
  }

  changeVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var type = e.target.attributes['data-type'].value
    var val  = e.target.value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateVal(id,type,val)
  }

  changeChildVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var pid   = e.target.attributes['data-pid'].value
    var type  = e.target.attributes['data-type'].value
    var val  = e.target.value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateChildVal(id,pid,type,val)
  }

  changeQualVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var val  = e.target.value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateQualVal(id,val)
  }

  changeGiveVal = (e) => {
    var id   = e.target.attributes['data-id'].value
    var type = e.target.attributes['data-type'].value
    var val  = e.target.value
    this.actions.updateGiveVal(id,type,val)
  }

  render() {

    var cur = this.store.cur
    var user = JSON.parse(JSON.stringify(this.store.user))
    var list_type = getValue(user, `langdb.${cur}.careers.part1_item`, '')
    var list_qual = getValue(user, `langdb.${cur}.careers.part2_item`, '')
    var list_give = getValue(user, `langdb.${cur}.careers.part3_list`, '')
    list_type = (list_type=='')?[]:list_type
    list_qual = (list_qual=='')?[]:list_qual
    list_give = (list_give=='')?[]:list_give
    log(list_type)

    return (
      <div className='g-job'>
        <div className="m-job-type">
          募集職種
          <span className="m-add"  onClick={this.addType}>+</span>
        </div>
        <div className="m-job-wrap">
          {list_type.map((e,i)=>{
            return(
              <div className="m-job-item" key={i}>
                <div className="m-del" id={i} onClick={this.delType}></div>
                <h1>
                  <Input type="text" data-type="label" data-id={i} value={e.label} onChange={this.changeVal}/>
                  <span className="m-add"  data-id={i} onClick={this.addTypeChild}>+</span>
                </h1>
                {e.list.map((f,j)=>{
                  return(
                    <span key={j}>
                      <i className="m-job-del" data-id={i} data-pid={j} onClick ={this.delTypeChild}></i>
                      <Input type="text"  data-id={i} data-pid={j} data-type="list" value={f} onChange={this.changeChildVal}/>
                    </span>

                  )
                })}
                
              </div>
            )
          })}
        </div>

        <div className="m-job-type">
          応募資格
          <span className="m-add" onClick={this.addQual}>+</span>
        </div>
        <div className="m-job-wrap">
          <div className="m-qual">
          {list_qual.map((e,i)=>{
            return(
              <span  key={i} >
                <i className="m-job-del" data-id={i}  onClick ={this.delQual}></i>
                <Input type="text" data-id={i} value={e} onChange={this.changeQualVal}/>
              </span>
              
            )
          })}
          </div>
        </div>
        
        <div className="m-job-type">
          待遇・勤務・福利厚生
        </div>
        <div className="m-job-wrap">
          <div className="m-give">
          {list_give.map((e,i)=>{
            return(
              <div key={i}>
                <span>{e.tl}</span>
                <Input type="text" data-type="vl" data-id={i} value={e.vl} onChange={this.changeGiveVal}/>
              </div>
            )
          })}
          </div>
        </div>


      </div>
    )
  }
}

export default Job