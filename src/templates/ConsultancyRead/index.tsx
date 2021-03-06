import { useEffect, useState, useContext } from 'react'
import useRequest, { useRequestConfig } from 'hooks/useRequest'

import Menu from 'components/Menu'
import ConsultancyBanner from 'components/ConsultancyBanner'

import * as S from './styles'
import Footer from 'components/Footer'
import { ToastContainer } from 'react-toastify'

export type ConsultancyReadProps = {
  uuid?: string | string[] | undefined
  date?: string 
  hour?: string 
}

export type Service = {
  title: string
  subtitle: string
  authorName: string
  thumbnailUrl: string
  price: string
  promotionPrice: string
  description: string
  videoUrl: string
  uuid: any,
  id: number
}

export type FreeHours = {
  date: string,
  hours: number[]
}

const ConsultancyRead = ({ uuid, date, hour}: ConsultancyReadProps) => {
  const [service, setService] = useState<Service | null>(null)
  const [serviceId, setServiceId] = useState<number>()
  const [freeHours, setFreeHours] = useState<FreeHours[]>()
  const { request } = useRequest()
  console.log({service})
  useEffect(() => {
    const getService = async () => {
      if(!uuid){
        return
      }
      if(!uuid){
        return 
      }
      console.log(939939,uuid )
      const config: useRequestConfig = {
        method: 'GET',
        url: `/service/read/${uuid}`
      }
      
      const response = await request(config)
      
      setServiceId(response.service.id)
      setService(response.service)
    }

    getService()
  }, [request, uuid])

  useEffect(() => {
    const getFreeHours = async () => {
      const config: useRequestConfig = {
        method: 'GET',
        url: `/schedule/getFreeHours/${serviceId}`
      }
      
      if(serviceId){
        const response = await request(config)
        setFreeHours(response)
      }
    }

    getFreeHours()
  }, [serviceId])

  const handleClick = async (gateway: string) => {
    const configs: useRequestConfig = {
      method: 'POST',
      url: '/payment/create',
      sendToken: true,
      data: {
        serviceUuid: uuid
      }
    }

    if (gateway === 'MERCADO_PAGO') {
      configs.data.gateway = 'MERCADO_PAGO'
    }

    if (gateway === 'NOWPAYMENTS') {
      configs.data.gateway = 'NOWPAYMENTS'
    }

    if (gateway === 'PIX') {
      configs.data.gateway = 'PIX'
    }

    const { url } = await request(configs)
    if (url) {
      window.open(url)
    }
  }
  return(
      <>
        <S.Wrapper>
          <Menu />
            <ConsultancyBanner serviceId={serviceId} freeHours={freeHours} handleClick={handleClick} {...service} />
            <Footer bottom={false}/>
        </S.Wrapper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
  )
}

export default ConsultancyRead
