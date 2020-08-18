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
        <div>
            <h1 className="headerNotify">Danh sách các hợp đồng sắp hết hạn</h1>
            <div className="site-card-wrapper">
                <Row gutter={24}>
                    {notify.map((search, index) => (
                        <Col span={8}>
                            <Card 
                                title={
                                    <div className="headerCooperation">
                                        {search.main_cooperations[0].main_cooperation}
                                    </div>
                                } 
                                bordered={true} 
                                type="inner"
                                extra={<Link to={{pathname:`/cooperation-edit/${search.id}`}}>
                                    <Button style={{ 
                                        fontFamily: "Trocchi", 
                                        borderWidth: 2, 
                                        borderRadius: 20, 
                                        backgroundColor: 'white', 
                                        color: '#253b80', 
                                        whiteSpace: 'inherit', 
                                        height: 30, 
                                        width: '50px !important' }}>
                                            Gia hạn
                                    </Button>
                                </Link>}
                                
                                style={{marginBottom: 20, borderRadius: 20, borderStyle: "ridge", borderColor: "#253b80", borderWidth: 5}}
                            >
                                <div>
                                    <h4 className="headerCooperation">Đối tác</h4>
                                    <p className="headerCooperation">{search.partner.name}</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                    <h4 style={{color: '#253b80'}}>Còn lại</h4>
                                    <h5 style={{color: '#253b80'}}>{moment(search.expiry_date).diff(Date.now(), 'day') + 1} ngày</h5>
                                </div>
                            </Card>
                        </Col>))}
                </Row>
            </div>
        </div>
    )
}

export default Notify