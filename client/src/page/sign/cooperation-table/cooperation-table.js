import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../context/HomepageContext"
import { Table, Button, Radio, Tag, notification } from 'antd'
import { getAllMyCo } from '../../../api/base/cooperation/cooperation'

const {Column} = Table

const CooperationTable = () => {
    const [table, setTable] = useState([])
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

    return (
        <div>
            <Table
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
            >
                <Column title="Tên đối tác" width="10%" dataIndex="partner.name" key="partner.name"/>
                <Column 
                    title="Người ký (đối tác)"
                    dataIndex="user_partners"
                    key="user_partners"
                    width="10%"
                    render={user_partners => (
                        <>
                          {user_partners.map(sign => (
                            <Tag color="blue" key={sign.fullname}>
                              {sign.fullname}
                            </Tag>
                          ))}
                        </>
                    )}
                />
                <Column title="Cấp ký kết" width="5%" dataIndex="account" key="partner.name"
                    render={account => (
                        <div>
                            {account.facultyId === null ? "Trường" : "Khoa"}
                        </div>
                    )}
                />
                <Column 
                    title="Người ký"
                    dataIndex="member_signs"
                    key="member_signs"
                    width="10%"
                    render={member_signs => (
                        <>
                          {member_signs.map(sign => (
                            <Tag color="blue" key={sign.fullname}>
                              {sign.fullname}
                            </Tag>
                          ))}
                        </>
                    )}
                />
                <Column title="Nội dung hợp tác chính" width="20%" dataIndex="main_cooperations[0].main_cooperation" key="main_cooperation"/>
                <Column title="Ngày ký" width="10%" dataIndex="sign_date" key="sign_date"/>
                <Column title="Ngày hết hiệu lực" width="10%" dataIndex="expiry_date" key="expiry_date"/>
                <Column title="Lưu ý" width="5%" dataIndex="note" key="note"/>
                <Column 
                    title="Renew" 
                    width="5%"
                    dataIndex="renew"
                    key="renew"
                    render={renew => (
                        <Radio.Group value={renew ? 1 : 0}>
                            <Radio disabled value={1}></Radio>
                        </Radio.Group>
                    )}
                />
                <Column 
                    title="Sửa" 
                    width="15%" 
                    dataIndex="renew" 
                    key="renew"
                    render={member_signs => (
                        <>
                          <Button></Button>
                        </>
                    )}
                />
            </Table>
        </div>
    )
}

export default CooperationTable