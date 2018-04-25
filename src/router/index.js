import Vue from 'vue'
import Router from 'vue-router'

import Cars from '@/pages/Cars/Index'
import CarsAdd from '@/pages/Cars/Add'
import CarsEdit from '@/pages/Cars/Edit'
import CarsDetails from '@/pages/Cars/Details'

import Employees from '@/pages/Employees/Index'
import EmployeesAdd from '@/pages/Employees/Add'
import EmployeesEdit from '@/pages/Employees/Edit'
import EmployeesDetails from '@/pages/Employees/Details'

import Equipment from '@/pages/Equipment/Index'
import EquipmentAdd from '@/pages/Equipment/Add'
import EquipmentEdit from '@/pages/Equipment/Edit'
import EquipmentDetails from '@/pages/Equipment/Details'

import Events from '@/pages/Events/Index'
import EventsAdd from '@/pages/Events/Add'
import EventsEdit from '@/pages/Events/Edit'
import EventsDetails from '@/pages/Events/Details'

import Loadings from '@/pages/Loadings/Index'
import LoadingsAdd from '@/pages/Loadings/Add'
import LoadingsEdit from '@/pages/Loadings/Edit'
import LoadingsDetails from '@/pages/Loadings/Details'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/cars/list',
            name: 'Cars',
            component: Cars
        },
        {
            path: '/cars/add',
            name: 'CarsAdd',
            component: CarsAdd
        },
        {
            path: '/cars/:id',
            name: 'CarsDetails',
            component: CarsDetails,
        },
        {
            path: '/cars/:id/edit',
            name: 'CarsEdit',
            component: CarsEdit
        },
        {
            path: '/employees/list',
            name: 'Employees',
            component: Employees
        },
        {
            path: '/employees/:id',
            name: 'EmployeesDetails',
            component: EmployeesDetails,
        },
        {
            path: '/employees/:id/edit',
            name: 'EmployeesEdit',
            component: EmployeesEdit
        },
        {
            path: '/employees/add',
            name: 'EmployeesAdd',
            component: EmployeesAdd
        },
        {
            path: '/equipment/list',
            name: 'Equipment',
            component: Equipment
        },
        {
            path: '/equipment/add',
            name: 'EquipmentAdd',
            component: EquipmentAdd
        },
        {
            path: '/equipment/:id',
            name: 'EquipmentDetails',
            component: EquipmentDetails,
        },
        {
            path: '/equipment/:id/edit',
            name: 'EquipmentEdit',
            component: EquipmentEdit
        },
        {
            path: '/events/list',
            name: 'Events',
            component: Events
        },
        {
            path: '/events/add',
            name: 'EventsAdd',
            component: EventsAdd
        },
        {
            path: '/events/:id',
            name: 'EventsDetails',
            component: EventsDetails,
        },
        {
            path: '/events/:id/edit',
            name: 'EventsEdit',
            component: EventsEdit
        },
        {
            path: '/loadings/list',
            name: 'Loadings',
            component: Loadings
        },
        {
            path: '/loadings/add',
            name: 'LoadingsAdd',
            component: LoadingsAdd
        },
        {
            path: '/loadings/:id',
            name: 'LoadingsDetails',
            component: LoadingsDetails,
        },
        {
            path: '/loadings/:id/edit',
            name: 'LoadingsEdit',
            component: LoadingsEdit
        },
    ],
})




