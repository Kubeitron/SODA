<template>
  <v-container>
    <v-row class="action-bar">
      <v-col>
        <v-select
          v-model="service"
          :items="options.services"
          label="Services"
          item-text="name"
          item-value="uuid"
          prepend-icon="mdi-database-search"
          solo
        ></v-select>
      </v-col>  
      <v-col class="column-spacer">
        <span class="column-spacer__padding"></span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="! filtersOpen"
              v-bind="attrs"
              v-on="on"
              icon
              color="blue"
              @click="toggleFilters"
            >
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
                @click="clearFilters"
              >
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
                @click="clearFilters"
              >
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
                icon
                @click="toggleFilters"
              >
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
          </template>
          <span>Close Filters Panel</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row class="element-list">
      <v-col>
        <v-expansion-panels>
          <template v-for="item of items">
            <v-expansion-panel :key="'exp-'+item.uuid">
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    {{ item.name }}
                  </v-col>
                  <v-col
                    cols="8"
                    class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open">Certificate Details</span>
                      <v-row
                        v-else
                        no-gutters
                        style="width: 100%">
                        <v-col cols="6">
                          <b>Created On:</b> {{ item.createdAt || 'Not set' }}
                        </v-col>
                        <v-col cols="6">
                          <b>Expires On:</b> {{ item.expiresAt || 'Not set' }}
                        </v-col>
                      </v-row>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>  
                <v-row justify="start">
                  <v-col class="d-flex flex-row">
                    <div class="text-left">
                      <b>UUID</b> 
                      <div>{{item.uuid}}</div>
                    </div> 
                    <template v-for="(tag, index) in item.tags">
                      <v-chip
                        :key="'tag-'+item.uuid+index"
                        class="ma-2"
                        color="primary">
                        {{ tag }}
                      </v-chip>
                    </template>
                  </v-col>
                </v-row>
                <v-row justify="start">
                  <v-col class="text-left">
                    <b>Certificate Hash</b> 
                    <div>{{ item.hash }}</div>
                  </v-col> 
                </v-row>
                <v-row justify="start">
                  <v-col class="text-left">
                    <b>Notes</b> 
                    <div>{{ item.notes }}</div>
                  </v-col> 
                </v-row>    
                <v-row>
                  <v-col class="text-left">
                    <b>Created On</b> 
                    <div>{{ item.createdAt }}</div>
                  </v-col> 
                  <v-col class="text-left">
                    <b>Updated On</b> 
                    <div>{{ item.updatedAt }}</div>
                  </v-col> 
                  <v-col class="text-left">
                    <b>Expires On</b> 
                    <div>{{ item.expiresAt }}</div>
                  </v-col> 
                </v-row>            
              </v-expansion-panel-content>
            </v-expansion-panel>
          </template>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {Certificate} from '@/models/certificate';

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
            {name: 'Main App', uuid: 'asd-678'},
            {name: 'Other App', uuid: 'asd-567'},
            {name: 'Another App', uuid: 'asd-456'},
            {name: 'Left App', uuid: 'asd-345'},
            {name: 'Right App', uuid: 'asd-234'},
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
    const filtersOpen: Boolean = false;
    const items: Certificate[] = [];
    return {
      service,
      filters,
      filtersOpen,
      items
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
      for(let i = 0; i < 100; i++) {
        const item: Certificate = {
          uuid:  this.$faker.fake('{{datatype.uuid}}'),
          name:  this.$faker.fake('{{internet.domainName}}'),
          hash:  this.$faker.fake('{{datatype.hexaDecimal}}'),
          notes:  this.$faker.fake('{{lorem.sentence}}'),
          tags:  [this.$faker.fake('{{name.jobArea}}'), this.$faker.fake('{{name.jobArea}}')],
          createdAt:  this.$faker.fake('{{date.past}}'),
          updatedAt:  this.$faker.fake('{{date.recent}}'),
          expiresAt:  this.$faker.fake('{{date.future}}'),
          createdBy:  this.$faker.fake('{{internet.userName}}'),
          isPrivate:  this.$faker.fake('{{datatype.boolean}}'),
        };
        this.items.push(item);
      }
    },
    toggleFilters(): void {
      this.filtersOpen = !this.filtersOpen;
    },
    clearFilters(): void {
      this.filters = [];
    }
  }
})
</script>

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
.action-bar,
.element-list {
  width: 100%;
}
.v-expansion-panels .v-expansion-panel {
  margin-bottom: 4px;
}
.v-expansion-panel-content__wrap.v-expansion-panel-content__wrap {
  text-align: left;
}
.v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile) > .v-expansion-panel--active {
  display: block;
  z-index: 1000;
}
</style>
