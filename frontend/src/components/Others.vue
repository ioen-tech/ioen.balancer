<template>
  <div>
    <div class="mb-3">
      <input
        :value="othersUserId"
        @input="$emit('update:othersUserId', $event.target.value)"
        type="text"
        class="form-control"
        id="others_user_id"
        placeholder="Others User ID"
        required
      />
    </div>
    <div class="mb-3">
      <input
        :value="othersPassword"
        @input="$emit('update:othersPassword', $event.target.value)"
        type="password"
        class="form-control"
        id="others_password"
        placeholder="Others Password"
        required
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Others',
  props: {
    othersUserId: {
      type: String,
      default: ""
    },
    othersPassword: {
      type: String,
      default: ""
    }
  }
}
</script>