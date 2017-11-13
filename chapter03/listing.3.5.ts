const contactServiceStub = {
  contact: {
    id: 1,
    name: 'janet'
  },

  save: async function (contact: Contact) {
    component.contact = contact;
  },

  getContact: async function () {
    component.contact = this.contact;
    return this.contact;
  },

  updateContact: async function (contact: Contact) {
    component.contact = contact;
  }
};
