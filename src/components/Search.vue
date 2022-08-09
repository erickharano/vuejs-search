<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Pesquisar" ref="search" v-model="search" />

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchGoogle">
            Buscar
          </button>
          <button class="btn btn-outline-secondary" type="button" @click="resetForm">
            Limpar
          </button>
        </div>
      </div>
      <div v-if="errors.length">
        <ul class="list-group">
          <li class="list-group-item error" v-for="error in errors" v-bind:key="error">{{error}}</li>
        </ul>
      </div>
    </div>

    <div class="col-md-12">
      <h4>Resultado da Pesquisa</h4>

      <div v-if="data.length">
        <ul class="list-group">
          <li class="list-group-item" v-for="search in data" v-bind:key="search">
            {{ search.name }}<br>
            <small>{{ search.link.substring(0,50) }}</small> 
            &nbsp; 
            <a v-bind:href="search.link" target="_blank">
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
          </li>
        </ul>
      </div>
      <div v-else-if="searched && data.length == 0">
        <ul class="list-group">
          <li class="list-group-item no-search">
            Nenhum resultado encontrado.
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="list-group">
          <li class="list-group-item no-search">
            Faça sua pesquisa no campo acima.
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import SearchService from '../services/Search';

export default {
  name: "search-google",
  data() {
    return {
      search: '',
      searched: false,
      data: [],
      errors: [],
    };
  },
  methods: {
    resetForm() {
      this.errors = [];
      this.data = [];
      this.search = '';
      this.searched = false;
      this.$refs.search.focus();
    },

    validSearch() {
      this.errors = [];

      if (this.search.trim().toString().length == 0) {
        this.errors.push('Preencha o campo de pesquisa corretamente.');
      }

      if (this.errors.length) {
        return false;
      }

      return true;
    },

    searchGoogle() {
      this.data = [];

      if (!this.validSearch()) {
        return;
      }

      SearchService.find(this.search)
        .then(response => {
          this.data = response.data;
          this.searched = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

  }
}
</script>

<style>
.list-group-item {
  text-align: left;
  font-weight: bold;
  /* margin-bottom: 20px; */
  border-width: 0px;
}

.list-group-item small {
  color: grey;
  font-weight: normal;
}

.list-group-item.no-search {
  border-width: 0px;
  font-size: 12px;
  font-weight: normal;
}

.list-group-item.error {
  color: red;
  border-width: 0;
  padding-top: 0;
  padding-left: 0;
}
</style>
