import CalendarComponent from './components/index'
import React, { useState } from 'react'
import { SizeCalendar } from './styles'
import moment from 'moment'
import { ServiceConsultancyEditing } from 'templates/EditingService'

export type CalendarProps = {
  uuid?: string | string[] | undefined
  provider: number,
  service: ServiceConsultancyEditing
  setTrigger: Function
  trigger: boolean
}

function Calendar({ uuid,setTrigger,trigger,   service, provider }: CalendarProps) {
  const [value, setValue] = useState(moment())

  return (
    <SizeCalendar>
      <CalendarComponent
        value={value}
        onChange={setValue}
        uuid={uuid}
        setTrigger={setTrigger}
        trigger={trigger}
        service={service}
        provider={provider}
      />
    </SizeCalendar>
  )
}

export default Calendar
