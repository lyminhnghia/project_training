import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, Input, notification } from 'antd'
import { getCountry, updateCountry } from '../../../../api/base/admin/country'
import HomepageContext from '../../../../context/HomepageContext'

const EditCountry = (props) => {
    const { id, resetData } = props
    const { getFieldDecorator } = props.form
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)
    const [country, setCountry] = useState([])

    const fetchData = async () => {
        setLoading(true)
        const { success, data } = await getCountry(id)
        if (success) {
            if (data.success) {
                setCountry(data.message)
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
                const { success } = await updateCountry(id, values)
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
                title="Sửa thông tin quốc gia"
                visible={visible}
                onCancel={handleCancel}
                okText="submit"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('country', {
                            initialValue: country.country,
                            rules: [{
                                required: true,
                                message: 'Chưa nhập tên quốc gia!'
                            }]
                        })(
                            <Input placeholder="Tên quốc gia" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('continent', {
                            initialValue: country.continent,
                        })(
                            <Input placeholder="Tên châu lục"/>
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
export default Form.create()(EditCountry)