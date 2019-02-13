<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="post">
                <h2><span v-text="$t('jhipsterApp.post.detail.title')">Post</span> {{post.id}}</h2>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row jh-entity-details">

                        <dt><span v-text="$t('jhipsterApp.post.name')">Name</span></dt>
                        <dd>
                                <span>{{post.name}}</span>
                        </dd>

                        <dt><span v-text="$t('jhipsterApp.post.tag')">Tag</span></dt>
                        <dd>
                                    <span v-for="(tag, i) in post.tags">{{i > 0 ? ', ' : ''}}
                                        <router-link :to="'../tag/' + tag.id + '/View'">{{tag.name}}</router-link>
                                    </span>
                        </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'PostEdit', params: {postId: post.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./post-details.component.ts">
</script>

