import React from 'react'
import { Layout, Row, Col, Dropdown, Icon, Menu, Avatar, BackTop,Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './index.less'
const { Sider } = Layout
const MenuItem = Menu.Item

let menu = [
      {
        path:'/home',
        icon:'home',
        title:'轮播图'
      },{
        path:'/project',
        icon:'project',
        title:'开发成果'
      },{
        path:'/style',
        icon:'schedule',
        title:'企业文化'
      },{
        path:'/edu',
        icon:'calendar',
        title:'社内教育'
      },{
        path:'/job',
        icon:'robot',
        title:'招聘信息'
      },{
        path:'/contract',
        icon:'environment',
        title:'交通方式'
      },
    ]


@inject('userActions', 'userStore')
@observer
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.userActions
    this.store = props.userStore
  }


  logout = async() => {
    await this.actions.logout()
    window.location.assign(
      window.location.origin + window.location.pathname + '#' + '/login'
    )
  }


  doLang = (e) => {
    let list= e.currentTarget.childNodes
    for(var i =0;i<list.length;i++) {
      list[i].classList.remove('active');
    }
    e.target.classList.add('active')
    let lang = e.target.attributes['data-lang'].value
    this.actions.saveLang(lang)
  }

  doSaveAll = ()=> {
    this.actions.saveAll()
  }


  render() {

    const dropdownMenu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.logout}>
            <Icon type='poweroff' /> <span>退出登录</span>
          </span>
        </Menu.Item>
      </Menu>
    )

    return (
      <Layout className='dashboard'>
        <Sider trigger={null} collapsible collapsed={false} width={200} theme='dark'>
          <div className='logo'>
            <a href='/'>
              <h1>Bizplus管理系统</h1>
            </a>
          </div>
          <Menu theme='dark' mode='inline' className='menu'>
            {menu.map(item => (
              <MenuItem key={item.path}>
                <NavLink to={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </NavLink>
              </MenuItem>
            ))}
          </Menu>
        </Sider>

        <Layout>
          <div className='header'>
            <Row type='flex' justify='space-between' align='middle'>
              <Col className='header-left'>
                <div className="m-lang" onClick={this.doLang}>
                  <span className="active" data-lang="jp">日</span>
                  <span data-lang="cn">中</span>
                  <span data-lang="en">英</span>
                </div>
                <Button className="m-save" type="primary"  onClick={this.doSaveAll}>保存</Button>
              </Col>
              <Col className='header-right'>
                <Dropdown overlay={dropdownMenu}>
                  <span className='account'>
                    <Avatar className='avatar' icon='user' />
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </div>
          <Layout.Content className='content'>
            {this.props.children}
          </Layout.Content>
        </Layout>
        <BackTop />
      </Layout>
    )
  }
}

export default Dashboard
