import React, { useContext, useEffect, useState } from 'react'
import { Select, Form, notification, Input, Button, Radio, Checkbox, Icon, Upload } from 'antd'
import { getAllName, getAllPartnerCo, getAllMemberCo, addCooperation, upload } from '../../../api/base/cooperation/cooperation'
import HomepageContext from "../../../context/HomepageContext"
import './cooperation.css'
const {Option} = Select

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
                const result = await upload(file)
                if (result.success) {
                    values.file = result.data.file
                }
                const {success} = await addCooperation(values)
                setLoading(false)
                if (success) {
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

    useEffect(()=> {
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

    return (
        <div className="para-profile-member">
            <div className="para-content-profiles-s">
                <Form onSubmit={handleSubmit} className="row">
                    <Form.Item action="" method="post" className="information" style={{marginBottom:0}}>
                        <div>
                            <div className="title-profile-s">Thỏa thuận hợp tác</div>
                            <div className="body-border-profile-s">
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Đối tác </label>
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
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Người ký (đối tác) </label>
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
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Đơn vị theo dõi</label>
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
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Người ký</label>
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
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Chia sẻ cho các khoa </label>
                                    {getFieldDecorator('faculties')(
                                        <Checkbox.Group style={{ textAlign: "center" }}>
                                            {nameFaculty.map(names => (
                                                <Checkbox key={names.id} value={names.id}>{names.name}</Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    )}
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Nội dung hợp tác chính </label>
                                    {getFieldDecorator('main_cooperation')(
                                        <Input placeholder="Nội dung hợp tác chính" ></Input>
                                    )}
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Lưu ý </label>
                                    {getFieldDecorator('note')(
                                        <Input placeholder="Lưu ý" ></Input>
                                    )}
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Giá trị thỏa thuận </label>
                                    {getFieldDecorator('contract_value')(
                                        <Input placeholder="Giá trị thỏa thuận" ></Input>
                                    )}
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Ngày ký </label>
                                    {getFieldDecorator('sign_date', {
                                        rules: [{
                                            required: true,
                                            message: 'Chưa chọn ngày ký!'
                                        }]
                                    })(
                                        <Input type="date"></Input>
                                    )}
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Ngày hết hiệu lực </label>
                                    {getFieldDecorator('expiry_date')(
                                        <Input type="date"></Input>
                                    )}
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> Renew </label>
                                    {getFieldDecorator('renew')(
                                        <Radio.Group defaultValue={null} name="radiogroup">
                                            <Radio value={1} style={{ marginLeft: '5px'}} className="radio_information"> có </Radio>
                                            <Radio value={0} className="radio_information"> không </Radio>
                                        </Radio.Group>
                                    )}
                                </div>
                                <div className="border-bottom-profile-s">
                                    <label className="label-profile-s"> File biên bản hợp tác </label>
                                    {getFieldDecorator('file')(
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
                                </div>
                            </div>
                        </div>
                    </Form.Item>
                    <div className="DIVprofile">
                        <Form.Item>
                            <Button className="buttonProfile" type="primary" htmlType="submit">Tạo thỏa thuận</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}
export default Form.create()(Cooperation)