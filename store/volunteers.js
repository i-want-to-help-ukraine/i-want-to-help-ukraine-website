export const state = () => ({
  volunteersList: [],
})

export const mutations = {
  setVolunteersList(state, volunteers) {
    state.volunteersList = [...volunteers]
  },
}

export const actions = {
  async fetchVolunteers({ commit }) {
    try {
      const volunteersList = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockVolunteersList())
        }, 1000)
      })

      commit('setVolunteersList', volunteersList)
    } catch (e) {}
  },
}

function mockVolunteersList() {
  return [
    {
      id: 1,
      name: 'Piotr Evseenko',
      instagram: 'https://instagram.com/abc',
      city: 'kyiv',
      volunteerActivities: [],
      moneyTransferOptions: [
        {
          type: 'bitcoin',
          credentials: [
            {
              label: 'Bitcoin',
              value: 'bc1q3wjewwcny0g43u47rzu08mn0fvkkj35g4u6xtk',
            },
          ],
        },
        {
          type: 'debit-card',
          credentials: [
            {
              label: 'Cardholder Name',
              value: 'Piotr Evseenko',
            },
            {
              label: 'Card number',
              value: '2222 2222 2222 2222',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Alina Genadienko',
      instagram: 'https://instagram.com/efg',
      city: 'kyiv',
      volunteerActivities: [],
      moneyTransferOptions: [
        {
          type: 'debit-card',
          credentials: [
            {
              label: 'Cardholder Name',
              value: 'Alina Genadienko',
            },
            {
              label: 'Card number',
              value: '0000 0000 0000 0000',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Anastasia',
      instagram: 'https://instagram.com/hig',
      city: 'kharkiv',
      volunteerActivities: [],
      moneyTransferOptions: [
        {
          type: 'debit-card',
          credentials: [
            {
              label: 'Cardholder Name',
              value: 'Anastasia',
            },
            {
              label: 'Card number',
              value: '1111 1111 1111 1111',
            },
          ],
        },
      ],
    },
  ]
}
