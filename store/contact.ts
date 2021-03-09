import axios from "axios";

export const state = () => ({
  contacts: [],
  notificationMessage: '',
  showAddContactDialog: false,
  showEditContactDialog: false,
  showNotification: false
});

export const mutations = {
  setAddContactDialog(state: any, showAddContactDialog: boolean) {
    state.showAddContactDialog = showAddContactDialog;
  },

  setEditContactDialog(state: any, showEditContactDialog: boolean){
    state.showEditContactDialog = showEditContactDialog;
  },

  setNotificationMessage(state: any, notificationMessage: string) {
    state.notificationMessage = notificationMessage;
  },

  setShowNotification(state: any, showNotification: boolean) {
    state.showNotification = showNotification;
  },

  setContacts(state: any, contacts: any[]) {
    state.contacts = contacts;
  },

  addContact(state: any, contact: any) {
    state.contacts.push(contact);
  },

  editContact(state: any, contact: any){
    for(var i =0; i<state.contacts.length; i++){
      if(state.contacts[i].id === contact.id){
        state.contacts[i].firstName = contact.firstName;
        state.contacts[i].lastName = contact.lastName;
        state.contacts[i].cellphone = contact.cellphone;
        break;
      }
    }
  }
};

export const actions = {
  updateAddContactDialog(context: any, payload: any) {
    context.commit('setAddContactDialog', payload);
  },

  updateEditContactDialog({ commit }: any, payload: any){
    commit('setEditContactDialog', payload);
  },

  updateShowNotification({ commit }: any, { show, message }: any) {
    commit('setNotificationMessage', message);
    commit('setShowNotification', show);
  },

  async loadContacts({ commit }: any) {
    try {
      const response = await axios.get("http://127.0.0.1:3001/contacts", {});
      commit("setContacts", response.data);
    } catch (error) {
      // Do something with the error
    }
  },

  async createContact({ commit }: any, { contact }: any) {
    try {
      const response = await axios.post("http://127.0.0.1:3001/contacts", { contact });
      commit("addContact", contact);
      return response;
    } catch (error) {
      // Do something with the error
    }
  },

  async updateContact({ commit }: any, { contact }: any) {
    try {
      const response = await axios.patch("http://127.0.0.1:3001/contacts/"+contact.id, { contact });
      commit("editContact", contact);
      return response;
    } catch (error) {
      // Do something with the error
    }
  }
};
