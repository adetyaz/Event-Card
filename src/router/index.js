/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
import EventCreate from '../views/EventCreate.vue';
import NProgess from 'nprogress';
import store from '@/store/index';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'event-list',
            component: EventList,
            props: true
        },
        {
            path: '/event/:id',
            name: 'event-show',
            component: EventShow,
            props: true,
            beforeEnter(routeTo, routeFrom, next) {
                store.dispatch('events/fetchEvent', routeTo.params.id).then(event => {
                    routeTo.params.event = event;
                    next();
                });
            }
        },
        {
            path: '/event/create',
            name: 'event-create',
            component: EventCreate
        }
    ]
});

router.beforeEach((routeTo, routeFrom, next) => {
    NProgess.start();
    next();
});

router.afterEach(() => {
    NProgess.done();
});

export default router;