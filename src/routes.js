import InitPage from './pages/01.InitPage.vue';
import LoginPage from './pages/02.LoginPage.vue';
import SettingsPage from './pages/03.SettingsPage.vue';
import HomePage from './pages/04.HomePage.vue';
import SelectDoctorPage from './pages/05.SelectDoctorPage.vue';
import SchedulePage from './pages/12.SchedulePage.vue';
import CancelSchedulePage from './pages/13.CancelSchedulePage.vue';
import NewAppointmentPage from './pages/06.NewAppointmentPage.vue';
import PatientsListPage from './pages/07.PatientsListPage.vue';
import ReasonsPage from './pages/08.ReasonsPage.vue';
import AvailableDatesPage from './pages/09.AvailableDatesPage.vue';
import AvailabilityPage from './pages/10.AvailabilityPage.vue';
import ConfirmAppointmentPage from './pages/11.ConfirmAppointmentPage.vue';
import NewPatientPage from './pages/14.NewPatientPage.vue';
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
        path: '/select-doctor',
        component: SelectDoctorPage
    },
    {
        path: '/schedule',
        component: SchedulePage
    },
    {
        path: '/cancel-schedule/:code',
        component: CancelSchedulePage,
        props: true
    },
    {
        path: '/new-appointment',
        component: NewAppointmentPage
    },
    {
        path: '/patients-list/:returnto?',
        component: PatientsListPage,
        props: true
    },
    {
        path: '/select-reason',
        component: ReasonsPage
    },
    {
        path: '/available-dates',
        component: AvailableDatesPage
    },
    {
        path: '/check-availability',
        component: AvailabilityPage
    },
    {
        path: '/confirm-appointment',
        component: ConfirmAppointmentPage
    },
    {
        path: '/new-patient/:returnto?',
        component: NewPatientPage,
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
