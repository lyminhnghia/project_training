import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, Input, notification } from 'antd'
import HomepageContext from '../../../../context/HomepageContext'
import { updateCooMain, getCoMain } from '../../../../api/base/cooperation/cooperation-detail'

const EditCooDetail= (props) => {
    const { id, resetData} = props
    const { getFieldDecorator } = props.form
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)
    const [main, setMain] = useState([])

    const fetchData = async () => {
        setLoading(true)
        const { success, data } = await getCoMain(id)
        if (success) {
            if (data.success) {
                setMain(data.message)
            } else {
                notification['error']({
                    message: data.message
                })
            }
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
                const { success } = await updateCooMain(id, values)
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
                title="Cập nhật hoạt động hợp tác"
                visible={visible}
                onCancel={handleCancel}
                okText="submit"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <h3 style={{}}> Nội dung hợp tác: {main.main_cooperation} </h3>
                    <Form.Item>
                        {getFieldDecorator('specific_cooperation', {
                            initialValue: main.specific_cooperation,
                            rules: [{
                                required: true,
                                message: 'Chưa hđ hợp tác cụ thể!'
                            }]
                        })(
                            <Input placeholder="Hoạt động hợp tác cụ thể" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('expense', {
                            initialValue: main.expense,
                            rules: [{
                                required: true,
                                message: 'Chưa nhập chi phí!'
                            }]
                        })(
                            <Input placeholder="Chi phí" />
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
export default Form.create()(EditCooDetail)