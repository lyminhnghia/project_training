import React, { useContext } from 'react'
import { Modal, Button, Form, Select, Input, notification } from 'antd'
import { addPartner } from '../../../../../api/base/general/partner'
import HomepageContext from '../../../../../context/HomepageContext'

const AddPartner = (props) => {
    const {visible, onCancel, setVisible, resetData, country} = props
    const { setLoading } = useContext(HomepageContext)
    const { getFieldDecorator } = props.form
    const { Option } = Select

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields(async (err, values) => {
            if (!err) {
                setLoading(true)
                const { success } = await addPartner(values)
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
                title="Thêm đối tác"
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
                                message: 'Chưa nhập tên đối tác!'
                            }]
                        })(
                            <Input placeholder="Tên đối tác" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('abbreviation')(
                            <Input placeholder="Tên viết tắt"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('president')(
                            <Input placeholder="Tên giám đốc/hiệu trưởng"/>
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
                    {getFieldDecorator('countryId', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn quốc gia!'
                        }]
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
                            <Button type="primary" htmlType="submit">Thêm</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Form.create()(AddPartner)