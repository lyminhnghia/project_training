import React, { useContext, useState, useEffect } from 'react'
import HomepageContext from "../../../../context/HomepageContext"
import { Table, Button, notification } from 'antd'
import { getAllMemberSign } from '../../../../api/base/general/member_sign'
import { getAllNameFaculty } from '../../../../api/base/admin/admin'
import AddMemberSign from './modal/AddMemberSign'
import EditMemberSign  from './modal/EditMemberSign'
import DeleteMemberSign from './modal/DeleteMemberSign'

const MemberSignTable = () => {
    const [table, setTable] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [faculty, setFaculty] = useState([])
    const { setLoading } = useContext(HomepageContext)
    const [visible, setVisible] = useState(false)

    const fetchData = async (page) => {
        setLoading(true)
        const { success, data } = await getAllMemberSign(page)
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
            title: 'Tên người ký kết',
            dataIndex: 'fullname'
        }, {
            title: 'Email',
            dataIndex: 'email'
        }, {
            title: 'Số điện thoại',
            dataIndex: 'phone'
        }, {
            title: 'Chức vụ',
            dataIndex: 'job_title'
        }, {
            title: 'Khoa',
            dataIndex: 'faculty.name'
        }, {
            title: 'Sửa',
            dataIndex: 'id',
            render: (id) => {
              return <span> 
                  <EditMemberSign id={id} resetData={() => fetchData(page)} faculty={faculty}/>
              </span>
            }
        }, {
            title: 'Xóa',
            dataIndex: 'id',
            render: (id) => {
              return <div>               
                  <DeleteMemberSign id={id} resetData={() => fetchData(page)}/>
              </div>
          }
        }
    ]

    return (
        <div>
            <Button type="primary" onClick={showModal}
                        style={{backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 32}}>
                    Thêm người ký kết
            </Button>
            <AddMemberSign visible={visible} onCancel={handleCancel} setVisible={setVisible}
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

export default MemberSignTable