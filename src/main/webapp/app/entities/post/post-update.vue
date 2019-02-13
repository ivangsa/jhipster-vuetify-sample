<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.post.home.createOrEditLabel" v-text="$t('jhipsterApp.post.home.createOrEditLabel')">Create or edit a Post</h2>
                <div>
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="post.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="post.id" readonly />
                    </div>

                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.post.name')" for="post-name">Name</label>
                        <input type="text" class="form-control" name="name" id="post-name"
                            :class="{'valid': !$v.post.name.$invalid, 'invalid': $v.post.name.$invalid }" v-model="$v.post.name.$model"  required/>
                        <div v-if="$v.post.name.$anyDirty && $v.post.name.$invalid">
                                <small class="form-text text-danger" v-if="!$v.post.name.required" v-text="$t('entity.validation.required')">
                                    This field is required.
                                </small>
                            <!---->
                        </div>
                    </div>

                        <div class="form-group">
                            <label v-text="$t('jhipsterApp.post.tag')" for="post-tag">Tag</label>
                            <select class="form-control" id="post-tag" multiple name="tag" v-model="post.tags">
                                <option v-bind:value="getSelected(post.tags, tagOption)" v-for="tagOption in tags">{{tagOption.name}}</option>
                            </select>
                        </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.post.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./post-update.component.ts">
</script>
