import { generateClasses } from '@formkit/themes'

export default {
  config: {
    classes: generateClasses({
      global: {
        label: 'text-neutral-300',
        message: 'text-red-500 text-sm mt-1',
        input: 'mt-1 block w-full bg-neutral-900 border border-neutral-800',
      },
      submit: {
        input: '$reset btn btn-primary',
      },
    }),
  },
}
