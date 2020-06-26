<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a Category"
        :options="categories"
        v-model="event.category"
        @blur="!$v.event.category.$touch()"
        :class="{ errorMessage: $v.event.category.$error }"
      />

      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          This field is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <div class="field">
        <BaseInput
          label="Title"
          v-model="event.title"
          type="text"
          placeholder="Title"
          class="field"
          @blur="!$v.event.title.$touch()"
          :class="{ errorMessage: $v.event.title.$error }"
        />

        <template v-if="$v.event.title.$error">
          <p v-if="!$v.event.title.required" class="errorMessage">
            This field is required
          </p>
        </template>
      </div>
      <div class="field">
        <BaseInput
          label="Description"
          v-model="event.description"
          type="text"
          placeholder="Add a Description"
          class="field"
          @blur="!$v.event.description.$touch()"
          :class="{ errorMessage: $v.event.description.$error }"
        />

        <template v-if="$v.event.description.$error">
          <p v-if="!$v.event.description.required" class="errorMessage">
            This field is required
          </p>
        </template>
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput
          label="Location"
          v-model="event.location"
          type="text"
          placeholder="Add an Address"
          class="field"
          @blur="!$v.event.location.$touch()"
          :class="{ errorMessage: $v.event.location.$error }"
        />

        <template v-if="$v.event.location.$error">
          <p v-if="!$v.event.location.required" class="errorMessage">
            This field is required
          </p>
        </template>
      </div>
      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <DatePicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ errorMessage: $v.event.date.$error }"
          @opened="!$v.event.date.$touch()"
        />
        <template v-if="$v.event.date.$error">
          <p v-if="!$v.event.date.required" class="errorMessage">
            This date is required
          </p>
        </template>
      </div>

      <div class="field">
        <BaseSelect
          label="Select a Time"
          :options="times"
          v-model="event.time"
          @blur="!$v.event.time.$touch()"
          :class="{ errorMessage: $v.event.time.$error }"
        />

        <template v-if="$v.event.time.$error">
          <p v-if="!$v.event.time.required" class="errorMessage">
            This field is required
          </p>
        </template>
      </div>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
      >
        Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out all required fields
      </p>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    DatePicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00');
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      time: { required },
      date: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch('events/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.stop();
          });
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        time: '',
        attendees: []
      };
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
