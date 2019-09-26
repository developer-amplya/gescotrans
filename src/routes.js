import InitPage from './pages/01.InitPage.vue';
import LoginPage from './pages/02.LoginPage.vue';
import SettingsPage from './pages/03.SettingsPage.vue';
import HomePage from './pages/04.HomePage.vue';
import ViewTraffic from './pages/05.ViewTraffic.vue';
import DeliveryNote from './pages/06.DeliveryNote.vue';
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
        path: '/settings',
        component: SettingsPage
    },
    {
        path: '/home',
        component: HomePage
    },
    {
        path: '/view-traffic',
        component: ViewTraffic
    },
    {
        path: '/delivery-note',
        component: DeliveryNote
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
