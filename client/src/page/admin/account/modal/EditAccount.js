import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, Input, Select, notification } from 'antd'
import { getAccount, updateAccount } from '../../../../api/base/admin/admin'
import HomepageContext from '../../../../context/HomepageContext'

const EditAccount = (props) => {
    const { idUser, resetData, faculty} = props
    const { getFieldDecorator } = props.form
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)
    const [account, setAccount] = useState([])
    const {Option} = Select

    const fetchData = async () => {
        setLoading(true)
        const { success, data } = await getAccount(idUser)
        if (success) {
            if (data.success) {
                setAccount(data.message)
            } else {
                notification['error']({
                    message: data.message
                })
            }
        } else {
            notification['error']({
                message: data
            })
        }
        setLoading(false)
    }

    const showModal = () => {
        setVisible(true)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await updateAccount(idUser, values)
                setLoading(false)
                setVisible(false)
                if (success) {
                    notification['success']({
                        message: 'Cập nhật thành công!'
                    })
                    resetData()
                } else {
                    notification['error']({
                        message: 'Cập nhật thất bại!'
                    })
                }
            }
        })
    }

    const handleCancel = e => {
        setVisible(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 30, width: '50px !important' }}>
                Sửa
            </Button>
            <Modal
                width="900px"
                title="Sửa thông tin account"
                visible={visible}
                onCancel={handleCancel}
                okText="submit"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            initialValue: account.username,
                            rules: [{
                                required: true,
                                message: 'Chưa nhập tài khoản!'
                            }]
                        })(
                            <Input placeholder="Tên tài khoản" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            initialValue: account.email,
                        })(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('facultyId', {
                        initialValue: account.facultyId
                    })(
                        <Select 
                            showSearch
                            placeholder="Tên khoa" 
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {faculty.map(fa => (
                                <Option style={{ textAlign: "center" }} key={fa.id} value={fa.id}>{fa.name}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="primary" htmlType="submit">Cập nhật</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}
export default Form.create()(EditAccount)