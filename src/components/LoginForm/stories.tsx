import { Story, Meta } from '@storybook/react/types-6-0'
import LoginForm from '.'

export default {
  title: 'form/LoginForm',
  component: LoginForm
} as Meta

export const Default: Story = () => <LoginForm />
