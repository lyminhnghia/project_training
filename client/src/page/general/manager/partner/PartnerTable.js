import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../../context/HomepageContext"
import { Table, Button, notification } from 'antd'
import { getAllPartner } from '../../../../api/base/general/partner'
import { getAllNameCountry } from '../../../../api/base/admin/country'
import AddPartner from './modal/AddPartner'
import EditPartner  from './modal/EditPartner'
import DeletePartner from './modal/DeletePartner'

const CountryTable = () => {
    const [table, setTable] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [country, setCountry] = useState([])
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)

    const fetchData = async (page) => {
        setLoading(true)
        const { success, data } = await getAllPartner(page)
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

    const fetchDataCountry = async () => {
      setLoading(true)
      const { success, data } = await getAllNameCountry()
      if (success) {
          if (data.success) {
              setCountry(data.message)
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
        fetchDataCountry()
    }, [])

    const _onPageChange = (page) => {
        setPage(page)
        setTable([])
        fetchData(page)
    }

    const columns = [
        {
            title: 'Tên đối tác',
            dataIndex: 'name',
            width: '15%'
        }, {
            title: 'Tên viết tắt',
            dataIndex: 'abbreviation',
            width: '10%'
        }, {
            title: 'Tên giám đốc/hiệu trưởng',
            dataIndex: 'president'
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
            title: 'Quốc gia',
            dataIndex: 'country.country'
        }, {
            title: 'Sửa',
            dataIndex: 'id',
            fixed: 'right',
            render: (id) => {
              return <span> 
                  <EditPartner id={id} resetData={() => fetchData(page)} country={country}/>
              </span>
            }
        }, {
            title: 'Xóa',
            dataIndex: 'id',
            fixed: 'right',
            render: (id) => {
              return <div>               
                  <DeletePartner id={id} resetData={() => fetchData(page)}/>
              </div>
          }
        }
    ]

    return (
        <div>
            <Button type="primary" onClick={showModal}
                        style={{backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 32}}>
                    Thêm đối tác
            </Button>
            <AddPartner visible={visible} onCancel={handleCancel} setVisible={setVisible}
                                resetData={() => fetchData(page)} country={country}/>

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