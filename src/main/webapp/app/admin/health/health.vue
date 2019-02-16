<template>
    <div>
        <h2>
            <span id="health-page-heading" v-text="$t('health.title')">Health Checks</span>
            <v-btn ml-2 color="primary" dark small @click="refresh()" :disabled="updatingHealth">
                <v-icon>sync</v-icon> <span v-text="$t('health[\'refresh.button\']')">Refresh</span>
            </v-btn>         
        </h2>
        <div class="elevation-1">
            <table id="healthCheck" class="v-datatable v-table">
                <thead>
                <tr>
                    <th v-text="$t('health.table.service')">Service Name</th>
                    <th class="text-xs-center" v-text="$t('health.table.status')">Status</th>
                    <th class="text-xs-center" v-text="$t('health.details.details')">Details</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="health of healthData" :key="health.name">
                    <td><span v-text="$t('health.indicator.' + baseName(health.name))"/> {{subSystemName(health.name)}}</td>
                    <td class="text-xs-center">
                        <span class="badge" :class="getBadgeClass(health.status)" v-text="$t('health.status.' + health.status)">
                            {{health.status}}
                        </span>
                    </td>
                    <td class="text-xs-center">
                        <a class="hand" v-on:click="showHealth(health)" v-if="health.details || health.error">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <v-dialog ref="healthModal" :value="currentHealth"  max-width="450">
            <h4 slot="modal-title" v-if="currentHealth" class="modal-title" id="showHealthLabel">
                    <span v-text="$t('health.indicator.' + baseName(currentHealth.name))"/> 
                {{subSystemName(currentHealth.name)}}
            </h4>
            <health-modal :current-health="currentHealth"></health-modal>
        </v-dialog>
    </div>
</template>

<script lang="ts" src="./health.component.ts">
</script>
