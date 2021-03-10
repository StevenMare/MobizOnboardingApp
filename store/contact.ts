import axios from "axios";

export const state = () => ({
  contacts: [],
  notificationMessage: '',
  showNotification: false
});

export const mutations = {
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
    const selectedContact = state.contacts.find((c: { id: String; }) => c.id === contact.id)
    if(selectedContact){
      selectedContact.firstName = contact.firstName;
      selectedContact.lastName = contact.lastName;
      selectedContact.cellphone = contact.cellphone;
    }
  }
};

export const actions = {
  showNotification({ commit }: any, message: any) {
    commit('setNotificationMessage', message);
    commit('setShowNotification', true);
  },

  hideNotification({ commit }: any){
    commit('setNotificationMessage', "");
    commit('setShowNotification', false);
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
