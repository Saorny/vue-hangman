<template>
  <div>
    <div class="name_section">
      <p>What is your nickname?</p>
      <input v-model="nickname" type="text" ></input>
    </div>
    <div class="hardship_section">
      <p>Hardship</p>
      <input v-model="level" type="radio" value="0"> Easy - 5 characters max</input>
      <input v-model="level" type="radio" value="1"> Medium - from 5 to 10 characters</input>
      <input v-model="level" type="radio" value="2"> Hard - over 10 characters</input>
    </div>
    <div class="lang_section">
      <p>Language</p>
      <input v-model="lang" type="radio" value="fr">Français</input>
      <input v-model="lang" type="radio" value="en">English</input>
      <input v-model="lang" type="radio" value="es">Español</input>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      updateSetting(key, value) {
        let param = {
          key: key,
          value: value
        };
        this.$emit('change-setting', param);
      }
    },
    data () {
      return {
        nickname: this.initialSettings.nickname,
        level: this.initialSettings.level,
        lang: this.initialSettings.lang
      }
    },
    props: {
      initialSettings: Object
    },
    watch: {
      nickname: function(val) {
        this.updateSetting('nickname', val);
      },
      level: function(val) {
        this.updateSetting('level', val);
      },
      lang: function(val) {
        this.updateSetting('lang', val);
      }
    }
  }
</script>
