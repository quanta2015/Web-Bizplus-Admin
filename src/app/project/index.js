import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input } from 'antd';
import getNode from 'util/getNode'
import './index.less'
import { message } from 'antd'

@inject('projectActions', 'userStore')
@observer
class Project extends React.Component {

  constructor(props) {
    super(props)
    this.actions = props.projectActions
    this.store = props.userStore
  }

  handleAdd = () => {
    this.actions.addProject()
  }

  handleDel = (e) => {
    var id = e.currentTarget.id
    this.actions.delProject(id)
  }

  changeVal = (e) => {

    var id   = e.target.attributes['data-id'].value
    var val  = e.target.value
    var type = e.target.attributes['data-type'].value
    // console.log(`${id} - ${type} - ${val}`)
    this.actions.updateProject(id,type,val)
  }

  addElement = (e)=>{
    var id   = e.target.attributes['data-id'].value
    var val  = e.target.previousSibling.value
    var type = e.target.previousSibling.attributes['data-type'].value
    console.log(`${id} - ${type} - ${val}`)
    this.actions.addElement(id,type,val,'')
  }

  addElementEnv = (e)=>{
    var id   = e.target.attributes['data-id'].value
    var cls   = e.target.attributes['data-type'].value
    var val  = e.target.parentNode.childNodes[1].value
    var type = e.target.parentNode.childNodes[1].attributes['data-type'].value
    console.log(`${id} - ${type} - ${val} - ${cls}`)

    if(val==='') {
      message.error('请输入数据！')
    }else{
      this.actions.addElement(id,type,val,cls)
    }
    
  }

  delElement = (e)=>{
    var id   = e.target.attributes['data-id'].value
    var eid  = e.target.attributes['data-eid'].value
    var type = e.target.attributes['data-type'].value
    console.log(`${id} - ${eid} - ${type}`)
    this.actions.delElement(id,eid,type)
  }


  render() {

    var cur = this.store.cur
    var user = JSON.parse(JSON.stringify(this.store.user))
    var list = getValue(user, `langdb.${cur}.achieve.list`, '')
    list = (list=='')?[]:list


    list.map((e,i)=>{
      // if (e.vl2!=='') {
      //   let h = e.vl2
      //   h = h.substring(6, h.length-7);
      //   let arr = h.split('</span><span>')
      //   e.vl2 = arr
      // }else{
      //   e.vl2 = []
      // }
      let nodes = getNode(e.vl2);
      let data = []
      for(var i=0;i<nodes.length;i++) {
        data.push({val:nodes[i].innerText, cls:`m-element`})
      }
      e.vl2 = data
      
      // let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;
      nodes = getNode(e.vl4);
      let data4 = []
      for(var i=0;i<nodes.length;i++) {
        data4.push({val:nodes[i].innerText, cls:`m-element ${nodes[i].className}`})
      }
      e.vl4 = data4
    })
    
    console.log(list)

    return (
      <div className='g-project'>
        {list.map((e,i)=>{
          return(
          <div className="m-achieve-item" key={i} >
            <div className="m-del" id={i} onClick={this.handleDel}></div>
            <div className="m-achieve-head" data-locate="achieve.list[0].title">
              <Input type="text" data-type="title" value={e.title} data-id={i} onChange={this.changeVal}/>
            </div>
            <div className="m-achieve-wrap">
              <div className="m-achieve-row">
                <div className="m-achieve-tl">{e.tl1}</div>
                <div className="m-achieve-co">
                  <Input type="text" data-type="vl1" value={e.vl1} data-id={i} onChange={this.changeVal}/>
                </div>
              </div>
              <div className="m-achieve-row">
                <div className="m-achieve-tl">
                  {e.tl2}
                  <Input type="text" className="m-val" data-type="vl2"/>
                  <span className="m-add" data-id={i} onClick={this.addElement}>+</span>
                </div>
                <div className="m-achieve-co">
                  {e.vl2.map((m,j)=>{
                    return (
                      <span key={j} className="m-element">{m.val}<i className="m-edel" data-type="vl2" data-id={i} data-eid={j} onClick={this.delElement}></i></span>
                    )
                  })}
                </div>
              </div>
              <div className="m-achieve-row">
                <div className="m-achieve-tl">{e.tl3}</div>
                <div className="m-achieve-co">
                  <Input type="text" data-type="vl3" value={e.vl3} data-id={i} onChange={this.changeVal}/>
                </div>
              </div>
              <div className="m-achieve-row">
                <div className="m-achieve-tl">
                  {e.tl4}
                  <Input type="text" className="m-val" data-type="vl4"/>
                  <span className="m-add"   data-id={i} data-type='m-os' onClick={this.addElementEnv}>+ os</span>
                  <span className="m-add"   data-id={i} data-type='m-db' onClick={this.addElementEnv}>+ db</span>
                  <span className="m-add" data-id={i} data-type='m-lang' onClick={this.addElementEnv}>+ lg</span>
                </div>
                <div className="m-achieve-co">
                  {e.vl4.map((p,k)=>{
                    return (
                      <span key={k} className={p.cls}>{p.val}<i className="m-edel" data-type="vl4" data-id={i} data-eid={k} onClick={this.delElement}></i></span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          )
        })}

        <div className="m-achieve-item">
          <div className="m-proj-add" onClick={this.handleAdd}></div>
        </div>
      </div>
    )
  }
}




export default Project