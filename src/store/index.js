/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: { id: 'abc123', name: 'Adam jhar' },
        categories: [
            'sustainability',
            'nature',
            'animal welfare',
            'housing',
            'education',
            'food',
            'community'
        ]
    },
    mutations: {},
    actions: {},
    getters: {
        catLength: state => {
            return state.categories.length;
        },
        doneTodos: state => {
            return state.todos.filter(todo => todo.done);
        },
        activeTodoCount: state => {
            // return state.todos.length - getters.doneTodos.length;
            return state.todos.filter(todo => !todo.done);
        },
        getEventById: state => id => {
            return state.events.find(event => event.id === id);
        }
    },
    modules: {}
});