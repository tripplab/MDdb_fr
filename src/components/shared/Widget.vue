<template>
  <div class="card widget col-sm-6" :class="['col-md-' + (size || 4), (extra_class || '')]">
    <div class="card-body" :class="['bg-' + (color || 'info')+' text-' + (text_color || 'white')]">
      <div class="card-title">
        <slot name="header">
          <span v-if="icon"><fai :icon="icon" />&nbsp;</span> {{ title }}
        </slot>
      </div>
      <div class="text-right pt-2">
        <slot name="content">
          <h1 :class="['text-' + (content_color || 'white')]">{{ content }}</h1>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SysWidget',

  props: {
    title: { type: String },
    content: { type: String | Number, required: false },
    icon: { type: String | Array, required: false },
    color: { type: String, required: false },
    text_color: { type: String, required: false },
    content_color: { type: String, required: false },
    size: { type: String | Number, required: false },
    extra_class: { type: String, required: false }
  }
}
</script>
