import React, { useContext, useState, useEffect } from 'react'
import { notification } from 'antd'
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
        <div className="para-unit-profile"> 
            {
                notify.map((search,index) =>(
                    <div key={"U-"+index}>                       
                        <ul className="panel-heading list-group-blood " data-toggle="collapse">
                            <Link to={{pathname:`/cooperation-edit/${search.id}`}}>
                                <div className="AFM">
                                    {index + 1}. Thỏa thuận hợp tác "{search.main_cooperations[0].main_cooperation}" ký với {search.partner.name} còn {moment(search.expiry_date).diff(Date.now(), 'day') + 1} ngày nữa sẽ hết hạn, bạn có muốn làm mới?
                                </div>
                            </Link>
                        </ul>
                    </div>                   
                ))              
            }
        </div>
    )
}

export default Notify