<template>
  <div>
    <div class="mb-3">
      <input
        :value="userId"
        @input="$emit('update:userId', $event.target.value)"
        type="text"
        class="form-control"
        id="fronius_userid"
        placeholder="Fronius User ID"
        required
      />
    </div>
    <div class="mb-3">
      <input
        :value="froniusPassword"
        @input="$emit('update:froniusPassword', $event.target.value)"
        type="password"
        class="form-control"
        id="fronius_password"
        placeholder="Fronius Password"
        required
      />
    </div>
    <div class="mb-3">
      <input
        :value="accessKeyId"
        @input="$emit('update:accessKeyId', $event.target.value)"
        type="password"
        class="form-control"
        id="fronius_accesskey_id"
        placeholder="Fronius AccessKey ID"
        required
      />
    </div>
    <div class="mb-3">
      <input
        :value="accessKeyValue"
        @input="$emit('update:accessKeyValue', $event.target.value)"
        type="password"
        class="form-control"
        id="fronius_accesskey_value"
        placeholder="Fronius AccessKey Value"
        required
      />
    </div>
    <div class="mb-3">
      <input
        :value="deviceId"
        @input="$emit('update:deviceId', $event.target.value)"
        type="password"
        class="form-control"
        id="fronius_device_id"
        placeholder="Fronius Device ID"
        required
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeterHardware',
  props: {
    userId: {
      type: String,
      default: "",
    },
    froniusPassword: {
      type: String,
      default: "",
    },
    accessKeyId: {
      type: String,
      default: "",
    },
    accessKeyValue: {
      type: String,
      default: "",
    },
    deviceId: {
      type: String,
      default: "",
    },
  }
}
</script>