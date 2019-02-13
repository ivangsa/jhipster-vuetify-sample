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
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'TagEdit', params: {tagId: tag.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./tag-details.component.ts">
</script>

