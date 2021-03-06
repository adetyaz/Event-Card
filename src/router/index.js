/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';
import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
import EventCreate from '../views/EventCreate.vue';
import Example from '../views/Example.vue';
import NotFound from '@/views/NotFound.vue';
import NProgess from 'nprogress';
import store from '@/store/index';
import NetworkIssue from '../views/NetworkIssue.vue';


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
                store
                    .dispatch('events/fetchEvent', routeTo.params.id)
                    .then(event => {
                        routeTo.params.event = event;
                        next();
                    })
                    .catch(error => {
                        if (error.response && error.response.status == 404) {
                            next({ name: '404', params: { resource: 'event' } });
                        } else {
                            next({ name: 'network-issue' });
                        }
                    });
            }
        },
        {
            path: '/event/create',
            name: 'event-create',
            component: EventCreate
        },
        {
            path: '/example',
            name: 'example',
            component: Example
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            props: true
        },
        {
            path: '*',
            redirect: { name: '404', params: { resource: 'page' } }
        },
        {
            path: '/network-issue',
            name: 'network-issue',
            component: NetworkIssue
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