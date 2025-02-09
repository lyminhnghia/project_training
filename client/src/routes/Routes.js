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
import CooperationEdit from '../page/sign/cooperation-table/form/cooperation-edit'
import Notify from '../page/Notify'
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
                component: Notify,
            }, {
                path: "/manager-faculty",
                exact: true,
                component: FacultyTable
            }, {
                path: "/manager-account",
                exact: true,
                component: AccountTable
            }, {
                path: "/manager-country",
                exact: true,
                component: CountryTable
            }, {
                path: "/manager-partner",
                exact: true,
                component: PartnerTable
            }, {
                path: "/manager-partner-sign",
                exact: true,
                component: PartnerSignTable
            }, {
                path: "/manager-member-sign",
                exact: true,
                component: MemberSignTable
            }, {
                path: "/cooperation",
                exact: true,
                component: Cooperation
            }, {
                path: "/cooperation-detail",
                exact: true,
                component: CooperationDetail
            }
            , {
                path: "/cooperation-table",
                exact: true,
                component: CooperationTable
            }, {
                path: "/cooperation-edit/:id",
                exact: true,
                component: CooperationEdit
            }
        ]
    },
]

export default routes