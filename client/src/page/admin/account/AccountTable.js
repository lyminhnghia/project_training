import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../context/HomepageContext"
import { Table, Button, notification } from 'antd'
import { getTableAccount, getAllNameFaculty } from '../../../api/base/admin/admin'
import AddAccountModal from './modal/AddAccountModal'
import EditAccount  from './modal/EditAccount'
import DeleteAccount from './modal/DeleteAccount'

const AccountTable = () => {
    const [table, setTable] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [faculty, setFaculty] = useState([])
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)

    const fetchData = async (page) => {
        setLoading(true)
        const { success, data } = await getTableAccount(page)
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

    const fetchDataFaculty = async () => {
      setLoading(true)
      const { success, data } = await getAllNameFaculty()
      if (success) {
          if (data.success) {
              setFaculty(data.message)
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
        fetchDataFaculty()
    }, [])

    const _onPageChange = (page) => {
        setPage(page)
        setTable([])
        fetchData(page)
    }

    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'username',
            width: '15%'
        }, {
            title: 'Email',
            dataIndex: 'mail',
            width: '25%'
        }, {
            title: 'Tên khoa',
            dataIndex: 'faculty.name',
            width: '35%'
        }, {
            title: 'Sửa',
            dataIndex: 'id',
            width: '13%',
            render: (id) => {
              return <span> 
                  <EditAccount idUser={id} resetData={() => fetchData(page)} faculty={faculty}/>
              </span>
            }
        }, {
            title: 'Xóa',
            dataIndex: 'id',
            width: '12%',
            render: (id) => {
              return <div>               
                  <DeleteAccount id={id} resetData={() => fetchData(page)}/>
              </div>
          }
        }
    ]

    return (
        <div>
            <Button type="primary" onClick={showModal}
                        style={{backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 32}}>
                    Thêm người theo dõi
            </Button>
            <AddAccountModal visible={visible} onCancel={handleCancel} setVisible={setVisible}
                                resetData={() => fetchData(page)} faculty={faculty}/>

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

export default AccountTable