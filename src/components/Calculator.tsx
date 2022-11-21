import React, {FC, useState, useEffect} from 'react'
import styled from 'styled-components'

const btns: any[] = ['C', '√', '%', '/', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', '00', '0', ',', '='];
const inintialState: calculateProps = {sign: '', value: '0', result: '0'};

interface calculateProps {
  sign: string;
  value: any;
  result: string;
}

interface CalculatorProps {}

export const Calculator: FC<CalculatorProps> = ({}) => {
  const [calculate, setCalculate] = useState<calculateProps>(inintialState);
  useEffect(() => {
    console.log(calculate.result, 'results')
    console.log(calculate.value, 'value')
  },[calculate.result, calculate.value])

  const signClickHandler = (button: any) => setCalculate({...calculate, sign: button, result: calculate.value === '0' ? calculate.result : calculate.value, value: ''})

  const resultClickHandler = () => {
    if(calculate.result && calculate.value){
      const math = (a: any, b: number, sign: any) => 
        sign === '+' 
          ? a + b 
          : sign === '-'
          ? a - b
          : sign === '/'
          ? a / b
          : sign === '%'
          ? a % b
          : a * b;

      setCalculate({
      ...calculate, 
      value:
        calculate.result === '0' && calculate.sign === '/' 
          ? 'Can`t divide with 0' 
          : math(Number(calculate.result), Number(calculate.value), calculate.sign),
      sign: '',
      result: ''
      })
    }
  }
  const sqrtClickHandler = () => setCalculate({...calculate, value: `${Math.sqrt(Number(calculate.value))}`})
  const canselClickHandler = () => setCalculate(inintialState);
  const doubleClickHandler = () => setCalculate({...calculate, value: `${calculate.value}.`})

  const handlerCalc = (e: any, button: any) => {
    if(button === '+' || button ===  '-' || button ===  '/' || button ===  'x'|| button === '%'){
      signClickHandler(button);
    }
    if(+button || button === '0' || button === '00'){
      setCalculate({...calculate, value: calculate.value === '0' ? String(button) : calculate.value + button});
    }
    switch(button){
      case '=':
        resultClickHandler();
        break;
      case '√':
        sqrtClickHandler();
        break;
      case 'C':
        canselClickHandler();
        break;
      case ',':
        doubleClickHandler();
    }
  }
  return (
    <Container>
      <Content>
          <TopContent>
            {/* <div>{str}</div> */}
            <CustomInput value={calculate.value} onChange={(e) => setCalculate({...calculate, value: e.target.value})} type="number" style={{direction: 'rtl'}}></CustomInput>
          </TopContent>
          <hr />
          <BottomContent>
            {btns.map(btn => (
              <Btn onClick={(e) => handlerCalc(e, btn)} key={btn}>{btn}</Btn>
            ))}
          </BottomContent>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  margin: 50px auto;
  width: 516px;
  height: 676px;
  background: rgb(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  background: linear-gradient(155.23deg, #28518E 0%, #3A77D1 100%);
  box-shadow: 0px 82px 158px rgba(0, 0, 0, 0.35), 0px 24.7206px 47.6324px rgba(0, 0, 0, 0.228056), 0px 10.2677px 19.7841px rgba(0, 0, 0, 0.175), 0px 3.71362px 7.1555px rgba(0, 0, 0, 0.121944);
  border-radius: 18px;
  width: 92%;
  height: 92%;
  padding: 30px;
  margin: 30px;
  & > * {
    background: transparent;
    color: white;  
  }
`

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  & > div{
    padding-top: 50px;
    align-self: flex-end;
  }
  & > * {
    background: transparent;
    color: white;  
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
`

interface CustomInputProps {
  onChange: (e: any) => void;
}

const CustomInput = styled.input`
  all: unset;
  font-weight: 500;
  font-size: 35px;
  height: 60px;
`

const BottomContent = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding-top: 20px;
  & > * {
      background: transparent;
      color: white;  
  }
`

const Btn = styled.a`
  height: 80px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;
`