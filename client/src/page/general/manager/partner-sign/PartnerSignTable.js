import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../../context/HomepageContext"
import { Table, Button, notification } from 'antd'
import { getAllPartnerSign } from '../../../../api/base/general/partner_sign'
import { getAllNamePartner } from '../../../../api/base/general/partner'
import AddPartnerSign from './modal/AddPartnerSign'
import EditPartnerSign  from './modal/EditPartnerSign'
import DeletePartnerSign from './modal/DeletePartnerSign'

const PartnerSignTable = () => {
    const [table, setTable] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [partner, setPartner] = useState([])
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)

    const fetchData = async (page) => {
        setLoading(true)
        const { success, data } = await getAllPartnerSign(page)
        if (success) {
            if (data.success) {
                setTable(data.message)
                setTotal(data.total)
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
      const { success, data } = await getAllNamePartner()
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

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    useEffect(() => {
        fetchData(1)
        fetchDataPartner()
    }, [])

    const _onPageChange = (page) => {
        setPage(page)
        setTable([])
        fetchData(page)
    }

    const columns = [
        {
            title: 'Tên người ký kết',
            dataIndex: 'fullname'
        }, {
            title: 'Ngày sinh',
            dataIndex: 'date_of_birth'
        }, {
            title: 'Email',
            dataIndex: 'email'
        }, {
            title: 'Địa chỉ',
            dataIndex: 'address'
        }, {
            title: 'Chức vụ',
            dataIndex: 'job_title'
        }, {
            title: 'Đối tác',
            dataIndex: 'partner.name'
        }, {
            title: 'Sửa',
            dataIndex: 'id',
            render: (id) => {
              return <span> 
                  <EditPartnerSign id={id} resetData={() => fetchData(page)} partner={partner}/>
              </span>
            }
        }, {
            title: 'Xóa',
            dataIndex: 'id',
            render: (id) => {
              return <div>               
                  <DeletePartnerSign id={id} resetData={() => fetchData(page)}/>
              </div>
          }
        }
    ]

    return (
        <div>
            <Button type="primary" onClick={showModal}
                        style={{backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 32}}>
                    Thêm người ký kết (Đối tác)
            </Button>
            <AddPartnerSign visible={visible} onCancel={handleCancel} setVisible={setVisible}
                                resetData={() => fetchData(page)} partner={partner}/>

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

export default PartnerSignTable