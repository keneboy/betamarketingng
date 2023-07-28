import { lazy } from 'react'
const Home = lazy(() => import("pages/Home"))
const AdminLogin = lazy(() => import("pages/AdminLogin"))
const NotFound = lazy(() => import("pages/NotFound"))
const Property = lazy(() => import("pages/Property"))
const Contact = lazy(() => import("pages/Contact"))
const Properties = lazy(() => import("pages/Properties"))
const AboutUs = lazy(() => import("pages/AboutUs"))
const Services = lazy(() => import("pages/Services"))
// const ProductList = lazy(()=> import()) "components/Products/ProductList"
const EditProperty = lazy(() => import("components/EditProperty"))
const Listing = lazy(() => import("components/Listing"))
const Messages = lazy(() => import('components/Messages'))
const Message = lazy(() => import('components/Message'))
const Portal = lazy(() => import('pages/Portal'))
const ConsultLogin = lazy(() => import('pages/Consultant/ConsultLogin'))
const MajorConsult = lazy(() => import('pages/Consultant/MajorConsult'))
const SettingConsultant = lazy(() => import('pages/Consultant/SettingConsultant'))
const Password = lazy(() => import('components/Password'))
const DataTable = lazy(() => import("components/Consultants"))
const InviteSuccess = lazy(() => import('components/InviteSuccess'))
const NewProperty = lazy(() => import('pages/NewProperty'))
const AdminPassword = lazy(() => import('pages/AdminPassword'))
const ConsultPayment = lazy(() => import("pages/Consultant/ConsultPayment"))
const ConsultantDownline = lazy(() => import('pages/Consultant/ConsultantDownline'))
const WidthdrawalList = lazy(() => import('pages/WithdrawalList'))

const routePath = () => {
    const publicRoutes = [
        {
            path: '/',
            component: Home
        },
        {
            path: '/property/:id',
            component: Property
        },
        {
            path: '/contact',
            component: Contact
        },
        {
            path: '/properties',
            component: Properties
        },
        {
            path: '/services',
            component: Services
        },
        {
            path: '/about',
            component: AboutUs
        },
        {
            path: '/portal/*',
            component: Portal
        },
        {
            path: '/consultant',
            component: ConsultLogin
        },
        {
            path: '/portal/registration/email_sent',
            component: InviteSuccess
        },
        {
            path: '/adminlogin',
            component: AdminLogin
        },
        {
            path: '*',
            component: NotFound
        },
    ]
    const privateRoutes = [
        {
            path: '',
            component: Listing
        },
        {
            path: 'password',
            component: AdminPassword
        },
        {
            path: 'properties',
            component: Listing
        },
        {
            path: 'messages',
            component: Messages
        },
        {
            path: 'consultants',
            component: DataTable
        },
        {
            path: 'widthdrawal_list',
            component: WidthdrawalList
        },
        {
            path: 'message/:id',
            component: Message
        },
        {
            path: 'editproperty/:id',
            component: EditProperty
        },
        {
            path: 'add_property',
            component: NewProperty
        },
    ]
    const privateRoutesConsultant = [
        {
            path: '',
            component: MajorConsult
        },
        {
            path: "setting",
            component: SettingConsultant
        },
        {
            path: 'update_password',
            component: Password
        },
        {
            path: 'downline',
            component: ConsultantDownline
        },
        {
            path: 'widthdrawal',
            component: ConsultPayment
        },
    ]
    return { publicRoutes, privateRoutes, privateRoutesConsultant }
}
export default routePath




