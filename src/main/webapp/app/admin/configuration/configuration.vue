<template>
    <div>
        <h2 id="configuration-page-heading" v-text="$t('configuration.title')">Configuration</h2>

        <div v-if="allConfiguration && configuration">
            <v-text-field v-model="filtered" :label="$t('configuration.filter')"></v-text-field>
            <h3>Spring configuration</h3>
            <div class="elevation-1">
            <table class="v-datatable v-table theme--light">
                <thead>
                <tr>
                    <th class="w-40" v-on:click="changeOrder('prefix')"><span v-text="$t('configuration.table.prefix')">Prefix</span></th>
                    <th class="w-60" v-on:click="changeOrder('properties')"><span v-text="$t('configuration.table.properties')">Properties</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="entry in orderBy(filterBy(configuration, filtered), orderProp, reverse === true ? 1 : -1)">
                    <td><span>{{entry.prefix}}</span></td>
                    <td>
                        <div class="row" v-for="key in keys(entry.properties)">
                            <div class="col-md-4">{{key}}</div>
                            <div class="col-md-8">
                                <span class="float-right badge-secondary break">{{entry.properties[key]}}</span>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            <div v-for="key in keys(allConfiguration)" class="elevation-1">
                <h4><span>{{key}}</span></h4>
                <table class="v-datatable v-table theme--light">
                    <thead>
                    <tr>
                        <th class="w-40">Property</th>
                        <th class="w-60">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item of allConfiguration[key]">
                        <td class="break">{{item.key}}</td>
                        <td class="break">
                            <span class="float-right badge-secondary break">{{item.val}}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./configuration.component.ts">
</script>
