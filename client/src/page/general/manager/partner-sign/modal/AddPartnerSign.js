import React, { useContext } from 'react'
import { Modal, Button, Form, Select, Input, notification } from 'antd'
import { addPartnerSign } from '../../../../../api/base/general/partner_sign'
import HomepageContext from '../../../../../context/HomepageContext'

const AddPartnerSign = (props) => {
    const {visible, onCancel, setVisible, resetData, partner} = props
    const { setLoading } = useContext(HomepageContext)
    const { getFieldDecorator } = props.form
    const { Option } = Select

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await addPartnerSign(values)
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
                title="Thêm người ký kết (đối tác)"
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
                        {getFieldDecorator('date_of_birth')(
                            <Input type="date" placeholder="Ngày sinh"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email')(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address')(
                            <Input placeholder="Địa chỉ"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('job_title')(
                            <Input placeholder="Chức vụ"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('partnerId', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn đối tác!'
                        }]
                    })(
                        <Select 
                            showSearch
                            placeholder="Tên đối tác" 
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {partner.map(partner => (
                                <Option style={{ textAlign: "center" }} key={partner.id} value={partner.id}>{partner.name}</Option>
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

export default Form.create()(AddPartnerSign)