<template>
  <div class="row">
    <div class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">textsms</i>
          <input ref="autocomplete" type="text" id="autocomplete-input" class="autocomplete" v-model="searchText" @keypress.enter="search()">
          <label for="autocomplete-input">Autocomplete</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      instances: null,
      searchText: '',
      foo: [],
      debounceTimeout: null,
    }
  },
  computed: {
    searchState() {
      return this.$store.getters.getSearch;
    }
  },
  watch: {
    searchText(newValue, oldValue) {
      clearTimeout(this.debounceTimeout);

      this.debounceTimeout = setTimeout(() => {
        if(this.searchText.length > 2) {
          this.loadData(this.searchText);
        }
      },300);
    },
  },
  methods: {
    async loadData(params = 'all') {
      await this.$store.dispatch("getSearch", params);
      this.setFoo();
    }, 
    search() {
      if(this.instances != null) {
        this.$router.push('/' + this.instances.$el[0].value)
        this.searchText = '';
        this.$refs.autocomplete.blur();
      }
    }, 
    setFoo() {
      this.searchState.map((item) => {
        this.foo[item.display_name] = null;
      })
    },
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.instances = M.Autocomplete.init(this.$refs.autocomplete, {
      data: this.foo,
      onAutocomplete: this.search,
    });
  },
}
</script>

<style>

</style>