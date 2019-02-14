<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="tag">
                <h2><span v-text="$t('jhipsterApp.tag.detail.title')">Tag</span> {{tag.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">

                        <dt><span v-text="$t('jhipsterApp.tag.name')">Name</span></dt>
                        <dd>
                                <span>{{tag.name}}</span>
                        </dd>

                </dl>
                <v-btn color="orange darken-2" dark @click.prevent="previousState()">
                    <v-icon dark left>arrow_back</v-icon><span v-text="$t('entity.action.back')"> Back</span>
                </v-btn>
                <v-btn color="primary" dark @click="$router.push({name: 'TagEdit', params: {tagId: tag.id}})">
                    <span v-text="$t('entity.action.edit')"> Edit</span>
                    <v-icon dark right>edit</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./tag-details.component.ts">
</script>

