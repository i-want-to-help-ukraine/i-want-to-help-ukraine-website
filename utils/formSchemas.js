const countErrorsInArray = (array) =>
  array.reduce((prev, cur) => prev || !!cur.length, false)

export const editProfileSchema = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  description: {
    required: true,
    rule(value) {
      const result = {
        description: /.{50,}/.test(value) ? '' : this.errorMessage,
      }
      return result
    },
    errorMessage: 'Description must have more than 100 symbols',
  },
  contacts: {
    rule(values) {
      const result = {}

      values.forEach((item) => {
        const { title } = item.provider
        const schema = editProfileSchema[title]

        if (!title || !schema) return true
        result[title] = schema.rule(item.metadata)
      })

      const reducer = countErrorsInArray(Object.values(result))

      result.contacts = values.length || reducer ? '' : this.errorMessage
      return result
    },
    errorMessage: 'Enter at least one contact',
  },
  social: {
    rule(values) {
      const result = {}

      values.forEach((item) => {
        const { title } = item.provider
        const schema = editProfileSchema[title]

        if (!title || !schema) return true
        result[title] = schema.rule(item.url)
      })

      const reducer = countErrorsInArray(Object.values(result))

      result.social = values.length || reducer ? '' : this.errorMessage
      return result
    },
    errorMessage: 'Enter at least one social network',
  },
  payments: {
    rule(values) {
      const result = {}

      values.forEach((item) => {
        const { title } = item.provider
        const schema = editProfileSchema[title]

        if (!title || !schema) return true
        result[title] = schema.rule(item.metadata)
      })

      const reducer = countErrorsInArray(Object.values(result))

      result.payments = values.length || reducer ? '' : this.errorMessage
      return result
    },
    errorMessage: 'Enter at least one payment method',
  },
  facebook: {
    rule(value) {
      return /(https:\/\/)?(www\.)?(facebook.com)+\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        value
      )
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Invalid url',
  },
  instagram: {
    rule(value) {
      return /(https:\/\/)?(www\.)?(instagram.com)+\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        value
      )
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Invalid url',
  },
  phone: {
    rule(metadata) {
      return /380([0-9]{9})/.test(metadata?.value) ? '' : this.errorMessage
    },
    errorMessage: 'Please, enter phone number without country code',
  },
  email: {
    rule(metadata) {
      return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(metadata?.value)
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Please, enter valid email',
  },
  'send.monobank.ua': {
    rule(metadata) {
      return /(https:\/\/)?(www\.)?(send.monobank.ua)+\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        metadata?.value
      )
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Invalid url',
  },
}
