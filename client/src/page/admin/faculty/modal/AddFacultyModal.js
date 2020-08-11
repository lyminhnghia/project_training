import React, { useContext } from 'react'
import { Modal, Button, Form, Input, notification } from 'antd'
import { addFaculty } from '../../../../api/base/admin/admin'
import HomepageContext from '../../../../context/HomepageContext'

const AddFacultyModal = (props) => {
    const {visible, onCancel, setVisible, resetData} = props
    const { setLoading } = useContext(HomepageContext)
    const { getFieldDecorator } = props.form

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await addFaculty(values)
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
                title="Thêm khoa, viện"
                visible={visible}
                onCancel={onCancel}
                okText="Thêm"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: 'Chưa nhập tên khoa, viện!'
                            }]
                        })(
                            <Input placeholder="Tên khoa, viện" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('abbreviation')(
                            <Input placeholder="Tên viết tắt"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('founding_date')(
                            <Input type="date" placeholder="Ngày thành lập"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone')(
                            <Input placeholder="Điện thoại"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address')(
                            <Input placeholder="Địa chỉ"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email')(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('website')(
                            <Input placeholder="Website"/>
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

export default Form.create()(AddFacultyModal)