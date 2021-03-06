import React, { useState, useEffect, useContext} from 'react'
import { Moment } from 'moment'
import useRequest, { useRequestConfig } from 'hooks/useRequest'
import {userData} from '../userData'
import * as S from './styles'
import { toast } from 'react-toastify'
import { Service } from 'templates/ConsultancyRead'
import { RegisterOfCalendar } from '../../..'
import { AuthContext } from 'context/AuthContext'

export interface ColumnModal {
  field: string
  headerName: string
  width: number
}

export interface RowModal {
  start: string
  end: string
  id: number
}

export interface DataRequest {
  day: string
  hour: number[]
  month: string
}

const dataRequest: DataRequest = {} as DataRequest

type Input = {
  setOpenModal: Function,
  day: Moment,
  service: Service, 
  providerId: number,
  selectedTimesDay: RegisterOfCalendar | null,
  setDataRequestFunction: Function
}


const SaveHoursService = ({ day, setOpenModal, service, providerId, selectedTimesDay, setDataRequestFunction }: Input) => {
  const { request } = useRequest()
  const [tableLine, setTableLine] = useState([]);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    userData.forEach(row => row.isChecked = false)

    if(selectedTimesDay != null){
      selectedTimesDay?.hour.forEach(hour =>{
        userData.forEach(row => {
          if (row.id == hour){
            row.isChecked = true
          }
        })
      })
      setTableLine(userData);
      return
    }

    setTableLine(userData);
  }, []);

  const handleOnSave = async () => {
    const hours = []
    tableLine.map((tableLine) => {
      if (tableLine.isChecked === true){
        hours.push(tableLine)
      }
    })

    dataRequest.hour = hours.map(x => x.id)
    dataRequest.month = day.format('MMYYYY')
    dataRequest.day = day.format('DDMMYYYY')
    const configSchedule: useRequestConfig = {
      method: 'POST',
      url: `schedule/serviceHour/${service.id}/${providerId}/${user?.id}`,
      sendToken: true,
      data: dataRequest
    }

    const response = await request(configSchedule)
    if (response){
      setDataRequestFunction(dataRequest)
      toast.success('Horas Salvas com sucesso');
    }

    setOpenModal(false)
  }

  const handleOnCancel = () => {
    setOpenModal(false)
  }

  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempUser = tableLine.map((user) =>
      user?.id === parseInt(name) ? { ...user, isChecked: checked } : user
    );
    setTableLine(tempUser);
  };

  return (
    <S.Wrapper>
      <S.TableDiv>
        <S.Form >
          {tableLine.map((user, index) => (
            <S.DivLine key={user?.id}>
              <S.DivCheckBox>
                <input
                  type="checkbox"
                  name={user?.id}
                  className="form-check-input"
                  checked={user?.isChecked || false}
                  onChange={handleChange}
                />
              </S.DivCheckBox>
              <S.DivContent>
                <S.DivLabel>
                  <label>{user.start}</label>
                </S.DivLabel>
                <S.DivLabel>
                  <label>{user.end}</label>
                </S.DivLabel>
              </S.DivContent>
            </S.DivLine>
          ))}
        </S.Form>
      </S.TableDiv>
      <S.DivButton>
        <S.ButtonStyled onClick={handleOnCancel}>Cancelar</S.ButtonStyled>
        <S.ButtonStyled onClick={handleOnSave}>Salvar</S.ButtonStyled>
      </S.DivButton>
    </S.Wrapper>
  )
}

export default SaveHoursService
