import React from 'react'
import { Spin } from 'antd';
import './loading.scss'

const Loading = () => {
    return (
        <div className="example">
            <Spin />
        </div>
    )
}
export default Loading;