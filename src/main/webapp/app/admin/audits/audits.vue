<template>
    <v-card v-if="audits">
        <v-card-title>
        <h2 id="audits-page-heading" v-text="$t('audits.title')">Audits</h2>
        <v-spacer></v-spacer>
        <v-menu :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <v-text-field slot="activator" v-model="fromDate" :label="$t('audits.filter.from')" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="fromDate" @change="transition()" no-title scrollable />
        </v-menu>
        <v-menu :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <v-text-field slot="activator" v-model="toDate" :label="$t('audits.filter.to')" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="toDate" @change="transition()" no-title scrollable />
        </v-menu>
        </v-card-title>
        <v-data-table :items="orderBy(audits, predicate, reverse === true ? 1 : -1)" :total-items="totalItems" :pagination.sync="pagination" class="elevation-1">
            <template slot="headers" slot-scope="props">
                <th v-on:click="changeOrder('auditEventDate', 'timestamp')"><span v-text="$t('audits.table.header.date')">Date</span><font-awesome-icon v-if="propOrder === 'auditEventDate'" icon="sort"></font-awesome-icon></th>
                <th v-on:click="changeOrder('principal', 'principal')"><span v-text="$t('audits.table.header.principal')">User</span><font-awesome-icon v-if="propOrder === 'principal'" icon="sort"></font-awesome-icon></th>
                <th v-on:click="changeOrder('auditEventType', 'type')"><span v-text="$t('audits.table.header.status')">State</span><font-awesome-icon v-if="propOrder === 'auditEventType'" icon="sort"></font-awesome-icon></th>
                <th><span v-text="$t('audits.table.header.data')">Extra data</span></th>
            </template>  
            <template slot="items" slot-scope="props">
                <td><span>{{props.item.timestamp | formatDate}}</span></td>
                <td><small>{{props.item.principal}}</small></td>
                <td>{{props.item.type}}</td>
                <td>
                    <span v-if="props.item.data && props.item.data.message">{{props.item.data.message}}</span>
                    <span v-if="props.item.data && props.item.data.remoteAddress"><span v-text="$t('audits.table.data.remoteAddress')">Remote Address</span> {{props.item.data.remoteAddress}}</span>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts" src="./audits.component.ts">
</script>
