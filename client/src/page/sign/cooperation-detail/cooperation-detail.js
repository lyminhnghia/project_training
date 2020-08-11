import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../context/HomepageContext"
import { Table, notification } from 'antd'
import { getAllCoMain } from '../../../api/base/cooperation/cooperation-detail'
import EditCooDetail from './modal/edit-coo-detail'

const CooperationDetail = () => {
    const [table, setTable] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const { setLoading } = useContext(HomepageContext)

    const fetchData = async (page) => {
        setLoading(true)
        const { success, data } = await getAllCoMain(page)
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
        fetchData(1)
    }, [])

    const _onPageChange = (page) => {
        setPage(page)
        setTable([])
        fetchData(page)
    }

    const columns = [
        {
            title: 'Nội dung hợp tác chính',
            dataIndex: 'main_cooperation'
        }, {
            title: 'Nội dung hợp tác cụ thể',
            dataIndex: 'specific_cooperation'
        }, {
            title: 'Chi phí',
            dataIndex: 'expense'
        }, {
            title: 'Sửa',
            dataIndex: 'id',
            render: (id) => {
              return <span> 
                  <EditCooDetail id={id} resetData={() => fetchData(page)}/>
              </span>
            }
        }
    ]

    return (
        <div>
            <Table 
                columns={columns}
                bordered
                dataSource={table} 
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

export default CooperationDetail