<template>
  <!--begin: Input Fields -->
  <div class="form-group row">
    <div
      v-for="(input, index) in inputs"
      :key="index"
      class="mt-4"
      :class="'col-sm-' + [(input.size || '4')]"
      v-if="!input.hide"
    >
      <label for="input">{{ input.name }}</label>
      <div class="input-group">
       <!--begin: Input Textarea -->
       <textarea class="form-control" :class="{ 'is-invalid': errors.has(input.name) }"
              :name="input.name"
              v-model="input.value"
              :placeholder="input.hint"
              v-validate="input.validate"
              :disabled="input.disabled"
              v-if="input.type == 'textarea'"
       ></textarea>
       <!--end: Input Textarea -->

        <!--begin: Input Text -->
        <input class="form-control" :class="{ 'is-invalid': errors.has(input.name) }"
          :name="input.name"
          v-model="input.value"
          :placeholder="input.hint"
          type="text"
          v-validate="input.validate"
          :disabled="input.disabled"
          v-if="input.type == 'text'"
        />
        <!--end: Input Text -->

        <!--begin: Input Email -->
        <input class="form-control" :class="{ 'is-invalid': errors.has(input.name) }"
          :name="input.name"
          v-model="input.value"
          :placeholder="input.hint"
          type="email"
          v-validate="(input.validate)? input.validate+'|email': '|email'"
          :disabled="input.disabled"
          v-if="input.type == 'email'"
        />
        <!--end: Input Email -->

        <!--begin: Input Email -->
        <input class="form-control" :class="{ 'is-invalid': errors.has(input.name) }"
          :name="input.name"
          v-model="input.value"
          :placeholder="input.hint"
          type="password"
          v-validate="input.validate"
          :disabled="input.disabled"
          v-if="input.type == 'password'"
        />
        <!--end: Input Email -->

        <!--begin: Date -->
        <input class="form-control" :class="{ 'is-invalid': errors.has(input.name) }"
          :name="input.name"
          v-model="input.value"
          :placeholder="input.hint"
          type="date"
          v-validate="(input.validate)? input.validate+'|date_format:YYYY-MM-DD': '|date_format:YYYY-MM-DD'"
          :disabled="input.disabled"
          v-if="input.type == 'date'"
        />
        <!--end: Date -->

        <!--begin: Range -->
        <input class="form-control" :class="{ 'is-invalid': errors.has(input.name) }"
          :name="input.name"
          v-model="input.value"
          :placeholder="input.hint"
          type="number"
          :min="input.min || 0"
          :max="input.max || null"
          v-validate="input.validate"
          :disabled="input.disabled"
          v-if="input.type == 'number'"
        />
        <!--end: Range -->

        <!--begin: Select -->
        <v-select class="select" :class="{ 'is-invalid': errors.has(input.name) }"
          :name="input.name"
          v-model="input.value"
          :placeholder="input.hint"
          label="text"
          :options="input.options"
          v-validate="input.validate"
          :disabled="input.disabled"
          v-if="input.type == 'select'"
        />
        <!--end: Select -->

        <!--begin: Input File -->
        <input class="form-control" :class="{ 'is-invalid': errors.has(input.name) }"
          :change="input.value"
          type="file"
          v-validate="input.validate"
          :disabled="input.disabled"
          v-if="input.type == 'file'"
        />
        <!--end: Input File-->

        <div class="input-group-append" v-if="input.icon">
          <span class="input-group-text"><fai :icon="input.icon"/></span>
        </div>
      </div>
      <small v-show="errors.has(input.name)" class="form-text text-danger">
        {{ errors.first(input.name) }}
      </small>
    </div>
  </div>
  <!--end: input Fields -->
</template>

<script>
export default {
  name: 'SysForm',

  inject: ['$validator'],

  props: {
    inputs: { type: Object | Array, required: true }
  }
}
</script>

<style lang="scss">
  .select {
    width: 100%;
  }

  .dropdown-toggle::after {
    display: none !important;
  }

  .v-select .dropdown-toggle {
    padding: 3px;
  }

  .vs__actions > i {
    padding-bottom: 5px;
  }
</style>
