import React, { useContext } from 'react'
import { Modal, Button, Form, Select, Input, notification } from 'antd'
import { addMemberSign } from '../../../../../api/base/general/member_sign'
import HomepageContext from '../../../../../context/HomepageContext'

const AddMemberSign = (props) => {
    const {visible, onCancel, setVisible, resetData, faculty} = props
    const { setLoading } = useContext(HomepageContext)
    const { getFieldDecorator } = props.form
    const { Option } = Select

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await addMemberSign(values)
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
                title="Thêm người ký kết"
                visible={visible}
                onCancel={onCancel}
                okText="Thêm"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('fullname', {
                            rules: [{
                                required: true,
                                message: 'Chưa nhập họ-tên!'
                            }]
                        })(
                            <Input placeholder="Họ-tên đại diện ký kết" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email')(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone')(
                            <Input placeholder="Số điện thoại"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('job_title')(
                            <Input placeholder="Chức vụ"/>
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

export default Form.create()(AddMemberSign)