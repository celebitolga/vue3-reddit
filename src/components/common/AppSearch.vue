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
import { useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';


import API from "@/lib/api";

export default {
  setup() {
    const autocomplete = ref(null)
    const router = useRouter();
    const searchText = ref('');
    let searchState = null;
    let foo = ref([]);

    var instances;

    let debounceTimeout;

    watch(searchText, async (value, oldValue) => {
      clearTimeout(debounceTimeout);

      debounceTimeout = setTimeout(() => {
        if(searchText.value.length > 2) {
          loadData(searchText.value);
        }
      },300);
    })

    function setFoo() {
      searchState.map((item) => {
        foo.value[item.display_name] = null;
      })
    }

    const search = () => {
      if(instances != null) {
        router.push('/' + instances.$el[0].value);
        searchText.value = '';
      }
    }


    async function loadData(params = 'all') {
      try {
        searchState = await API.getSearch(params);
        setFoo();
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(() => {
      instances = M.Autocomplete.init(autocomplete._value, {
        data: foo.value,
        onAutocomplete: search,
      });

      loadData();
    })

    return {
      autocomplete,
      searchText,
      search,
    }
  },
}
</script>

<style>

</style>