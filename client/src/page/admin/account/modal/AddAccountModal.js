import React, { useContext } from 'react'
import { Modal, Button, Form, Select, Input, notification } from 'antd'
import { addAccount } from '../../../../api/base/admin/admin'
import HomepageContext from '../../../../context/HomepageContext'

const AddAccountModal = (props) => {
    const {visible, onCancel, setVisible, resetData, faculty} = props
    const { setLoading } = useContext(HomepageContext)
    const { getFieldDecorator } = props.form
    const { Option } = Select

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await addAccount(values)
                setLoading(false)
                setVisible(false)
                if (success) {
                    notification['success']({
                        message: 'Thêm thành công!'
                    })
                    resetData()
                } else {
                    notification['error']({
                        message: 'Thêm không thành công!'
                    })
                }
            }
        })
    }

    return (
        <div>
            <Modal
                title="Thêm người theo dõi khoa"
                visible={visible}
                onCancel={onCancel}
                okText="Thêm"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: 'Chưa nhập tài khoản!'
                            }]
                        })(
                            <Input placeholder="Tên tài khoản" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: 'Chưa nhập mật khẩu!'
                            }]
                        })(
                            <Input type="password" placeholder="Mật khẩu"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email')(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('facultyId', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn khoa!'
                        }]
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
                            <Button type="primary" htmlType="submit">Thêm</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Form.create()(AddAccountModal)