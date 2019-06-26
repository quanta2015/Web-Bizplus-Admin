import React from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Button, Input, Icon } from 'antd'

import './index.less'
const FormItem = Form.Item

@Form.create()
@inject('userActions', 'userStore')
@observer
class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.actions = props.userActions
    this.store = props.userStore
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let r = await this.actions.login(values)
        if (r && r.code === 200) {
          window.location.assign(`${window.location.origin}${window.location.pathname}#/home`)
        }
      }
    })
  }

  render() {
    const {  getFieldDecorator } = this.props.form

    return (
      <div className='login__container'>
        <div className='login__content'>
          <div className='login__header'>
            <span>BIZPLUS后台管理系统</span>
          </div>

          <div className='login__form'>
            <Form onSubmit={this.handleSubmit}>
              <FormItem hasFeedback>
                {getFieldDecorator('usr', { rules: [{ required: true, message: '请输入账号' }] })(
                  <Input
                    name='usr'
                    prefix={<Icon type='user' />}
                    placeholder='请输入账号'
                  />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('pwd', { rules: [{ required: true, message: '请输入密码！' }] })(
                  <Input
                    prefix={<Icon type='lock' />}
                    name='pwd'
                    type='password'
                    placeholder='请输入密码'
                  />
                )}
              </FormItem>

              <Form.Item>
                <Button className='login__btn' type='primary' htmlType='submit' > 登录 </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm