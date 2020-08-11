import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../context/HomepageContext"
import { Table, Button, notification } from 'antd'
import { getAllCountry } from '../../../api/base/admin/country'
import AddCountry from './modal/AddCountry'
import EditCountry  from './modal/EditCountry'
import DeleteCountry from './modal/DeleteCountry'

const CountryTable = () => {
    const [table, setTable] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)

    const fetchData = async (page) => {
        setLoading(true)
        const { success, data } = await getAllCountry(page)
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
            title: 'Tên Quốc Gia',
            dataIndex: 'country',
            width: '30%'
        }, {
            title: 'Châu Lục',
            dataIndex: 'continent',
            width: '30%'
        }, {
            title: 'Sửa',
            dataIndex: 'id',
            width: '20%',
            render: (id) => {
              return <span> 
                  <EditCountry id={id} resetData={() => fetchData(page)}/>
              </span>
            }
        }, {
            title: 'Xóa',
            dataIndex: 'id',
            width: '20%',
            render: (id) => {
              return <div>               
                  <DeleteCountry id={id} resetData={() => fetchData(page)}/>
              </div>
          }
        }
    ]

    return (
        <div>
            <Button type="primary" onClick={showModal}
                        style={{backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 32}}>
                    Thêm quốc gia
            </Button>
            <AddCountry visible={visible} onCancel={handleCancel} setVisible={setVisible}
                                resetData={() => fetchData(page)}/>

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

export default CountryTable