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
                                        <router-link :to="'/entity/tag/' + tag.id + '/view'">{{tag.name}}</router-link>
                                    </span>
                        </dd>
                </dl>
                <v-btn color="orange darken-2" dark @click.prevent="previousState()">
                    <v-icon dark left>arrow_back</v-icon><span v-text="$t('entity.action.back')"> Back</span>
                </v-btn>
                <v-btn color="primary" dark @click="$router.push({name: 'PostEdit', params: {postId: post.id}})">
                    <span v-text="$t('entity.action.edit')"> Edit</span>
                    <v-icon dark right>edit</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./post-details.component.ts">
</script>
