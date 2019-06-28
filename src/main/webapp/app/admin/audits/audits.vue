<template>
    <v-card v-if="audits">
        <v-card-title>
        <h2 id="audits-page-heading" v-text="$t('audits.title')">Audits</h2>
        <v-spacer></v-spacer>
        <v-menu :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
            <template  v-slot:activator="{ on }">
                <v-text-field v-on="on" v-model="fromDate" :label="$t('audits.filter.from')" prepend-icon="event" readonly></v-text-field>
            </template>
            <v-date-picker v-model="fromDate" @change="transition()" no-title scrollable />
        </v-menu>
        <v-menu :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
            <template  v-slot:activator="{ on }">
                <v-text-field v-on="on" v-model="toDate" :label="$t('audits.filter.to')" prepend-icon="event" readonly></v-text-field>
            </template>
            <v-date-picker v-model="toDate" @change="transition()" no-title scrollable />
        </v-menu>
        </v-card-title>
        <v-data-table :items="orderBy(audits, predicate, reverse === true ? 1 : -1)" :server-items-length="totalItems" :options.sync="pagination" class="elevation-1">
            <template v-slot.header="{props}">
                <tr>
                <th v-on:click="changeOrder('auditEventDate', 'timestamp')"><span v-text="$t('audits.table.header.date')">Date</span><font-awesome-icon v-if="propOrder === 'auditEventDate'" icon="sort"></font-awesome-icon></th>
                <th v-on:click="changeOrder('principal', 'principal')"><span v-text="$t('audits.table.header.principal')">User</span><font-awesome-icon v-if="propOrder === 'principal'" icon="sort"></font-awesome-icon></th>
                <th v-on:click="changeOrder('auditEventType', 'type')"><span v-text="$t('audits.table.header.status')">State</span><font-awesome-icon v-if="propOrder === 'auditEventType'" icon="sort"></font-awesome-icon></th>
                <th><span v-text="$t('audits.table.header.data')">Extra data</span></th>
                </tr>
            </template>  
            <template v-slot:item="{item}">
                <tr>
                <td><span>{{item.timestamp | formatDate}}</span></td>
                <td><small>{{item.principal}}</small></td>
                <td>{{item.type}}</td>
                <td>
                    <span v-if="item.data && item.data.message">{{item.data.message}}</span>
                    <span v-if="item.data && item.data.remoteAddress"><span v-text="$t('audits.table.data.remoteAddress')">Remote Address</span> {{item.data.remoteAddress}}</span>
                </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts" src="./audits.component.ts">
</script>
