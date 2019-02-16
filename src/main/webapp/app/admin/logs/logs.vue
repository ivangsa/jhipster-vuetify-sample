<template>
    <div class="table-responsive">
        <h2 id="logs-page-heading" v-text="$t('logs.title')">Logs</h2>

        <div v-if="loggers">
            <p v-text="$t('logs.nbloggers', { 'total': loggers.length})">There are {{ loggers.length }} loggers.</p>

            <v-text-field v-model.lazy="filtered" :label="$t('logs.filter')"></v-text-field>

            <div  class="elevation-1">
            <table class="v-datatable v-table theme--light">
                <thead>
                <tr title="click to order">
                    <th v-on:click="changeOrder('name')"><span v-text="$t('logs.table.name')">Name</span></th>
                    <th v-on:click="changeOrder('level')"><span v-text="$t('logs.table.level')">Level</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="logger in orderBy(filterBy(loggers, filtered), orderProp, reverse === true ? 1 : -1)" :key="logger.name">
                    <td><small>{{logger.name}}</small></td>
                    <td>
                        <v-btn small depressed px-0 mx-0 @click="updateLevel(logger.name, 'TRACE')" :color="(logger.level==='TRACE') ? 'primary' : ''">TRACE</v-btn>
                        <v-btn small depressed px-0 mx-0 @click="updateLevel(logger.name, 'DEBUG')" :color="(logger.level==='DEBUG') ? 'success' : ''">DEBUG</v-btn>
                        <v-btn small depressed px-0 mx-0 @click="updateLevel(logger.name, 'INFO')" :color="(logger.level==='INFO') ? 'info' : ''">INFO</v-btn>
                        <v-btn small depressed px-0 mx-0 @click="updateLevel(logger.name, 'WARN')" :color="(logger.level==='WARN') ? 'warning' : ''">WARN</v-btn>
                        <v-btn small depressed px-0 mx-0 @click="updateLevel(logger.name, 'ERROR')" :color="(logger.level==='ERROR') ? 'error' : ''">ERROR</v-btn>
                        <v-btn small depressed px-0 mx-0 @click="updateLevel(logger.name, 'OFF')" :color="(logger.level==='OFF') ? 'black' : ''">OFF</v-btn>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./logs.component.ts">
</script>
