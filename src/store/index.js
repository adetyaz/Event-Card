/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuex from 'vuex';

import * as user from '@/store/modules/user.js';
import * as events from '@/store/modules/event.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        events
    },
    state: {
        categories: [
            'sustainability',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community'
        ]
    }
});