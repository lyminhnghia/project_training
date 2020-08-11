import React, {useState} from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter } from "react-router-dom";
import NavBar from './component/navbar/NavBar';
import { Breadcrumb } from "antd";
import _ from 'lodash';
import HomepageContext from "../../context/HomepageContext";
import { checkAuth } from '../../api/auth/auth';
import Loading from './component/loading/Spin';
import ChangePass from './component/change-password/ChangePass'
import './Homepage.css'
function HomePage(props) {
    if (!checkAuth()) {
        props.history.push('/login')
    }
    const [nameMap, setNameMap] = useState({})
    const [isLoading, setLoading] = useState(false)

    const breadcrumb = _.map(nameMap, (name, url) => {
        return (
            <Breadcrumb.Item key={url}>
                <a href={url}>{name}</a>
            </Breadcrumb.Item>
        )
    })

    return (
        <div className="container-fluid">            
            <div className="row homePageBlood">
            {isLoading && <Loading/>}
                <div className="menu-left">
                    <NavBar />
                </div>
                <HomepageContext.Provider value={{
                    nameMap,
                    setNameMap,
                    isLoading,
                    setLoading
                }}>
                    <div className="content-right" >
                        <Breadcrumb className="bread-crumb-s">{breadcrumb}</Breadcrumb>
                        {renderRoutes(props.route.routes)}
                        <ChangePass/>
                    </div>
                </HomepageContext.Provider>
            </div>
        </div>
    )
}

export default withRouter(HomePage)
