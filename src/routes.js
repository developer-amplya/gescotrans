import InitPage from './pages/01.InitPage.vue';
import LoginPage from './pages/02.LoginPage.vue';
import LicensePlatePage from './pages/02b.LicensePlatePage';
import SettingsPage from './pages/03.SettingsPage.vue';
import HomeAdminPage from './pages/04a.HomeAdminPage.vue';
import HomeDriverPage from './pages/04b.HomeDriverPage.vue';
import ViewTraffic from './pages/05.ViewTraffic.vue';
import DeliveryNote from './pages/06.DeliveryNote.vue';
import CargoNoteSelectService from './pages/07a.CargoNoteSelectService.vue';
import CargoNoteCustomService from './pages/07b.CargoNoteCustomService.vue';
import EditCargoNote from './pages/07c.EditCargoNote.vue';
import CustomersList from './pages/08.CustomersList.vue';
import ServicesList from './pages/09.ServicesList.vue';
import SuppliersList from './pages/10.SuppliersList.vue';
import LicensePlatesList from './pages/11.LicensePlatesList.vue';
import DriversList from './pages/12.DriversList.vue';
import CalendarPage from './pages/13.CalendarPage.vue';
import OrdersPage from './pages/14.OrdersPage.vue';
import OrderDetailPage from './pages/15.OrderDetailPage.vue';
import ResetStorePage from './pages/ResetStorePage.vue';
import PanelRightPage from './pages/panel-right.vue';
import NotFoundPage from './pages/not-found.vue';

export default [
    {
        path: '/',
        component: InitPage
    },
    {
        path: '/login',
        component: LoginPage,
        history: false
    },
    {
        path: '/license-plate',
        component: LicensePlatePage,
    },
    {
        path: '/settings',
        component: SettingsPage
    },
    {
        path: '/home-admin',
        component: HomeAdminPage
    },
    {
        path: '/home-driver',
        component: HomeDriverPage
    },
    {
        path: '/view-traffic',
        component: ViewTraffic
    },
    {
        path: '/delivery-note/:shipment_code',
        component: DeliveryNote,
        props: true,
    },
    {
        path: '/cargo-note-select-service',
        component: CargoNoteSelectService
    },
    {
        path: '/cargo-note-custom-service',
        component: CargoNoteCustomService
    },
    {
        path: '/edit-cargo-note/:code',
        component: EditCargoNote,
        props: true,
    },
    {
        path: '/customers-list',
        component: CustomersList
    },
    {
        path: '/services-list',
        component: ServicesList
    },
    {
        path: '/suppliers-list',
        component: SuppliersList
    },
    {
        path: '/license-plates-list/:supplier',
        component: LicensePlatesList,
        props: true
    },
    {
        path: '/drivers-list/:supplier',
        component: DriversList,
        props: true
    },
    {
        path: '/calendar',
        component: CalendarPage
    },
    {
        path: '/orders-page/:action',
        component: OrdersPage,
        props: true
    },
    {
        path: '/order-detail-page/:action',
        component: OrderDetailPage,
        props: true
    },
    {
        path: '/reset-store',
        component: ResetStorePage
    },
    {
        path: '/panel-right/',
        component: PanelRightPage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
