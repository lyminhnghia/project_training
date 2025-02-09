import React, { useContext, useEffect, useState } from 'react'
import { Select, Form, notification, Input, Button, Radio, Checkbox, Upload, Icon } from 'antd'
import { getCooperation, getAllName, getAllPartnerCo, getAllMemberCo, updateCooperation, upload } from '../../../../api/base/cooperation/cooperation'
import { getAllNameMemberSign } from '../../../../api/base/general/member_sign'
import { getAllNamePartnerSign } from '../../../../api/base/general/partner_sign'
import HomepageContext from "../../../../context/HomepageContext"
import { useParams } from 'react-router-dom'
import './cooperation-edit.css'
const { Option } = Select

const CooperationEdit = (props) => {
    const { getFieldDecorator } = props.form
    const { id } = useParams()
    const [nameFaculty, setNameFaculty] = useState([])
    const [partner, setPartner] = useState([])
    const [member, setMember] = useState([])
    const [signPartner, setSignPartner] = useState([])
    const [cooperation, setCooperation] = useState([])
    const [signMember, setSignMember] = useState([])
    const [file, setFile] = useState([])
    const [defaultMain, setDefaultMain] = useState([])
    const [defaultMS, setDefaultMS] = useState([])
    const [defaultPS, setDefaultPS] = useState([])
    const [defaultShare, setDefaultShare] = useState([])

    const { setLoading } = useContext(HomepageContext)

    const fetchCooperation = async () => {
        setLoading(true)
        const { success, data } = await getCooperation(id)
        const data1 = await getAllNamePartnerSign()
        const data2 = await getAllNameMemberSign()
        if (success) {
            if (data.success) {
                setSignPartner(data1.data.message)
                setSignMember(data2.data.message)
                setCooperation(data.message)
                var defaultMainValue = ''
                for (let i in data.message.main_cooperations) {
                    defaultMainValue += data.message.main_cooperations[i].main_cooperation
                    if (i != data.message.main_cooperations.length - 1) {
                        defaultMainValue += ' - '
                    }
                }
                setDefaultMain(defaultMainValue)
                let ds = []
                for (let i in data.message.faculties) {
                    ds[i] = data.message.faculties[i].id
                }
                setDefaultShare(ds)
                let dps = []
                for (let i in data.message.user_partners) {
                    dps[i] = data.message.user_partners[i].id
                }
                setDefaultPS(dps)
                let dms = []
                for (let i in data.message.member_signs) {
                    dms[i] = data.message.member_signs[i].id
                }
                setDefaultMS(dms)
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

    const fetchNamePartner = async () => {
        setLoading(true)
        const { success, data } = await getAllNamePartnerSign()
        if (success) {
            if (data.success) {
                setSignPartner(data.message)

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

    const fetchNameMember = async () => {
        setLoading(true)
        const { success, data } = await getAllNameMemberSign()
        if (success) {
            if (data.success) {
                setSignMember(data.message)

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
                const { success } = await updateCooperation(id, values)
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

    useEffect(() => {
        fetchCooperation()
        fetchDataPartner()
        fetchDataMember()
        fetchDataNameFaculty()
        fetchNameMember()
        fetchNamePartner()
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
                        initialValue: cooperation.partnerId,
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
                        initialValue: defaultPS,
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
                            {
                                signPartner.map(sign => (
                                    <Option style={{ textAlign: "center" }} key={sign.id} value={sign.id}>{sign.fullname}</Option>
                                ))
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="Đơn vị theo dõi"
                >
                    {getFieldDecorator('facultyId')(
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
                        initialValue: defaultMS,
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
                    {getFieldDecorator('faculties', {
                        initialValue: defaultShare
                    })(
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
                        initialValue: defaultMain,
                        rules: [{
                            required: true,
                            message: 'Chưa có nội dung hợp tác chính!'
                        }]
                    })

                        (
                            <Input placeholder="Nội dung hợp tác chính" ></Input>
                        )}
                </Form.Item>
                <Form.Item
                    label="Lưu ý"
                >
                    {getFieldDecorator('note', {
                        initialValue: cooperation.note
                    })(
                        <Input placeholder="Lưu ý" ></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Giá trị thỏa thuận"
                >
                    {getFieldDecorator('contract_value', {
                        initialValue: cooperation.contract_value
                    })(
                        <Input placeholder="Giá trị thỏa thuận" ></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Ngày kí"
                >
                    {getFieldDecorator('sign_date', {
                        initialValue: cooperation.sign_date,
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
                    {getFieldDecorator('expiry_date', {
                        initialValue: cooperation.expiry_date,
                    })(
                        <Input type="date"></Input>
                    )}
                </Form.Item>
                <Form.Item
                    label="Renew"
                >
                    {getFieldDecorator('renew', {
                        initialValue: cooperation.renew ? 1 : 0,
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
                    {getFieldDecorator('file', {
                        initialValue: cooperation.file
                    })(
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
                        <Button className="buttonProfile" type="primary" htmlType="submit">Cập nhật</Button>
                    </Form.Item>
                </div>
            </Form>

        </div>
    )
}
export default Form.create()(CooperationEdit)