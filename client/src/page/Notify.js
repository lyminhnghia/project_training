import React, { useContext, useState, useEffect } from 'react'
import { notification, Card, Col, Row, Button } from 'antd'
import HomepageContext from '../context/HomepageContext'
import { notifyCooperation } from '../api/base/notify/notify'
import { checkAuth } from '../api/auth/auth'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Notify.css'

const Notify = () => {
    const [notify, setNotify] = useState([])
    const { setLoading } = useContext(HomepageContext)
    
    const fetchData = async () => {
        setLoading(true)
        if (checkAuth()) {
            const { success, data } = await notifyCooperation()
            if (success) {
                if (data.success) {
                    setNotify(data.message)
                } else {
                    notification['error']({
                        message: data.message
                    })
                }
            } else {
                notification['error']({
                    message: "Có lỗi xảy ra!!!!"
                })
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <>
            <h1 style={{marginBottom: 20}}>Danh sách các hợp đồng sắp hết hạn</h1>
            <div className="site-card-wrapper">
                <Row gutter={24}>
                    {notify.map((search, index) => (
                        <Col span={8}>
                            <Card 
                                title={search.main_cooperations[0].main_cooperation} 
                                bordered={true} 
                                type="inner"
                                extra={<Link to={{pathname:`/cooperation-edit/${search.id}`}}>
                                    <Button style={{ backgroundColor: 'white', color: '#1890ff', whiteSpace: 'inherit', height: 30, width: '50px !important' }}>
                                        Gia hạn
                                    </Button>
                                </Link>}
                                
                                style={{marginBottom: 20}}
                            >
                                <div>
                                    <h4>Công ty</h4>
                                    <p>{search.partner.name}</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                    <h4>Còn lại</h4>
                                    <h5 style={{color: '#4f8db3'}}>{moment(search.expiry_date).diff(Date.now(), 'day') + 1} ngày</h5>
                                </div>
                            </Card>
                        </Col>))}
                </Row>
            </div>
        </>
    )
}

export default Notify