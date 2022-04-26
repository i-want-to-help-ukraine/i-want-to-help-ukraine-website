const countErrorsInArray = (array) =>
  array.reduce((prev, cur) => prev || !!cur.length, false)

export const editProfileSchema = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  activities: {
    required: true,
  },
  avatarUrl: {
    required: true,
  },
  cities: {
    required: true,
  },
  description: {
    required: true,
    rule(value) {
      const result = {
        description: value.length > 140 ? '' : this.errorMessage,
      }
      return result
    },
    errorMessage: 'Description must have more than 140 symbols',
  },
  contacts: {
    rule(values) {
      const result = {}

      values.forEach((item) => {
        const { title } = item.provider
        const schema = editProfileSchema[title]

        if (!title || !schema) return true
        result[title] = schema.rule(item.metadata)

        return false
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
        return false
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

        return false
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
        value?.toLowerCase()
      )
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Invalid url',
  },
  instagram: {
    rule(value) {
      return /(https:\/\/)?(www\.)?(instagram.com)+\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        value?.toLowerCase()
      )
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Invalid url',
  },
  twitter: {
    rule(value) {
      return /(https:\/\/)?(www\.)?(twitter.com)+\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
        value?.toLowerCase()
      )
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Invalid url',
  },
  phone: {
    rule(metadata) {
      return /([0-9]{12})/.test(metadata?.value) ? '' : this.errorMessage
    },
    errorMessage: 'Please, enter phone number with country code',
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
  'Bank card': {
    rule(metadata) {
      return /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(
        metadata?.value
      )
        ? ''
        : this.errorMessage
    },
    errorMessage: 'Invalid Card Number',
  },
}
