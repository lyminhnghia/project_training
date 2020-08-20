import React, { useContext, useEffect, useState } from 'react'
import { Select, Form, notification, Input, Button, Radio, Checkbox, Icon, Upload } from 'antd'
import { getAllName, getAllPartnerCo, getAllMemberCo, addCooperation, upload } from '../../../api/base/cooperation/cooperation'
import HomepageContext from "../../../context/HomepageContext"
import './cooperation.css'
const { Option } = Select

const Cooperation = (props) => {
    const { getFieldDecorator } = props.form
    const [nameFaculty, setNameFaculty] = useState([])
    const [partner, setPartner] = useState([])
    const [member, setMember] = useState([])
    const [file, setFile] = useState([])
    const [signPartner, setSignPartner] = useState([])
    const [signMember, setSignMember] = useState([])
    const { setLoading } = useContext(HomepageContext)

    const fetchDataPartner = async () => {
        setLoading(true)
        const { success, data } = await getAllPartnerCo()
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

    const fetchDataMember = async () => {
        setLoading(true)
        const { success, data } = await getAllMemberCo()
        if (success) {
            if (data.success) {
                setMember(data.message)
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

    const fetchDataNameFaculty = async () => {
        setLoading(true)
        const { success, data } = await getAllName()
        if (success) {
            if (data.success) {
                setNameFaculty(data.message)
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
                if (file) {
                    const result = await upload(file)
                    if (result.success) {
                        values.file = result.data.file
                    }
                }
                const { success } = await addCooperation(values)
                setLoading(false)
                if (success) {
                    console.log(props.form.validateFields())
                    notification['success']({
                        message: 'Cập nhật thành công!'
                    })
                } else {
                    notification['error']({
                        message: 'Cập nhật thất bại!'
                    })
                }
            }
        })
    }

    const onChooseFile = async ({ data, filename, file }) => {
        setFile({ data, filename, file })
    }

    useEffect(() => {
        fetchDataPartner()
        fetchDataMember()
        fetchDataNameFaculty()
    }, [])

    const mapSignPartner = partnerId => {
        if (partnerId) {
            setSignPartner(partner.find(x => x.id === partnerId).user_partners)
        }
    }

    const mapSignMember = memberId => {
        if (memberId) {
            setSignMember(member.find(x => x.id === memberId).member_signs)
        }
    }

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
    };

    

    return (
        <div
            style={{ margin: 60 }}
        >
            <div className="title-profile-s">Thỏa thuận hợp tác</div>

            <Form
                {...layout}
                onSubmit={handleSubmit}
                action="" method="post"
                className="form"
            >
                <Form.Item
                    label="Đối tác"
                >
                    {getFieldDecorator('partnerId', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn đối tác!'
                        }]
                    })(
                        <Select
                            onChange={mapSignPartner}
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
                <Form.Item
                    label="Người kí (Đối tác)"
                >
                    {getFieldDecorator('user_partners', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn người ký (đối tác)!'
                        }]
                    })(
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Người ký kết"
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {signPartner.map(sign => (
                                <Option style={{ textAlign: "center" }} key={sign.id} value={sign.id}>{sign.fullname}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="Đơn vị theo dõi"
                >
                    {getFieldDecorator('facultyId', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn khoa!'
                        }]
                    })(
                        <Select
                            onChange={mapSignMember}
                            showSearch
                            placeholder="Tên khoa"
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {member.map(member => (
                                <Option style={{ textAlign: "center" }} key={member.id} value={member.id}>{member.name}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="Người kí"
                >
                    {getFieldDecorator('member_signs', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn người ký!'
                        }]
                    })(
                        <Select
                            mode="multiple"
                            showSearch
                            placeholder="Người ký kết"
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {signMember.map(sign => (
                                <Option style={{ textAlign: "center" }} key={sign.id} value={sign.id}>{sign.fullname}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="Chia sẻ cho các khoa"
                >
                    {getFieldDecorator('faculties')(
                        <Checkbox.Group style={{ textAlign: "left", marginLeft: '100px' }}>
                            {nameFaculty.map(names => (
                                <Checkbox style={{ display: 'block' }} key={names.id} value={names.id}>{names.name}</Checkbox>
                            ))}
                        </Checkbox.Group>
                    )}
                </Form.Item>
                <Form.Item
                    label="Nội dung hợp tác chính"
                >
                    {getFieldDecorator('main_cooperation', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn người ký!'
                        }]
                    })(
                        <Input placeholder="Nội dung hợp tác chính" ></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Lưu ý"
                >
                    {getFieldDecorator('note')(
                        <Input placeholder="Lưu ý" ></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Giá trị thỏa thuận"
                >
                    {getFieldDecorator('contract_value')(
                        <Input placeholder="Giá trị thỏa thuận" ></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Ngày kí"
                >
                    {getFieldDecorator('sign_date', {
                        rules: [{
                            required: true,
                            message: 'Chưa chọn ngày ký!'
                        }]
                    })(
                        <Input type="date"></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Ngày hết hiệu lực"
                >
                    {getFieldDecorator('expiry_date')(
                        <Input type="date"></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Renew"
                >
                    {getFieldDecorator('renew', {
                        initialValue: null
                    })(
                        <Radio.Group name="radiogroup">
                            <Radio value={1} style={{ marginLeft: '5px' }} className="radio_information"> có </Radio>
                            <Radio value={0} className="radio_information"> không </Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item
                    label="File biên bản hợp tác"
                >
                    {getFieldDecorator('file',)(
                        <Upload
                            customRequest={onChooseFile}
                            accept={".docx,.pdf,.xlsx"}
                            multiple={false}
                            fileList={[]}
                        >
                            <Button>
                                <Icon type="upload" /> Click to Upload
                            </Button>
                        </Upload>
                    )}
                </Form.Item>
                    
                <div className="DIVprofile">
                    <Form.Item>
                        <Button className="buttonProfile" type="primary" htmlType="submit">Tạo thỏa thuận</Button>
                    </Form.Item>
                </div>
            </Form>

        </div>
    )
}
export default Form.create()(Cooperation)