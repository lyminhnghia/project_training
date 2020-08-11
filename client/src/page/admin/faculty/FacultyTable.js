import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../context/HomepageContext"
import { Table, Button, notification } from 'antd'
import { getTableFaculty } from '../../../api/base/admin/admin'
import AddFacultyModal from './modal/AddFacultyModal'
import EditFaculty from './modal/EditFaculty'
import DeleteFaculty from './modal/DeleteFaculty'

const FacultyTable = () => {
    const [table, setTable] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)

    const fetchData = async (page) => {
        setLoading(true)
        const { success, data } = await getTableFaculty(page)
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

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    useEffect(() => {
        fetchData(1)
    }, [])

    const _onPageChange = (page) => {
        setPage(page)
        setTable([])
        fetchData(page)
    }

    const columns = [
        {
            title: 'Tên khoa, viện',
            dataIndex: 'name'
        }, {
            title: 'Tên viết tắt',
            dataIndex: 'abbreviation'
        }, {
            title: 'Ngày thành lập',
            dataIndex: 'founding_date'
        }, {
            title: 'Điện thoại',
            dataIndex: 'phone'
        }, {
            title: 'Địa chỉ',
            dataIndex: 'address'
        }, {
            title: 'Email',
            dataIndex: 'email'
        }, {
            title: 'Website',
            dataIndex: 'website'
        }, {
            title: 'Sửa',
            dataIndex: 'id',
            render: (id) => {
              return <span> 
                  <EditFaculty id={id} resetData={() => fetchData(page)}/>
              </span>
            }
        }, {
            title: 'Xóa',
            dataIndex: 'id',
            render: (id) => {
              return <div>               
                  <DeleteFaculty id={id} resetData={() => fetchData(page)}/>
              </div>
            }
        }
    ]

    return (
        <div>
            <Button type="primary" onClick={showModal}
                        style={{backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 32}}>
                    Thêm khoa, viện
            </Button>
            <AddFacultyModal visible={visible} onCancel={handleCancel} setVisible={setVisible}
                                resetData={() => fetchData(page)}/>

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
        </div>
    )
}

export default FacultyTable