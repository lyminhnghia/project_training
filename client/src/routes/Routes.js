import HomePage from '../page/homepage/HomePage'
import signIn from '../page/login/Login'
import FacultyTable from '../page/admin/faculty/FacultyTable'
import AccountTable from '../page/admin/account/AccountTable'
import CountryTable from '../page/admin/country/CountryTable'
import PartnerTable from '../page/general/manager/partner/PartnerTable'
import PartnerSignTable from '../page/general/manager/partner-sign/PartnerSignTable'
import MemberSignTable from '../page/general/manager/member-sign/MemberSignTable'
import Cooperation from '../page/sign/cooperation/cooperation'
import CooperationDetail from '../page/sign/cooperation-detail/cooperation-detail'
import CooperationTable from '../page/sign/cooperation-table/cooperation-table'
import test from '../page/admin/test'
const routes = [
    {
        path: "/login",
        exact: true,
        component: signIn
    },
    {
        component: HomePage,
        routes: [
            {
                path: "/",
                exact: true,
                component: test,
            }, {
                path: "/admin/manager-faculty",
                exact: true,
                component: FacultyTable
            }, {
                path: "/admin/manager-account",
                exact: true,
                component: AccountTable
            }, {
                path: "/admin/manager-country",
                exact: true,
                component: CountryTable
            }, {
                path: "/general/manager-partner",
                exact: true,
                component: PartnerTable
            }, {
                path: "/general/manager-partner-sign",
                exact: true,
                component: PartnerSignTable
            }, {
                path: "/general/manager-member-sign",
                exact: true,
                component: MemberSignTable
            }, {
                path: "/general/cooperation",
                exact: true,
                component: Cooperation
            }, {
                path: "/general/cooperation-detail",
                exact: true,
                component: CooperationDetail
            }
            , {
                path: "/general/cooperation-table",
                exact: true,
                component: CooperationTable
            }
        ]
    },
]

export default routes