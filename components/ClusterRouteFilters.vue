<template>
  <v-expansion-panels>
    <v-expansion-panel @click="toggleFilters">
      <v-expansion-panel-header disable-icon-rotate>
        <v-col @click.stop="">
          <v-select
            v-model="filters.clusters"
            :items="clusterOptions"
            label="Clusters"
            item-text="name"
            item-value="uuid"
            prepend-icon="mdi-vector-polygon"
            solo
            multiple
            @change="$emit('handle-get-routes', filters)"
          ></v-select>
        </v-col>
        <v-col @click.stop="">
          <v-autocomplete
            v-model="filters.namespaces"
            placeholder="Namespaces"
            prepend-icon="mdi-widgets"
            item-text="namespace"
            item-value="namespace"
            :items="namespaceOptions"
            :hide-details="true"
            solo
            clearable
            multiple
            @change="$emit('handle-get-routes', filters)"
          ></v-autocomplete>
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
                  icon>
                  <v-icon>mdi-filter</v-icon>
                  <v-badge
                    v-if="populatedFieldsCount > 0"
                    bottom
                    :content="populatedFieldsCount"
                  ></v-badge>
                </v-btn>
              </template>
              <span>Open Filters</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-show="hasFilters"
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
                  @click="$emit('handle-get-routes', filters)">
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
          v-model="filters.certExpiresOn"
          full-width></v-date-picker>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue'
import {ClusterRouteFilters} from '@/models/cluster-route-filters'
export default Vue.extend({
  props: {
    clusters: {
      type: Array,
      default: () => []
    },
    namespaces: {
      type: Array,
      default: () => []
    },
    certExpiresOn: {
      type: String,
      default: ''
    },  
    clusterOptions: {
      type: Array,
      required: true
    },
    namespaceOptions: {
      type: Array,
      required: true
    },
  },
  data() {
    const colours = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'teal'];
    const cluster = '';
    const filtersOpen = false;
    const filters = new ClusterRouteFilters();
    console.log(filters);
    if (this.certExpiresOn !== null) {
      filters.certExpiresOn = this.certExpiresOn;
    }
    if (this.namespaces.length > 0) {
      filters.namespaces = this.namespaces as string[];
    } else {
      filters.namespaces = [];
    }
    if (this.clusters.length > 0) {
      filters.clusters = this.clusters as string[];
    } else {
      filters.clusters = [];
    }
    return {
      colours,
      cluster,
      filtersOpen,
      filters,
    }
  },
  computed: {
    populatedFieldsCount(): number {
      return (this.filters.clusters.length === 0 ? 0 : 1) +
        (this.filters.certExpiresOn === null ? 0 : 1) +
        (this.filters.namespaces.length === 0 ? 0 : 1) ;
    },
    hasFilters(): Boolean {
      return (this.filtersOpen && this.populatedFieldsCount > 0);
    },
  },
  methods: {
    applyFilters(): void {
      this.$emit('handle-get-routes', this.filters);
    },
    toggleFilters(): void {
      this.filtersOpen = !this.filtersOpen;
    },
    clearFilters(): void {
      this.filters = new ClusterRouteFilters();
      this.applyFilters();
    },
  }
})
</script>

<style lang="scss" scoped>
.action-bar .v-expansion-panel::before,
.action-bar .v-expansion-panel {
  box-shadow: unset;
  background: unset;
  background-color: unset;
}
.v-select--is-menu-active.v-select--is-menu-active .v-icon.v-icon {
  color: #1976d2;
}
.mdi-filter-off.mdi-filter-off.v-icon.v-icon {
  color: rgb(255, 64, 64);
}
</style>
