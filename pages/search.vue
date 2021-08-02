<template>
  <v-container>
    <v-row class="action-bar">
      <v-expansion-panels>
        <v-expansion-panel @click="toggleFilters">
          <v-expansion-panel-header disable-icon-rotate>
            <v-col>
              <v-select
                v-model="service"
                :items="options.services"
                label="Services"
                item-text="name"
                item-value="uuid"
                prepend-icon="mdi-database-search"
                solo
                multiple
                @click.stop=""
              ></v-select>
            </v-col>
            <template v-slot:actions>
              <v-col class="column-spacer">
                <span class="column-spacer__padding"></span>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-show="!filtersOpen"
                      v-bind="attrs"
                      v-on="on"
                      icon
                      color="blue">
                      <v-icon>{{hasFilters}}</v-icon>
                    </v-btn>
                  </template>
                  <span>Open Filters</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-show="filtersOpen"
                      v-bind="attrs"
                      v-on="on"
                      icon
                      color="red"
                      @click="clearFilters">
                      <v-icon>mdi-filter-off</v-icon>
                    </v-btn>
                  </template>
                  <span>Clear Filters</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-show="filtersOpen"
                      v-bind="attrs"
                      v-on="on"
                      color="primary"
                      @click="getServices">
                      Apply
                    </v-btn>
                  </template>
                  <span>Apply Filters on Search</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-show="filtersOpen"
                      v-bind="attrs"
                      v-on="on"
                      icon>
                      <v-icon>mdi-close-thick</v-icon>
                    </v-btn>
                  </template>
                  <span>Close Filters Panel</span>
                </v-tooltip>
              </v-col>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <h1>Expires before</h1>
            <v-date-picker 
              v-model="picker"
              full-width></v-date-picker>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row v-bind:style="{width: '100%'}" class="status-bar" v-if="hasSearched">
      <v-col cols="2">
        <template v-if="loadingItems">
          <v-icon v-icon>mdi-blur</v-icon>
        </template>
        {{ loadingItems ? '' : items.length }} Results
      </v-col>
      <v-col cols="10"></v-col>
    </v-row>
    <v-row v-bind:style="{width: '100%'}" class="element-list">
      <v-col>
        <v-expansion-panels>
          <template v-for="item of items">
            <cluster-route
              :key="'cluster-route-'+item.uuid"
              v-bind="item">
            </cluster-route>
          </template>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {ClusterRoute} from '~/models/cluster-route';

export default Vue.extend({
  async asyncData({ $axios }) {

    const source = $axios.CancelToken.source();

    try {
      const options = await $axios.$get('/get-options', {
        cancelToken: source.token
      });

      return { options };

    } catch(error) {
      if ($axios.isCancel(error)) {
        console.log('Request canceled', error)
      } else {
        console.error('Request errored', error)
        // @todo: remove once endpoint is available
        const options = {
          services: [
            {name: 'Cola', uuid: 'asd-678'},
            {name: 'Spritzer', uuid: 'asd-567'},
            {name: 'Spritzer DR', uuid: 'asd-456'},
          ]
        };
        return { options };
      }
    }
  
    return { };
  },
  data() {
    const service = '';
    const filters: string[] = [];
    const filtersOpen = false;
    const items: ClusterRoute[] = [];
    const hasSearched = false;
    const loadingItems = false;
    return {
      service,
      filters,
      filtersOpen,
      items,
      hasSearched,
      loadingItems,
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    };
  },
  computed: {
    hasFilters(): string {
      if (this.filtersOpen) {
        return 'mdi-filter';
      }
      return 'mdi-filter-menu';
    }
  },
  head() {
    return {
      title: "Search"
    };
  },
  watch: {
    service() {
      this.getServices();
    }
  },
  methods: {
    getServices(): void {
      this.items = [];
      this.hasSearched = true;
      this.loadingItems = true;
      for(let i = 0; i < 100; i++) {
        const item: ClusterRoute = {
          uuid:  this.$faker.fake('{{datatype.uuid}}'),
          namespace:  this.$faker.fake('{{datatype.hexaDecimal}}'),
          routeName:  this.$faker.fake('{{company.companyName}}'),
          routeHost:  this.$faker.fake('{{internet.domainName}}'),
          certHash:  this.$faker.fake('{{datatype.hexaDecimal}}'),
          wildcard:  this.$faker.fake('{{datatype.boolean}}'),
          certCreatedOn:  this.$faker.fake('{{date.past}}'),
          certExpiresOn:  this.$faker.fake('{{date.future}}'),
          certSans: [
            this.$faker.fake('{{internet.domainName}}'),
            this.$faker.fake('{{internet.domainName}}'),
            this.$faker.fake('{{internet.domainName}}')
          ],
          encryptionType:  this.$faker.fake('{{name.jobArea}}'),
          insecureTraffic: this.$faker.fake('{{name.jobArea}}'),
        };
        if (new Date(this.picker).getTime() >= new Date(item.certExpiresOn).getTime()) {
          this.items.push(item);
        }
      }
      this.loadingItems = false;
    },
    toggleFilters(): void {
      console.log(this.filtersOpen)
      this.filtersOpen = !this.filtersOpen;
    },
    clearFilters(): void {
      this.filters = [];
    }
  }
})
</script>
<style>
.v-text-field.v-text-field .v-text-field__details.v-text-field__details {
  margin: 0;
  padding: 0;
  height: 0;
  min-height: 0;
}
</style>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.column-spacer {
  display: flex;
  flex-direction: row;
}
.column-spacer__padding {
  flex: 1;
}
.action-bar .v-expansion-panel::before,
.action-bar .v-expansion-panel {
  box-shadow: unset;
  background: unset;
  background-color: unset;
}
.v-expansion-panels .v-expansion-panel {
  margin-bottom: 4px;
}
.v-expansion-panel-header .v-expansion-panel-header .v-input__control {
    flex-direction: row;
    flex-wrap: nowrap;
}
.v-expansion-panel-content__wrap.v-expansion-panel-content__wrap {
  text-align: left;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
  display: block;
  z-index: 1000;
}
</style>
