/* eslint-disable prettier/prettier */
import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
    events: [],
    // eventsTotal: 0,
    event: {},
    perPage: 3
};

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event);
    },
    SET_EVENTS(state, events) {
        state.events = events;
    },
    // SET_EVENTS_TOTAL(state, eventsTotal) {
    //     state.eventsTotal = eventsTotal;
    // },
    SET_EVENT(state, event) {
        state.event = event;
    }
};

export const actions = {
    createEvent({ commit, dispatch }, event) {
        return EventService.postEvent(event)
            .then(() => {
                commit('ADD_EVENT', event);
                const notification = {
                    type: 'success',
                    message: 'Your event has been created'
                };
                dispatch('notifications/add', notification, { root: true });
            })
            .catch(err => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem creating data because: ' + err.message
                };
                dispatch('notifications/add', notification, { root: true });
                throw err;
            });
    },
    //more change made to action
    fetchEvents({ commit, dispatch, state }, { page }) {
        return EventService.getEvents(state.perPage, page)
            .then(response => {
                // commit(
                //     'SET_EVENTS_TOTAL',
                //     parseInt(response.header['x-total-count'])
                // );
                commit('SET_EVENTS', response.data);
            })
            .catch(err => {
                const notification = {
                    type: 'error',
                    message: 'There was a problem creating event because: ' + err.message
                };
                dispatch('notifications/add', notification, { root: true });
            });
    },
    fetchEvent({ commit, getters }, id) {
        let event = getters.getEventById(id);

        if (event) {
            commit('SET_EVENT', event);
            return event;
        } else {
            return EventService.getEvent(id).then(response => {
                commit('SET_EVENT', response.data);
                return response.data;
            });
        }
    }
};
export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id);
    }
};