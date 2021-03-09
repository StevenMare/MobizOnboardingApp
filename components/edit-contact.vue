<template>
  <v-dialog :value="showEditContactDialog" @click:outside="resetContactForm" width="450">
    <v-card>
      <v-form @submit.prevent="saveAndCloseForm">
        <v-container class="px-11 py-7">
          <v-row class="mb-2">
            <v-col>
              <h1 class="headline">Edit Contact</h1>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn icon @click="resetContactForm">
                <v-icon dark>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="pb-0">
              <label>First name</label>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                type="text"
                v-model.trim="firstName"
                autocomplete="off"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="pb-0">
              <label>Last name</label>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model.trim="lastName"
                type="text"
                autocomplete="off"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="pb-0">
              <label>Cellphone</label>
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model.trim="cellphone"
                type="text"
                autocomplete="off"
                outlined
                dense
              />
            </v-col>
          </v-row>
          <v-row class="justify-end mt-6">
            <v-card-actions class="pr-0">
              <v-btn outlined color="primary" @click.stop="resetContactForm">Cancel</v-btn>
              <v-btn type="submit" color="primary">Update Contact</v-btn>
            </v-card-actions>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "EditContact",
  props: {
      contact: {
        type: Object
      }
  },
  data() {
    return {
      showConfirmationBox: false,
      id: "",
      firstName: "",
      lastName: "",
      cellphone: ""
    };
  },
  watch: { 
    showEditContactDialog: function(newVal) {
      if(newVal){
        this.id = this.contact.id,
        this.firstName = this.contact.firstName,
        this.lastName = this.contact.lastName,
        this.cellphone = this.contact.cellphone
      }
    },
  },
  computed: {
    ...mapState("contact", {
      showEditContactDialog: "showEditContactDialog",
      contacts: "contacts"
    })
  },
  methods: {
    ...mapActions("contact", {
      updateContact: "updateContact",
      updateEditContactDialog: "updateEditContactDialog",
      updateShowNotification: "updateShowNotification",
    }),
    closeDialog() {
      this.updateEditContactDialog(false);
    },
    resetContactForm() {
      this.closeDialog();
      this.clearForm();
    },
    clearForm() {
      this.id = "";
      this.cellphone = "";
      this.firstName = "";
      this.lastName = "";
    },
    async saveAndCloseForm() {
      const result = await this.saveContact();
      this.clearForm();
      this.closeDialog();

      if (result && result.status === 200) {
        this.updateShowNotification({
          show: true,
          message: "Contact successfuly updated.",
        });
      } else {
        this.updateShowNotification({
          show: true,
          message: "Contact could not be updated. Please try again.",
        });
      }
    },
    async saveContact(): Promise<any> {
      const createContactResponse: any = await this.updateContact({
        contact: {
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          cellphone: this.cellphone,
        },
      });
      return createContactResponse;
    },
  },
});
</script>
