import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, Input, notification } from 'antd'
import { getFaculty, updateFaculty } from '../../../../api/base/admin/admin'
import HomepageContext from '../../../../context/HomepageContext'

const EditFaculty = (props) => {
    const {id, resetData} = props
    const [visible, setVisible] = useState(false)
    const { setLoading } = useContext(HomepageContext)
    const { getFieldDecorator } = props.form
    const [faculty, setFaculty] = useState([])

    const fetchData = async () => {
        setLoading(true)
        const { success, data } = await getFaculty(id)
        if (success) {
            if (data.success) {
                setFaculty(data.message)
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

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await updateFaculty(id,values)
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

    const showModal = () => {
        setVisible(true)
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
                title="Cập nhật khoa, viện"
                visible={visible}
                onCancel={handleCancel}
                okText="Cập nhật"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            initialValue: faculty.name,
                            rules: [{
                                required: true,
                                message: 'Chưa nhập tên khoa, viện!'
                            }]
                        })(
                            <Input placeholder="Tên khoa, viện" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('abbreviation', {
                            initialValue: faculty.abbreviation,
                        })(
                            <Input placeholder="Tên viết tắt"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('founding_date', {
                            initialValue: faculty.founding_date,
                        })(
                            <Input type="date" placeholder="Ngày thành lập"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            initialValue: faculty.phone,
                        })(
                            <Input placeholder="Điện thoại"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address', {
                            initialValue: faculty.address,
                        })(
                            <Input placeholder="Địa chỉ"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            initialValue: faculty.email,
                        })(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('website', {
                            initialValue: faculty.website,
                        })(
                            <Input placeholder="Website"/>
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

export default Form.create()(EditFaculty)