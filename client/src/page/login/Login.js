import React, { useState } from 'react'
import './Login.css'
import { Form, Icon, Input, Alert, Button} from 'antd'
import { withRouter } from 'react-router-dom'
import { setUserCookies, checkAuth } from '../../api/auth/auth'
import Loading from '../homepage/component/loading/Spin'
import { login } from '../../api/base/auth'

const LoginWrap = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  if (checkAuth()) {
    props.history.push('/')
  }
  const [message, setMessage] = useState('')
  const handleLogin = (data) => {

    if (data.success) {
      setUserCookies(data.message, data.role)
    }

  }
  const submitLogin = async (values) => {
    setIsLoading(true)
    const { success, data } = await login(values)
    if (success) {
      if (data.success) {
        handleLogin(data)

        props.history.push('/')
      } else {
        setMessage(data.message)
      }
    } else {
      setMessage(data)
    }
    setIsLoading(false)
  }
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        submitLogin(values)
      }

    })
  }
  const { getFieldDecorator } = props.form
  return (
    <div className="para-login-form">
      <div style={{ display: isLoading ? 'block' : 'none' }}>
        <Loading />
      </div>
      <div className="login-wrap backgroundSignIn">
        <div className="body-login-form">
          <div className="information-login-s">
            <div style={{margin:"0 auto"}}>
              <div style={{color:"white", fontSize:40,fontWeight:700,textAlign:"center"}}>ĐẠI HỌC CÔNG NGHỆ</div>
              <div style={{color:" white",fontSize: 18,fontFamily: "sans-serif",textAlign:"center"}}>144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</div>
            </div>
          </div>
          <Form onSubmit={handleSubmit} className="login-form">
            <div className="logo-login-s">
              <img className="logo-img-login" src="/img/uet_logo.png" alt=""></img>
            </div>
            {message && <Alert style={{ marginBottom: '20px' }} message={message} type="error" />}
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  style={{ backgroundColor: "white !important" }}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button button-login-form-s">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Form.create()(LoginWrap))