import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form, Input, Select, notification } from 'antd'
import { getPartner, updatePartner } from '../../../../../api/base/general/partner'
import HomepageContext from '../../../../../context/HomepageContext'

const EditPartner = (props) => {
    const { id, resetData, country } = props
    const { getFieldDecorator } = props.form
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)
    const [partner, setPartner] = useState([])
    const {Option} = Select

    const fetchData = async () => {
        setLoading(true)
        const { success, data } = await getPartner(id)
        if (success) {
            if (data.success) {
                setPartner(data.message)
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
                const { success } = await updatePartner(id, values)
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
                title="Sửa thông tin đối tác"
                visible={visible}
                onCancel={handleCancel}
                okText="submit"
                footer={null}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            initialValue: partner.name,
                            rules: [{
                                required: true,
                                message: 'Chưa nhập tên đối tác!'
                            }]
                        })(
                            <Input placeholder="Tên đối tác" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('abbreviation', {
                            initialValue: partner.abbreviation,
                        })(
                            <Input placeholder="Tên viết tắt"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('president', {
                            initialValue: partner.president,
                        })(
                            <Input placeholder="Tên giám đốc/hiệu trưởng"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('founding_date', {
                            initialValue: partner.founding_date,
                        })(
                            <Input type="date" placeholder="Ngày thành lập"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            initialValue: partner.phone,
                        })(
                            <Input placeholder="Điện thoại"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address', {
                            initialValue: partner.address,
                        })(
                            <Input placeholder="Địa chỉ"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            initialValue: partner.email,
                        })(
                            <Input placeholder="Email"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('website', {
                            initialValue: partner.website,
                        })(
                            <Input placeholder="Website"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('countryId', {
                        initialValue: partner.countryId
                    })(
                        <Select 
                            showSearch
                            placeholder="Tên quốc gia" 
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {country.map(country => (
                                <Option style={{ textAlign: "center" }} key={country.id} value={country.id}>{country.country}</Option>
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
export default Form.create()(EditPartner)