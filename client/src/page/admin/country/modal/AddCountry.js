import React, { useContext } from 'react'
import { Modal, Button, Form, Input, notification } from 'antd'
import { addCountry } from '../../../../api/base/admin/country'
import HomepageContext from '../../../../context/HomepageContext'

const AddCountry = (props) => {
    const {visible, onCancel, setVisible, resetData} = props
    const { setLoading } = useContext(HomepageContext)
    const { getFieldDecorator } = props.form

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await addCountry(values)
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
                title="Thêm quốc gia"
                visible={visible}
                onCancel={onCancel}
                okText="Thêm"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('country', {
                            rules: [{
                                required: true,
                                message: 'Chưa nhập quốc gia!'
                            }]
                        })(
                            <Input placeholder="Tên quốc gia" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('continent')(
                            <Input placeholder="Châu lục"/>
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

export default Form.create()(AddCountry)