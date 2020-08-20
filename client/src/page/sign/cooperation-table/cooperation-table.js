import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../context/HomepageContext"
import { Table, Button, Radio, Tag, notification } from 'antd'
import { getAllMyCo } from '../../../api/base/cooperation/cooperation'
import { Link } from 'react-router-dom'

const CooperationTable = () => {
    const [table, setTable] = useState([])
    const [follow, setFollow] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const { setLoading } = useContext(HomepageContext)

    const fetchData = async () => {
        setLoading(true)
        const { success, data } = await getAllMyCo()
        if (success) {
            if (data.success) {
                setTable(data.message)
                setTotal(data.total)
                if (data.data) {
                    setFollow(data.data)
                }
            } else {
                notification['error']({
                    message: data.message
                })
            }
        }
        setLoading(false)
    }


    useEffect(() => {
        fetchData()
    }, [])

    const _onPageChange = (page) => {
        setPage(page)
    }

    const columns = [
        {
            title: "Tên đối tác",
            width: "10%",
            dataIndex: "partner.name",
            key: "partner.name",
            filters: [
                {
                  text: 'FPT',
                  value: 'Công ty Cổ phần FPT',
                },
                {
                  text: 'Viettel',
                  value: 'Tập đoàn Viễn thông Quân đội',
                },
                {
                  text: 'Mobifone',
                  value: 'Công ty CP Công nghệ Công nghiệp Bưu chính Viễn thông',
                }, {
                  text: 'FPT Software',
                  value: 'Công ty TNHH Phần mềm FPT',
                }
            ],
            onFilter: (value, record) => record.partner.name.indexOf(value) === 0,
        }, {
            title:"Người ký (đối tác)",
            dataIndex:"user_partners",
            key:"user_partners",
            width:"10%",
            render:user_partners => (
                <>
                    {user_partners.map(sign => (
                    <Tag color="blue" key={sign.fullname}>
                        {sign.fullname}
                    </Tag>
                    ))}
                </>
            )
        }, {
            title:"Cấp ký kết",
            width:"5%", 
            dataIndex:"account", 
            key:"account",
            render:account => (
                <div>
                    {account.facultyId === null ? "Trường" : "Khoa"}
                </div>
            ),
            filters: [
                {
                  text: 'Trường',
                  value: 'Trường',
                },
                {
                  text: 'Khoa',
                  value: 'Khoa',
                }
            ],
            onFilter: (value, record) => (record.account.facultyId === null ? "Trường" : "Khoa").indexOf(value) === 0,
        }, {
            title:"Người ký",
            dataIndex:"member_signs",
            key:"member_signs",
            width:"10%",
            render:member_signs => (
                <>
                    {member_signs.map(sign => (
                    <Tag color="blue" key={sign.fullname}>
                        {sign.fullname}
                    </Tag>
                    ))}
                </>
            )
        }, {
            title:"Nội dung hợp tác chính",
            width:"20%",
            dataIndex:"main_cooperations",
            key:"main_cooperation",
            render: (main_cooperations) => {
                return <>
                    {main_cooperations.map(main => (
                        <Tag color="blue" key={main.main_cooperation}>
                            {main.main_cooperation}
                        </Tag>
                    ))}
                </>
            }
        }, {
            title:"Ngày ký",
            width:"10%",
            dataIndex:"sign_date",
            key:"sign_date"
        }, {
            title:"Ngày hết hiệu lực",
            width:"10%",
            dataIndex:"expiry_date",
            key:"expiry_date"
        }, {
            title:"Lưu ý",
            width:"5%",
            dataIndex:"note",
            key:"note"
        }, {
            title:"Renew", 
            width:"5%",
            dataIndex:"renew",
            key:"renew",
            render:renew => (
                <Radio.Group value={renew ? 1 : 0}>
                    <Radio disabled value={1}></Radio>
                </Radio.Group>
            )
        }, {
            title:"Sửa", 
            width:"15%", 
            dataIndex:"id",
            fixed: 'right',
            key:"id",
            render:id => (
                <Link to={{pathname:`/cooperation-edit/${id}`}}>
                    <Button style={{ backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 30, width: '50px !important' }}> Sửa </Button>
                </Link>
            )
        }
    ]

    const columnsShare = [
        {
            title: 'Nội dung hợp tác chính',
            dataIndex: 'main_cooperations', 
            render: (main_cooperations) => {
                return <>
                    {main_cooperations.map(main => (
                        <Tag color="blue" key={main.main_cooperation}>
                            {main.main_cooperation}
                        </Tag>
                    ))}
                </>
            }
        }, {
            title: 'Người ký',
            dataIndex: 'member_signs',
            render: (member_signs) => {
                return <>
                    {member_signs.map(sign => (
                        <Tag color="blue" key={sign.fullname}>
                        {sign.fullname}
                        </Tag>
                    ))}
                </>
            }
        }, {
            title: 'Người ký (đối tác)',
            dataIndex: 'user_partners',
            render: (user_partners) => {
                return <>
                    {user_partners.map(sign => (
                        <Tag color="blue" key={sign.fullname}>
                            {sign.fullname}
                        </Tag>
                    ))}
                </>
            }
        }, {
            title: 'Ngày ký',
            dataIndex: 'sign_date'
        }, {
            title: 'Ngày hết hiệu lực',
            dataIndex: 'expiry_date'
        }, {
            title: 'Renew',
            dataIndex: 'renew',
            render: (renew) => {
                return <Radio.Group value={renew ? 1 : 0}>
                    <Radio disabled value={1}></Radio>
                </Radio.Group>
            }
        }
    ]

    return (
        <div>
            <div className="title-profile-s">QLHĐ hợp tác</div>
            <Table 
                columns={columns}
                dataSource={table}
                bordered 
                scroll={{x: 'max-content'}} 
                pagination={{
                    onChange: _onPageChange,
                    current: page,
                    total: total,
                    pageSize: 10,
                    showQuickJumper: true
                }}
            />
            <div className="title-profile-s">HĐHT được chia sẻ</div>
            <Table
                columns={columnsShare} 
                dataSource={follow}
                bordered 
                scroll={{x: 'max-content'}} 
                pagination={{
                    onChange: _onPageChange,
                    current: page,
                    total: total,
                    pageSize: 10,
                    showQuickJumper: true
                }}
            />
        </div>
    )
}

export default CooperationTable