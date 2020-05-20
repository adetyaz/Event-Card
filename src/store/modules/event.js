/* eslint-disable prettier/prettier */
import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
    events: [],
    // eventsTotal: 0,
    event: {}
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
    createEvent({ commit }, event) {
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event);
        });
    },
    fetchEvents({ commit }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(response => {
                // commit(
                //     'SET_EVENTS_TOTAL',
                //     parseInt(response.header['x-total-count'])
                // );
                commit('SET_EVENTS', response.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
    fetchEvent({ commit, getters }, id) {
        let event = getters.getEventById(id);

        if (event) {
            commit('SET_EVENT', event);
        } else {
            EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data);
                })
                .catch(err => {
                    console.log('This could not be loaded due to' + err);
                });
        }
    }
};
export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id);
    }
};