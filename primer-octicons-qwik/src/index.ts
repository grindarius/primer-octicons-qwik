import { ClassList, Signal } from '@builder.io/qwik'

export interface PrimerOcticonsQwikProps<T> {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-hidden'?: boolean
  tabIndex?: number
  title?: string
  id?: string
  fill?: string
  icon?: string
  class?: ClassList | Signal<ClassList>
  size?: T
  verticalAlign?: 'middle' | 'text-bottom' | 'text-top' | 'top' | 'unset'
}

export * from './components'
